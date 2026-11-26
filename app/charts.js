// NusaStat charts: small SVG chart builders. Every chart is drawn from the data
// passed in, with no library and no network use. All numbers are formatted here so
// the views only pass data and labels.

const NS = 'http://www.w3.org/2000/svg';

export function fmt(n, digits = 2) {
  return n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

export function fmtInt(n) {
  return n.toLocaleString('en-US');
}

function svgOpen(width, height, label) {
  return `<svg viewBox="0 0 ${width} ${height}" width="100%" role="img" aria-label="${label}" preserveAspectRatio="xMidYMid meet">`;
}

// A line chart with labelled points. points: [{x: label, y: number}].
export function lineChart(points, opts = {}) {
  const w = opts.width || 640, h = opts.height || 260;
  const padL = 52, padR = 14, padT = 18, padB = 34;
  const ys = points.map((p) => p.y);
  let lo = Math.min(...ys), hi = Math.max(...ys);
  const span = hi - lo || 1;
  lo -= span * 0.15; hi += span * 0.15;
  const xAt = (i) => padL + (i * (w - padL - padR)) / (points.length - 1 || 1);
  const yAt = (v) => padT + ((hi - v) * (h - padT - padB)) / (hi - lo);
  const grid = [0, 0.25, 0.5, 0.75, 1].map((f) => {
    const v = lo + (hi - lo) * f;
    const y = yAt(v);
    return `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" class="grid"/>` +
      `<text x="${padL - 8}" y="${y + 4}" class="axis" text-anchor="end">${fmt(v, opts.decimals ?? 1)}</text>`;
  }).join('');
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${xAt(i).toFixed(1)},${yAt(p.y).toFixed(1)}`).join(' ');
  const area = `${path} L${xAt(points.length - 1).toFixed(1)},${h - padB} L${xAt(0).toFixed(1)},${h - padB} Z`;
  const dots = points.map((p, i) => {
    // Edge points anchor inward so their labels never sit on the axis labels.
    const anchor = i === 0 ? 'start' : (i === points.length - 1 ? 'end' : 'middle');
    const lx = i === 0 ? xAt(i) + 6 : (i === points.length - 1 ? xAt(i) - 6 : xAt(i));
    return `<circle cx="${xAt(i).toFixed(1)}" cy="${yAt(p.y).toFixed(1)}" r="4" class="dot"/>` +
    `<text x="${lx}" y="${yAt(p.y) - 10}" class="point-label" text-anchor="${anchor}">${fmt(p.y, opts.decimals ?? 1)}</text>`;
  }).join('');
  const labels = points.map((p, i) =>
    `<text x="${xAt(i)}" y="${h - 10}" class="axis" text-anchor="middle">${p.x}</text>`).join('');
  const hiPoint = points.reduce((a, b) => (b.y > a.y ? b : a));
  return svgOpen(w, h, opts.label || 'Line chart') + grid +
    `<path d="${area}" class="area"/><path d="${path}" class="line" fill="none"/>` +
    dots + labels +
    `<text x="${padL}" y="12" class="chart-note">${opts.note || ''} Highest: ${hiPoint.x} (${fmt(hiPoint.y, opts.decimals ?? 1)}${opts.unit || ''})</text>` +
    '</svg>';
}

// A vertical bar chart. bars: [{x: label, y: number}]. highlightIndex colours one bar.
export function barChart(bars, opts = {}) {
  const w = opts.width || 640, h = opts.height || 260;
  const padL = 52, padR = 14, padT = 30, padB = 34;
  const max = Math.max(...bars.map((b) => b.y), 0);
  const min = Math.min(0, ...bars.map((b) => b.y));
  const yAt = (v) => padT + ((max - v) * (h - padT - padB)) / (max - min || 1);
  const slot = (w - padL - padR) / bars.length;
  const grid = [0, 0.5, 1].map((f) => {
    const v = min + (max - min) * f;
    const y = yAt(v);
    return `<line x1="${padL}" y1="${y}" x2="${w - padR}" y2="${y}" class="grid"/>` +
      `<text x="${padL - 8}" y="${y + 4}" class="axis" text-anchor="end">${fmt(v, opts.decimals ?? 1)}</text>`;
  }).join('');
  const zeroY = yAt(0);
  const hiBar = bars.reduce((a, b) => (b.y > a.y ? b : a));
  const rects = bars.map((b, i) => {
    const x = padL + i * slot + slot * 0.18;
    const bw = slot * 0.64;
    const y = b.y >= 0 ? yAt(b.y) : zeroY;
    const bh = Math.max(1, Math.abs(yAt(b.y) - zeroY));
    const cls = i === opts.highlightIndex ? 'bar bar-hot' : (b.y < 0 ? 'bar bar-neg' : 'bar');
    return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" class="${cls}"/>` +
      `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 6).toFixed(1)}" class="point-label" text-anchor="middle">${fmt(b.y, opts.decimals ?? 1)}</text>` +
      `<text x="${(x + bw / 2).toFixed(1)}" y="${h - 10}" class="axis" text-anchor="middle">${b.x}</text>`;
  }).join('');
  return svgOpen(w, h, opts.label || 'Bar chart') + grid +
    `<line x1="${padL}" y1="${zeroY}" x2="${w - padR}" y2="${zeroY}" class="zero"/>` +
    rects + `<text x="${padL}" y="12" class="chart-note">${opts.note || ''}Highest: ${hiBar.x} (${fmt(hiBar.y, opts.decimals ?? 1)}${opts.unit || ''})</text>` + '</svg>';
}

// Horizontal bars for ranked lists. rows: [{label, value, note}].
export function hbarChart(rows, opts = {}) {
  const rowH = 34, w = opts.width || 640;
  const h = rowH * rows.length + 26;
  const max = Math.max(...rows.map((r) => r.value));
  const labelW = opts.labelWidth || 210;
  const body = rows.map((r, i) => {
    const y = 14 + i * rowH;
    const bw = ((w - labelW - 90) * r.value) / max;
    return `<text x="0" y="${y + 15}" class="hbar-label">${r.label}</text>` +
      `<rect x="${labelW}" y="${y + 2}" width="${Math.max(2, bw).toFixed(1)}" height="18" rx="3" class="${i === 0 ? 'bar bar-hot' : 'bar'}"/>` +
      `<text x="${labelW + Math.max(2, bw) + 8}" y="${y + 16}" class="point-label">${fmt(r.value, opts.decimals ?? 1)}${opts.unit || ''}</text>`;
  }).join('');
  return svgOpen(w, h, opts.label || 'Ranked bars') + body + '</svg>';
}

// Population pyramid: bands with male share to the left, female to the right.
// Band labels sit in their own column on the left so the bars never cover them.
export function pyramid(bands, opts = {}) {
  const w = 640, rowH = 30, h = rowH * bands.length + 44;
  const labelW = 52;
  const mid = labelW + (w - labelW) / 2;
  const maxShare = Math.max(...bands.flatMap((b) => [b.male, b.female]));
  const scale = (w - mid - 70) / maxShare;
  const rows = bands.map((b, i) => {
    const y = 30 + i * rowH;
    const mw = b.male * scale, fw = b.female * scale;
    return `<text x="0" y="${y + 14}" class="axis" font-weight="600">${b.band}</text>` +
      `<rect x="${(mid - mw).toFixed(1)}" y="${y}" width="${mw.toFixed(1)}" height="20" class="bar bar-male"/>` +
      `<rect x="${mid}" y="${y}" width="${fw.toFixed(1)}" height="20" class="bar bar-female"/>` +
      `<text x="${(mid - mw - 6).toFixed(1)}" y="${y + 15}" class="point-label" text-anchor="end">${fmt(b.male, 1)}%</text>` +
      `<text x="${(mid + fw + 6).toFixed(1)}" y="${y + 15}" class="point-label">${fmt(b.female, 1)}%</text>`;
  }).join('');
  return svgOpen(w, h, opts.label || 'Population pyramid') +
    `<text x="${mid - 80}" y="16" class="chart-note" text-anchor="middle">Male</text>` +
    `<text x="${mid + 80}" y="16" class="chart-note" text-anchor="middle">Female</text>` +
    `<line x1="${mid}" y1="24" x2="${mid}" y2="${h - 8}" class="zero"/>` + rows +
    `<text x="${mid}" y="${h - 2}" class="axis" text-anchor="middle" font-size="11">Share of total population, %</text>` +
    '</svg>';
}

// A donut: slices [{label, value, colorClass}]. The centre shows the total.
export function donut(slices, opts = {}) {
  const size = 240, r = 88, inner = 58, cx = size / 2, cy = size / 2;
  const total = slices.reduce((s, x) => s + x.value, 0);
  let a0 = -Math.PI / 2;
  const paths = slices.map((s) => {
    const a1 = a0 + (s.value / total) * Math.PI * 2;
    const large = (a1 - a0) > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1), yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0), yi0 = cy + inner * Math.sin(a0);
    const d = `M${x0.toFixed(1)},${y0.toFixed(1)} A${r},${r} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${xi1.toFixed(1)},${yi1.toFixed(1)} A${inner},${inner} 0 ${large} 0 ${xi0.toFixed(1)},${yi0.toFixed(1)} Z`;
    a0 = a1;
    return `<path d="${d}" class="slice ${s.colorClass || ''}"/>`;
  }).join('');
  const legend = slices.map((s, i) =>
    `<g transform="translate(0, ${i * 24})"><rect x="0" y="0" width="12" height="12" rx="2" class="swatch ${s.colorClass || ''}"/>` +
    `<text x="18" y="11" class="legend-label">${s.label} — ${fmt(s.value, 1)}%</text></g>`).join('');
  const centre = `<text x="${cx}" y="${cy - 2}" class="donut-centre" text-anchor="middle">${opts.centre || ''}</text>` +
    `<text x="${cx}" y="${cy + 18}" class="donut-sub" text-anchor="middle">${opts.centreSub || ''}</text>`;
  return `<div class="donut-wrap">${svgOpen(size, size, opts.label || 'Donut chart')}${paths}${centre}</svg>` +
    `<svg viewBox="0 0 260 ${slices.length * 24}" width="260" role="img" aria-label="Legend">${legend}</svg></div>`;
}
