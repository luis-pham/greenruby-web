#!/usr/bin/env python3
"""Guest-facing CMS configuration text of the English site (phase 2A), from a LOCAL clone only (read-only).

Covers what i18n:seed-locale and the translation matrix create for a new language:
ad_config, app_menu_front_end (menu JSON), app_page (title/SEO), app_page_config (text values and the text fields
of JSON list values), app_group (non-FAQ groups and FAQ groups), app_category (article categories),
app_amenity, app_service. Business data (prices, ids, links, files, icons) is never extracted.

Each row: id, table, row_id, field, json_path, en, scope, reason. scope = in | excluded.
  excluded: legal page content (separate legal approval), long marketing content (> 300 characters: content, not
  configuration), and image/file titles (file names, not text).

  python3 scripts/i18n/copy/cms-extract.py green_ruby_i18n_base > cms-config-source.json
"""
import json, re, subprocess, sys

DB = sys.argv[1] if len(sys.argv) > 1 else 'green_ruby_i18n_base'
if not DB.startswith('green_ruby_i18n_'):
    sys.exit('local green_ruby_i18n_* clone only')
EN = 2
LEGAL_PAGES = {'legal', 'payment-methods', 'privacy-policies', 'safety-policies', 'terms-and-conditions'}
LONG = 300
FILE_LIKE = re.compile(r'\.(png|jpe?g|webp|gif|svg|mp4|mov|pdf)$', re.I)
TEXT_KEYS = ('title', 'name', 'subtitle', 'description', 'content', 'label', 'text')


def query(sql):
    """Rows as dicts. Each row is serialised by MySQL itself (JSON_OBJECT), so CR/LF/tabs in values are safe."""
    cols = [c.strip().split('.')[-1].strip('`') for c in re.match(r'select (.*?) from ', sql, re.S).group(1).split(',')]
    wrapped = re.sub(r'^select (.*?) from ', lambda m: 'select json_object(' + ', '.join(f"'{n}', {c.strip()}" for n, c in zip(cols, m.group(1).split(','))) + ') from ', sql, count=1, flags=re.S)
    out = subprocess.run(['mysql', '-uroot', '--batch', '--raw', '--skip-column-names', DB, '-e', wrapped], capture_output=True, text=True, check=True).stdout
    return [{k: (None if v is None else str(v)) for k, v in json.loads(line).items()} for line in out.splitlines() if line.strip()]


rows = []


def add(table, row_id, field, en, path='', scope='in', reason=''):
    if en is None or en == 'NULL':
        return
    en = en.strip()
    if not en or not re.search(r'[A-Za-z]{2}', en):
        return
    if scope == 'in' and len(en) > LONG:
        scope, reason = 'excluded', f'long content ({len(en)} characters): content, not configuration'
    rid = f'CMS-{table}-{row_id}-{field}' + (f'-{path}' if path else '')
    rows.append({'id': rid, 'table': table, 'row_id': int(row_id), 'field': field, 'json_path': path, 'en': en, 'scope': scope, 'reason': reason})


def json_items(table, row_id, field, value, base_scope='in', base_reason=''):
    try:
        data = json.loads(value)
    except ValueError:
        return False

    def walk(node, path):
        if isinstance(node, list):
            for i, item in enumerate(node):
                walk(item, f'{path}[{item.get("id", i) if isinstance(item, dict) else i}]')
        elif isinstance(node, dict):
            for k, v in node.items():
                if isinstance(v, (list, dict)):
                    walk(v, f'{path}.{k}')
                elif isinstance(v, str) and k in TEXT_KEYS:
                    if FILE_LIKE.search(v.strip()):
                        add(table, row_id, field, v, f'{path}.{k}', 'excluded', 'file name, not text')
                    else:
                        add(table, row_id, field, v, f'{path}.{k}', base_scope, base_reason)

    walk(data, '')
    return True


for r in query(f'select id, `key`, value from ad_config where language_id={EN} order by id'):
    add('ad_config', r['id'], r['key'], r['value'])
for r in query(f'select id, code, menu from app_menu_front_end where language_id={EN} order by id'):
    json_items('app_menu_front_end', r['id'], f'menu:{r["code"]}', r['menu'])
for r in query(f'select id, code, title, seo_title, seo_description, description from app_page where language_id={EN} order by id'):
    legal = r['code'] in LEGAL_PAGES
    for f in ('title', 'seo_title', 'seo_description', 'description'):
        add('app_page', r['id'], f'{f}:{r["code"]}', r[f], '', 'excluded' if legal and f == 'description' else 'in', 'legal page content' if legal and f == 'description' else '')
for r in query(f'select pc.id, p.code, pc.`key`, pc.type, pc.value from app_page_config pc join app_page p on p.id = pc.page_id where p.language_id={EN} order by p.code, pc.ord, pc.id'):
    v = r['value']
    if v in ('', 'NULL') or re.match(r'^(/|https?:|#|[0-9.,\s]+$)', v):
        continue
    legal = r['code'] in LEGAL_PAGES or r['key'].startswith('legal-')
    if r['type'] == '6' or v.lstrip().startswith('['):
        if json_items('app_page_config', r['id'], r['key'], v, 'excluded' if legal else 'in', 'legal page content' if legal else ''):
            continue
    add('app_page_config', r['id'], r['key'], v, '', 'excluded' if legal else 'in', 'legal page content (separate legal approval)' if legal else '')
for r in query(f'select id, type, name, description, seo_title, seo_description from app_group where language_id={EN} order by type, id'):
    kind = 'faq_group' if r['type'] == '1' else f'group_type{r["type"]}'
    for f in ('name', 'description', 'seo_title', 'seo_description'):
        add('app_group', r['id'], f'{f}:{kind}', r[f])
for r in query(f"select id, name, description, seo_title, seo_description from app_category where language_id={EN} and slug <> 'root' order by id"):
    for f in ('name', 'description', 'seo_title', 'seo_description'):
        add('app_category', r['id'], f, r[f])
for r in query(f'select id, name, description from app_amenity where language_id={EN} order by ord, id'):
    add('app_amenity', r['id'], 'name', r['name'])
    add('app_amenity', r['id'], 'description', r['description'])
for r in query(f'select id, name, description from app_service where language_id={EN} order by id'):
    add('app_service', r['id'], 'name', r['name'])
    add('app_service', r['id'], 'description', r['description'])

json.dump({'source_database': DB, 'rows': rows}, sys.stdout, ensure_ascii=False, indent=1)
