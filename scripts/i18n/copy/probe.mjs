// Quick probe: count English leaves per copy module (phase 2A scoping).
const files = process.argv.slice(2);
const leaves = (v, out = []) => { if (typeof v === 'string') out.push(v); else if (typeof v === 'function') out.push(String(v)); else if (Array.isArray(v)) v.forEach((x) => leaves(x, out)); else if (v && typeof v === 'object') Object.values(v).forEach((x) => leaves(x, out)); return out; };
for (const f of files) {
  try {
    const m = await import(new URL('../../../' + f, import.meta.url).href);
    const found = [];
    for (const [k, v] of Object.entries(m)) if (v && typeof v === 'object' && 'en' in v && 'vi' in v) found.push([k, leaves(v.en)]);
    const n = found.reduce((s, [, l]) => s + l.length, 0), chars = found.reduce((s, [, l]) => s + l.join('').length, 0);
    console.log(String(n).padStart(5), String(chars).padStart(7), f, found.map(([k, l]) => `${k}:${l.length}`).join(' '));
  } catch (e) { console.log('  ERR', f, e.message.split('\n')[0].slice(0, 120)); }
}
