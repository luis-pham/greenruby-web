<?php
// PathBuilder (cms App\Services\Content\PathBuilder) against the crawled URL shapes (scripts/i18n/paths.fixture.json):
// every EN/VI page path and every hreflang alternate in the fixture is rebuilt from its parts and must be identical.
// Read-only. Run through safe-env.sh:  I18N_DB=green_ruby_i18n_p1d scripts/i18n/cms/safe-env.sh php scripts/i18n/cms/pathbuilder-check.php
$cms = getenv('CMS_PATH') ?: __DIR__ . '/../../../../cms-develop';
require $cms . '/vendor/autoload.php';
$app = require $cms . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
use App\Services\Content\PathBuilder as PB;

$fixture = json_decode(file_get_contents(__DIR__ . '/../paths.fixture.json'), true);
$sectionsByLocale = [];
foreach (PB::SEGMENTS as $section => $segs) {
    foreach ($segs as $locale => $seg) {
        $sectionsByLocale[$locale][$seg] = $section;
    }
}
/** Rebuilds $path from its parts with PathBuilder; null when the shape is not a PathBuilder shape. */
$rebuild = function (string $locale, string $path) use ($sectionsByLocale): ?string {
    $prefix = $locale === 'vi' ? '/vi' : '';
    if ($path === ($prefix ?: '/')) {
        return PB::home($locale);
    }
    if ($prefix !== '' && !str_starts_with($path, $prefix . '/')) {
        return null;
    }
    $rest = ltrim(substr($path, strlen($prefix)), '/');
    $known = $sectionsByLocale[$locale];
    uksort($known, fn ($a, $b) => strlen($b) <=> strlen($a));
    foreach ($known as $seg => $section) {
        if ($rest === $seg) {
            return PB::section($locale, $section);
        }
        if (!str_starts_with($rest, $seg . '/')) {
            continue;
        }
        $tail = substr($rest, strlen($seg) + 1);
        return match (true) {
            in_array($section, ['cruise', 'cabin'], true) && preg_match('/^(.+)-(\d+)\.html$/', $tail, $m) === 1 => PB::{$section}($locale, $m[1], (int) $m[2]),
            $section === 'itinerary' && preg_match('/^(.+)-(\d+)-(\d+)\.html$/', $tail, $m) === 1 => PB::itinerary($locale, $m[1], (int) $m[2], (int) $m[3]),
            $section === 'experiences' && preg_match('/^(.+)-(\d+)\.html$/', $tail, $m) === 1 => PB::experience($locale, $m[1], (int) $m[2]),
            $section === 'destinations' && !str_contains($tail, '/') => PB::destination($locale, $tail),
            $section === 'news' && preg_match('/^(.+)\.html$/', $tail, $m) === 1 => PB::article($locale, PB::NEWS_CATEGORY[$locale], $m[1]),
            $section === 'blog' && preg_match('#^([^/]+)/(.+)\.html$#', $tail, $m) === 1 => PB::article($locale, $m[1], $m[2]),
            $section === 'blog' && preg_match('#^([^/]+)$#', $tail, $m) === 1 && !preg_match('/^(page|trang)-\d+$/', $tail) => PB::blogCategory($locale, $m[1]),
            $section === 'faq' && !str_contains($tail, '/') => PB::faqGroup($locale, $tail),
            $section === 'gallery' && !str_contains($tail, '/') => PB::galleryCategory($locale, $tail),
            default => null,
        };
    }

    return null;
};
$checked = 0; $mismatch = []; $skipped = [];
foreach ($fixture['shapes'] as $shape) {
    $pairs = [[$shape['locale'], $shape['path']]];
    foreach ($shape['expect']['hreflang'] ?? [] as $h) {
        [$code, $p] = explode(' ', $h, 2);
        if ($code !== 'x-default') {
            $pairs[] = [$code, $p];
        }
    }
    foreach ($pairs as [$locale, $path]) {
        $built = $rebuild($locale, $path);
        if ($built === null) {
            $skipped[$path] = true;
            continue;
        }
        $checked++;
        if ($built !== $path) {
            $mismatch[] = compact('locale', 'path', 'built');
        }
    }
}
echo json_encode(['checked' => $checked, 'mismatches' => $mismatch, 'not_pathbuilder_shapes' => array_keys($skipped)], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES), "\n";
exit($mismatch ? 1 : 0);
