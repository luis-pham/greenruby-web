<?php
// Read-only booking price parity probe (i18n Phase 1A). Boots cms-develop (CMS_PATH, default ../../../../cms-develop) and
// prices every combination the booking wizard can offer (itinerary × cruise × cabin × guest mix, with and without paid
// services) through the real App\Payments\BookingPricer. Nothing is written: the JSON reports non_select_queries (must be 0).
// Run on a local clone, before and after a change, and diff the two outputs:
//   I18N_DB=green_ruby_i18n_p1a scripts/i18n/cms/safe-env.sh php scripts/i18n/cms/pricer-parity.php > before.json
$cms = getenv('CMS_PATH') ?: __DIR__ . '/../../../../cms-develop';
require $cms . '/vendor/autoload.php';
$app = require $cms . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
use App\Payments\BookingPricer;
use Illuminate\Support\Facades\DB;

DB::enableQueryLog();
$out = ['database' => DB::getDatabaseName(), 'cases' => []];
$languages = DB::table('ad_language')->orderBy('id')->get(['id', 'code']);
$exclusive = (int) config('backend.appServiceType.exclusive', 2);

foreach ($languages as $language) {
    $pairs = DB::table('app_cruise_itinerary as ci')
        ->join('app_itinerary as i', 'i.id', '=', 'ci.itinerary_id')
        ->join('app_cruise as c', 'c.id', '=', 'ci.cruise_id')
        ->where('i.language_id', $language->id)->where('c.language_id', $language->id)
        ->select('ci.itinerary_id', 'ci.cruise_id')->distinct()->orderBy('ci.itinerary_id')->orderBy('ci.cruise_id')->get();
    $services = DB::table('app_service')->where('language_id', $language->id)->where('type', $exclusive)->orderBy('id')->pluck('id')->all();

    foreach ($pairs as $pair) {
        $cabins = DB::table('app_cabin')->where('cruise_id', $pair->cruise_id)->orderBy('id')->get(['id', 'capacity']);
        foreach ($cabins as $cabin) {
            $capacity = max(1, (int) $cabin->capacity);
            $mixes = [];
            for ($adults = 1; $adults <= $capacity + 1; $adults++) {
                $mixes[] = ['adults' => $adults];
            }
            $mixes[] = ['adults' => 1, 'children_6_12' => 1];
            $mixes[] = ['adults' => $capacity, 'children_2_5' => 1, 'infants' => 1];
            foreach ($mixes as $mix) {
                foreach ([[], $services] as $withServices) {
                    $booking = [
                        'itinerary_id' => $pair->itinerary_id . '-' . $pair->cruise_id,
                        'cabins' => [['cabin_id' => $cabin->id, 'quantity' => 1] + $mix],
                        'amenities' => array_map(fn ($id) => ['amenity_id' => $id, 'quantity' => 1], $withServices),
                    ];
                    $pricer = new BookingPricer();
                    $result = $pricer->price($booking);
                    $out['cases'][] = [
                        'lang' => $language->code,
                        'booking' => $booking,
                        'result' => $result,
                        'error' => $pricer->error,
                    ];
                }
            }
        }
    }
}

$writes = array_filter(DB::getQueryLog(), fn ($q) => !preg_match('/^\s*(select|show)\b/i', $q['query']));
$out['non_select_queries'] = count($writes);
$out['summary'] = [
    'cases' => count($out['cases']),
    'priced' => count(array_filter($out['cases'], fn ($c) => $c['result'] !== null)),
    'errors' => array_count_values(array_filter(array_column($out['cases'], 'error'))),
];
echo json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES), "\n";
