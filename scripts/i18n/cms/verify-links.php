<?php
// Read-only translation-link verifier (i18n Phase 0, docs/i18n-audit/phase-0/02). Boots cms-develop (CMS_PATH, default
// ../../../../cms-develop) and issues SELECTs only; the JSON reports non_select_queries, which must be 0.
// Run through safe-env.sh so the DB is a local clone:  I18N_DB=green_ruby_i18n_prov scripts/i18n/cms/safe-env.sh php scripts/i18n/cms/verify-links.php
$cms = getenv('CMS_PATH') ?: __DIR__ . '/../../../../cms-develop';
require $cms . '/vendor/autoload.php';
$app = require $cms . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
use App\Services\Content\ContentTranslations as CT;
use Illuminate\Support\Facades\DB;
use Modules\BackEnd\Services\AdLanguageService;

DB::enableQueryLog();
$en = AdLanguageService::findByCode('en'); $vi = AdLanguageService::findByCode('vi');
$out = ['database' => DB::getDatabaseName(), 'types' => []];
foreach (CT::TYPES as $type => $meta) {
    $t = $meta['table'];
    $r = ['table' => $t];
    $links = DB::table('content_translations')->where('entity_type', $type)->orderBy('entity_id')->get(); // ordered: output must be stable across runs
    // structural checks over ALL links of the type (not only admin scope)
    $r['links'] = $links->count();
    $r['groups'] = $links->pluck('group_key')->unique()->count();
    $sizes = $links->groupBy('group_key')->map->count();
    $r['group_size_histogram'] = $sizes->countBy()->sortKeys()->all();
    $r['single_member_groups'] = $links->groupBy('group_key')->filter(fn ($g) => $g->count() === 1)
        ->map(fn ($g) => ['id' => $g->first()->entity_id, 'language_id' => $g->first()->language_id])->values()->all();
    $rows = DB::table($t)->whereIn('id', $links->pluck('entity_id'))->get(['id', 'language_id'])->keyBy('id');
    $r['orphans'] = $links->filter(fn ($l) => !isset($rows[$l->entity_id]))->pluck('entity_id')->values()->all();
    $r['language_mismatch'] = $links->filter(fn ($l) => isset($rows[$l->entity_id]) && (int) $rows[$l->entity_id]->language_id !== (int) $l->language_id)->pluck('entity_id')->values()->all();
    $r['duplicate_membership'] = $links->groupBy('entity_id')->filter(fn ($g) => $g->count() > 1)->keys()->values()->all();
    $r['same_language_in_group'] = $links->groupBy('group_key')->filter(fn ($g) => $g->pluck('language_id')->duplicates()->isNotEmpty())->keys()->values()->all();
    // admin-scope view
    $scopeEn = CT::items($type, (int) $en->id)->pluck('id')->all();
    $scopeVi = CT::items($type, (int) $vi->id)->pluck('id')->all();
    $r['in_scope_rows'] = ['en' => count($scopeEn), 'vi' => count($scopeVi)];
    $r['links_outside_admin_scope'] = $links->pluck('entity_id')->diff(array_merge($scopeEn, $scopeVi))->values()->all();
    $r['unlinked_in_scope'] = ['en' => array_values(array_filter($scopeEn, fn ($id) => !CT::isLinked($type, $id))), 'vi' => array_values(array_filter($scopeVi, fn ($id) => !CT::isLinked($type, $id)))];
    // effective counterparts both directions + reciprocity
    $fwd = []; foreach ($scopeEn as $id) { $fwd[$id] = CT::effectiveCounterpartId($type, $id, $en, $vi); }
    $back = []; foreach ($scopeVi as $id) { $back[$id] = CT::effectiveCounterpartId($type, $id, $vi, $en); }
    $nonRecip = [];
    foreach ($fwd as $a => $b) { if ($b && ($back[$b] ?? null) !== $a) $nonRecip[] = ['en' => $a, 'vi' => $b, 'vi_points_to' => $back[$b] ?? null]; }
    foreach ($back as $b => $a) { if ($a && ($fwd[$a] ?? null) !== $b) $nonRecip[] = ['vi' => $b, 'en' => $a, 'en_points_to' => $fwd[$a] ?? null]; }
    $r['effective_pairs'] = count(array_filter($fwd));
    $r['non_reciprocal'] = $nonRecip;
    $heur = []; foreach ($fwd as $a => $b) { if ($b && !CT::isLinked($type, $a)) $heur[] = ['en' => $a, 'vi' => $b, 'dir' => 'en->vi']; }
    foreach ($back as $b => $a) { if ($a && !CT::isLinked($type, $b)) $heur[] = ['vi' => $b, 'en' => $a, 'dir' => 'vi->en']; }
    $r['heuristic_pairs'] = $heur;
    $out['types'][$type] = $r;
}
$writes = array_filter(DB::getQueryLog(), fn ($q) => !preg_match('/^\s*select/i', $q['query']));
$out['non_select_queries'] = count($writes);
echo json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), PHP_EOL;
