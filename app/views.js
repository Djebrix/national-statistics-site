// NusaStat views: one renderer per page. Each returns an HTML string for #app.
// All figures come from data.js; every page names its source and year under the
// charts it shows. Controls are plain buttons and selects with data-action
// attributes; main.js wires them up.

import {
  LATEST, POPULATION_SERIES, AGE_BANDS, PROVINCES, GDP_SERIES, GDP_QUARTERLY_2024,
  GDP_SECTORS, INFLATION_SERIES, INFLATION_MONTHLY, MONTHS, UNEMPLOYMENT_SERIES,
  LABOUR_2024, EMPLOYMENT_SECTORS, POVERTY_SERIES, TRADE_SERIES, TRADE_PARTNERS,
  TRADE_PRODUCTS, HDI_SERIES, RELEASES, SOURCES,
} from './data.js';
import { fmt, fmtInt, lineChart, barChart, hbarChart, pyramid, donut } from './charts.js';

function kpi(label, value, sub, page) {
  return `<a class="kpi" href="#/${page}"><span class="kpi-label">${label}</span>` +
    `<span class="kpi-value">${value}</span><span class="kpi-sub">${sub}</span></a>`;
}

function sourceLine(text) {
  return `<p class="source">Source: ${text}</p>`;
}

function pageHead(title, intro) {
  return `<div class="page-head"><h1>${title}</h1><p class="lede">${intro}</p></div>`;
}

function yearOptions(selected) {
  // Only years where every headline series is published: HDI starts in 2020.
  return GDP_SERIES.filter((g) => g.year >= 2020).map((g) => `<option value="${g.year}"${g.year === selected ? ' selected' : ''}>${g.year}</option>`).join('');
}

// ---- Overview ---------------------------------------------------------------
export function viewOverview(state) {
  const g = GDP_SERIES.find((x) => x.year === state.year) || GDP_SERIES[GDP_SERIES.length - 1];
  const pop = POPULATION_SERIES.find((x) => x.year === state.year);
  const inf = INFLATION_SERIES.find((x) => x.year === state.year);
  const un = UNEMPLOYMENT_SERIES.find((x) => x.year === state.year);
  const pov = POVERTY_SERIES.find((x) => x.year === state.year);
  const tr = TRADE_SERIES.find((x) => x.year === state.year);
  const cards = [
    kpi('Population', `${fmt(pop.value, 1)} million`, `BPS estimate, ${state.year}`, 'population'),
    kpi('GDP', `Rp ${fmtInt(g.nominal)} trillion`, `Nominal, ${state.year}`, 'economy'),
    kpi('Economic growth', `${g.growth > 0 ? '+' : ''}${fmt(g.growth)}%`, `Real GDP, ${state.year}`, 'economy'),
    kpi('Inflation', `${fmt(inf.value)}%`, `CPI annual average, ${state.year}`, 'prices'),
    kpi('Unemployment', `${fmt(un.rate)}%`, `Open unemployment, Aug ${state.year}`, 'labour'),
    kpi('Poverty', `${fmt(pov.value)}%`, `Share of population, Sep ${state.year}`, 'labour'),
    kpi('Exports', `US$${fmt(tr.exports, 1)} billion`, `Goods, ${state.year}`, 'trade'),
    kpi('Human Development Index', `${fmt(HDI_SERIES.find((x) => x.year === state.year)?.hdi ?? LATEST.hdi)}`, `BPS, ${state.year}`, 'health'),
  ].join('');
  const popChart = lineChart(POPULATION_SERIES.map((p) => ({ x: String(p.year), y: p.value })),
    { label: 'Population of Indonesia 2015 to 2024', decimals: 1, unit: 'm', note: 'Population, million people — ' });
  const growthChart = barChart(GDP_SERIES.map((x) => ({ x: String(x.year), y: x.growth })),
    { label: 'Real GDP growth 2019 to 2024', decimals: 2, highlightIndex: GDP_SERIES.length - 1, note: 'Real GDP growth, % year on year — ' });
  const topProvinces = PROVINCES.slice(0, 5).map((p, i) =>
    `<tr><td>${i + 1}</td><td><a href="#/population">${p.name}</a></td><td>${p.island}</td>` +
    `<td class="num">${fmtInt(p.pop)}</td></tr>`).join('');
  const releases = RELEASES.map((r) =>
    `<li><span class="rel-date">${r.date}</span><span class="rel-title">${r.title}</span><span class="rel-source">${r.source}</span></li>`).join('');
  return pageHead('Indonesia in numbers',
    'The latest official statistics for Indonesia — population, the economy, prices, jobs, trade and human development — with the source and year of every figure.') +
    `<section class="year-bar"><label for="year-select">Year in review</label>` +
    `<select id="year-select" data-action="year">${yearOptions(state.year)}</select>` +
    `<span class="year-note">Change the year and every card below updates to that year.</span></section>` +
    `<section class="kpi-grid">${cards}</section>` +
    `<section class="grid-2"><div class="card"><h2>Population keeps growing</h2>${popChart}` +
    sourceLine('BPS mid-year estimates; 2020 is the census count.') +
    `<p>Indonesia is the world’s fourth most populous country. The population grew by about 2.9 million people between 2023 and 2024, and 59.0% now live in towns and cities.</p></div>` +
    `<div class="card"><h2>Growth held above 5%</h2>${growthChart}` +
    sourceLine('BPS national accounts.') +
    `<p>After the 2.07% contraction of 2020, growth returned to around 5% a year. In 2024 the economy grew 5.03% and nominal GDP reached Rp 22,139 trillion.</p></div></section>` +
    `<section class="grid-2"><div class="card"><h2>Where people live</h2>` +
    `<table class="tbl"><thead><tr><th>#</th><th>Province</th><th>Island</th><th class="num">Population</th></tr></thead><tbody>${topProvinces}</tbody></table>` +
    sourceLine('BPS, 2020 Population Census. <a href="#/population">See all ten largest provinces →</a>') +
    `<p>West Java alone has more people than most countries in Europe. Five of the six provinces with more than 10 million residents are on Java.</p></div>` +
    `<div class="card"><h2>Latest releases</h2><ul class="releases">${releases}</ul>` +
    `<p><a href="#/sources">How to cite these figures →</a></p></div></section>` +
    `<section class="card"><h2>Browse by topic</h2><div class="topic-links">` +
    [['population', 'Population', 'Who lives here, where, and how the age mix is changing'],
     ['economy', 'Economy', 'GDP, growth, and what the economy is made of'],
     ['prices', 'Prices & inflation', 'What prices did, month by month'],
     ['labour', 'Labour', 'Jobs, unemployment, informality and poverty'],
     ['trade', 'Trade', 'What Indonesia sells, buys, and to whom'],
     ['health', 'Health & education', 'How long people live and how long they study']]
      .map(([slug, name, desc]) => `<a class="topic" href="#/${slug}"><strong>${name}</strong><span>${desc}</span></a>`).join('') +
    `</div></section>`;
}

// ---- Population -------------------------------------------------------------
export function viewPopulation(state) {
  const filter = state.provinceIsland || 'All';
  const rows = PROVINCES.filter((p) => filter === 'All' || p.island === filter);
  const sorted = [...rows].sort((a, b) => {
    const k = state.provinceSort || 'pop';
    const dir = state.provinceDir === 'asc' ? 1 : -1;
    if (k === 'name') return a.name.localeCompare(b.name) * dir;
    if (k === 'island') return a.island.localeCompare(b.island) * dir;
    return (a.pop - b.pop) * dir;
  });
  const totalShown = sorted.reduce((s, p) => s + p.pop, 0);
  const th = (key, label) => {
    const active = (state.provinceSort || 'pop') === key;
    const arrow = active ? (state.provinceDir === 'asc' ? ' ▲' : ' ▼') : '';
    return `<th><button class="th-btn" data-action="sort-provinces" data-key="${key}">${label}${arrow}</button></th>`;
  };
  const tableRows = sorted.map((p, i) =>
    `<tr><td>${i + 1}</td><td>${p.name}<span class="sub">${p.id}</span></td><td>${p.island}</td>` +
    `<td>${p.capital}</td><td class="num">${fmtInt(p.pop)}</td>` +
    `<td class="num">${fmt((p.pop / 270200000) * 100, 1)}%</td></tr>`).join('');
  const islandBtns = ['All', 'Java', 'Sumatra', 'Sulawesi'].map((isl) =>
    `<button class="chip${filter === isl ? ' chip-on' : ''}" data-action="filter-island" data-island="${isl}">${isl === 'All' ? 'All islands' : isl}</button>`).join('');
  const popChart = lineChart(POPULATION_SERIES.map((p) => ({ x: String(p.year), y: p.value })),
    { label: 'Population 2015 to 2024', decimals: 1, unit: 'm', note: 'Population, million — ' });
  const pyr = pyramid(AGE_BANDS, { label: 'Age structure 2024' });
  return pageHead('Population', '281.6 million people in 2024 — the fourth largest population in the world — spread across 38 provinces and more than 17,000 islands.') +
    `<section class="grid-2"><div class="card"><h2>Population 2015–2024</h2>${popChart}` +
    sourceLine('BPS mid-year estimates; 2020 is the census count.') +
    `<p>Growth has slowed from about 1.3% a year in 2015 to 0.8% in 2024, but the population still adds roughly 2–3 million people a year.</p></div>` +
    `<div class="card"><h2>Age structure, 2024</h2>${pyr}` +
    sourceLine('United Nations, World Population Prospects 2024.') +
    `<p>Indonesia is young: 24.6% are under 15 and only 7.3% are 65 or older. The median age is about 30, and 68.1% of people are of working age (15–64).</p></div></section>` +
    `<section class="card"><h2>Key facts</h2><dl class="facts">` +
    `<div><dt>Population density</dt><dd>149 people per km² (2024)</dd></div>` +
    `<div><dt>Urban share</dt><dd>59.0% live in urban areas (UN, 2024)</dd></div>` +
    `<div><dt>Fertility rate</dt><dd>2.1 children per woman (UN, 2024)</dd></div>` +
    `<div><dt>Largest province</dt><dd>West Java — 48.3 million (2020 census)</dd></div>` +
    `<div><dt>Smallest province</dt><dd>South Papua — about 0.5 million (2024)</dd></div>` +
    `<div><dt>Provinces</dt><dd>38, from Aceh to South Papua</dd></div></dl></section>` +
    `<section class="card"><h2>Largest provinces</h2>` +
    `<p>Sort the table by clicking a column heading, or filter by island. The ten provinces below hold ${fmt((totalShown / 270200000) * 100, 1)}% of the 2020 census population${filter === 'All' ? '' : ` — showing ${filter} only`}.</p>` +
    `<div class="chip-row">${islandBtns}</div>` +
    `<div class="table-scroll"><table class="tbl"><thead><tr><th>#</th>${th('name', 'Province')}${th('island', 'Island')}<th>Capital</th>${th('pop', 'Population')}</th><th class="num">Share</th></tr></thead>` +
    `<tbody>${tableRows}</tbody></table></div>` +
    sourceLine('BPS, 2020 Population Census. Shares are of the 2020 census total of 270.2 million.') +
    `</section>`;
}

// ---- Economy ----------------------------------------------------------------
export function viewEconomy(state) {
  const mode = state.gdpMode || 'nominal';
  const chartData = GDP_SERIES.map((g) => ({ x: String(g.year), y: mode === 'nominal' ? g.nominal : g.perCapitaUsd }));
  const chart = mode === 'nominal'
    ? barChart(chartData, { label: 'Nominal GDP 2019 to 2024', decimals: 0, highlightIndex: chartData.length - 1, note: 'Nominal GDP, Rp trillion — ' })
    : barChart(chartData, { label: 'GDP per capita 2019 to 2024', decimals: 0, highlightIndex: chartData.length - 1, note: 'GDP per capita, US$ — ' });
  const growthChart = barChart(GDP_SERIES.map((g) => ({ x: String(g.year), y: g.growth })),
    { label: 'Real GDP growth 2019 to 2024', decimals: 2, highlightIndex: GDP_SERIES.length - 1, note: 'Real GDP growth, % year on year — ' });
  const sectorChart = hbarChart(GDP_SECTORS.slice(0, 8).map((s) => ({ label: s.sector, value: s.share })),
    { label: 'Largest industries 2024', decimals: 1, unit: '%', labelWidth: 230 });
  const qRows = GDP_QUARTERLY_2024.map((q) =>
    `<tr><td>${q.q}</td><td class="num">${fmt(q.growth)}%</td></tr>`).join('');
  const gdpRows = GDP_SERIES.map((g) =>
    `<tr><td>${g.year}</td><td class="num">Rp ${fmtInt(g.nominal)} tn</td><td class="num">${g.growth > 0 ? '+' : ''}${fmt(g.growth)}%</td><td class="num">US$${fmtInt(g.perCapitaUsd)}</td></tr>`).join('');
  return pageHead('Economy', 'Southeast Asia’s largest economy: Rp 22,139 trillion of output in 2024, about US$1.4 trillion, growing 5.03% in real terms.') +
    `<section class="grid-2"><div class="card"><h2>Size of the economy</h2>` +
    `<div class="chip-row"><button class="chip${mode === 'nominal' ? ' chip-on' : ''}" data-action="gdp-mode" data-mode="nominal">Nominal GDP (Rp trillion)</button>` +
    `<button class="chip${mode === 'percapita' ? ' chip-on' : ''}" data-action="gdp-mode" data-mode="percapita">GDP per capita (US$)</button></div>${chart}` +
    sourceLine('BPS national accounts; GDP per capita in US$ at the year’s average exchange rate.') +
    `<p>Nominal GDP rose from Rp 15,833 trillion in 2019 to Rp 22,139 trillion in 2024. GDP per capita reached Rp 78.62 million — US$4,960 — in 2024.</p></div>` +
    `<div class="card"><h2>Growth, year by year</h2>${growthChart}` +
    sourceLine('BPS national accounts, real growth year on year.') +
    `<p>The pandemic year 2020 was the only contraction in this run. Growth has sat close to 5% every year since 2022.</p>` +
    `<h3>2024 by quarter</h3><table class="tbl"><thead><tr><th>Quarter</th><th class="num">Growth (yoy)</th></tr></thead><tbody>${qRows}</tbody></table>` +
    sourceLine('BPS, quarterly national accounts.') + `</div></section>` +
    `<section class="grid-2"><div class="card"><h2>What the economy is made of</h2>${sectorChart}` +
    sourceLine('BPS national accounts, shares of GDP, 2024 (rounded).') +
    `<p>Manufacturing is the largest single industry at 18.7% of GDP, followed by trade at 13.0% and agriculture at 12.5%. Mining, at 8.0%, still matters — coal and nickel drove much of the export boom of 2022.</p></div>` +
    `<div class="card"><h2>GDP at a glance</h2><div class="table-scroll"><table class="tbl"><thead><tr><th>Year</th><th class="num">Nominal GDP</th><th class="num">Real growth</th><th class="num">GDP per capita</th></tr></thead><tbody>${gdpRows}</tbody></table></div>` +
    sourceLine('BPS national accounts; World Bank for GDP per capita in US$.') +
    `<dl class="facts"><div><dt>GDP (PPP)</dt><dd>US$4.67 trillion (2024, IMF)</dd></div>` +
    `<div><dt>World rank, nominal GDP</dt><dd>16th–17th largest economy</dd></div>` +
    `<div><dt>Exchange rate, 2024 average</dt><dd>Rp 15,855 per US$</dd></div></dl></div></section>`;
}

// ---- Prices -----------------------------------------------------------------
export function viewPrices(state) {
  const yr = state.inflationYear || 2024;
  const months = INFLATION_MONTHLY[yr];
  const monthlyChart = lineChart(months.map((v, i) => ({ x: MONTHS[i], y: v })),
    { label: `Monthly CPI inflation ${yr}`, decimals: 2, unit: '%', note: `CPI inflation, % year on year, ${yr} — ` });
  const annualChart = barChart(INFLATION_SERIES.map((x) => ({ x: String(x.year), y: x.value })),
    { label: 'Annual inflation 2019 to 2024', decimals: 2, highlightIndex: INFLATION_SERIES.length - 1, note: 'CPI, annual average, % — ' });
  const yearBtns = [2022, 2023, 2024].map((y) =>
    `<button class="chip${yr === y ? ' chip-on' : ''}" data-action="inflation-year" data-year="${y}">${y}</button>`).join('');
  const monthRows = months.map((v, i) =>
    `<tr><td>${MONTHS[i]} ${yr}</td><td class="num">${fmt(v)}%</td></tr>`).join('');
  return pageHead('Prices & inflation', 'Consumer prices rose 1.57% on average in 2024 — the lowest annual inflation in the series — inside Bank Indonesia’s 2.5% ± 1% target band.') +
    `<section class="grid-2"><div class="card"><h2>Inflation by month</h2>` +
    `<div class="chip-row">${yearBtns}</div>${monthlyChart}` +
    sourceLine('BPS, consumer price index, year-on-year change.') +
    `<p>Inflation peaked at 5.95% in September 2022, when subsidised fuel prices were raised, then fell steadily. By late 2024 it was running below 2%.</p></div>` +
    `<div class="card"><h2>Annual inflation</h2>${annualChart}` +
    sourceLine('BPS, CPI annual average.') +
    `<p>Bank Indonesia targets inflation of 2.5%, plus or minus 1 point. 2024 came in at 1.57% — below the bottom of the band — after food prices eased and the rupiah steadied.</p>` +
    `<h3>Month by month, ${yr}</h3><div class="table-scroll short"><table class="tbl"><thead><tr><th>Month</th><th class="num">Inflation (yoy)</th></tr></thead><tbody>${monthRows}</tbody></table></div></div></section>` +
    `<section class="card"><h2>What moved prices in 2024</h2><dl class="facts">` +
    `<div><dt>Food</dt><dd>Rice and cooking-oil prices eased after the 2023 harvests, pulling volatile-food inflation down.</dd></div>` +
    `<div><dt>Administered prices</dt><dd>Fuel and electricity tariffs were held steady for most of the year.</dd></div>` +
    `<div><dt>Core inflation</dt><dd>Underlying demand stayed soft, so core prices rose only about 2% over the year.</dd></div>` +
    `<div><dt>Policy rate</dt><dd>Bank Indonesia cut its policy rate to 6.00% in September 2024 as inflation fell inside target.</dd></div></dl>` +
    sourceLine('Bank Indonesia, inflation reports 2024; BPS CPI releases.') + `</section>`;
}

// ---- Labour -----------------------------------------------------------------
export function viewLabour(state) {
  const unChart = lineChart(UNEMPLOYMENT_SERIES.map((x) => ({ x: String(x.year), y: x.rate })),
    { label: 'Open unemployment rate 2019 to 2024', decimals: 2, unit: '%', note: 'Open unemployment, % of labour force, August — ' });
  const povChart = lineChart(POVERTY_SERIES.map((x) => ({ x: String(x.year), y: x.value })),
    { label: 'Poverty rate 2019 to 2024', decimals: 2, unit: '%', note: 'Poverty, % of population, September — ' });
  const sectorDonut = donut(EMPLOYMENT_SECTORS.map((s, i) => ({
    label: s.sector, value: s.share, colorClass: ['slice-a', 'slice-b', 'slice-c'][i],
  })), { label: 'Employment by sector 2023', centre: '144.6m', centreSub: 'people working' });
  const formality = hbarChart([
    { label: 'Formal workers', value: LABOUR_2024.formal },
    { label: 'Informal workers', value: LABOUR_2024.informal },
  ], { label: 'Formal and informal work 2024', decimals: 2, unit: '%', labelWidth: 150 });
  return pageHead('Labour', '152.11 million people were in the labour force in August 2024; 144.64 million were working and 7.47 million were looking for work — an unemployment rate of 4.91%.') +
    `<section class="grid-2"><div class="card"><h2>Unemployment is falling</h2>${unChart}` +
    sourceLine('BPS, National Labour Force Survey (Sakernas), August each year.') +
    `<p>Unemployment spiked to 7.07% in August 2020, the first pandemic year, and has fallen every year since. At 4.91% it is below the pre-pandemic level of 5.28% in 2019.</p></div>` +
    `<div class="card"><h2>Who works where</h2>${sectorDonut}` +
    sourceLine('World Bank, World Development Indicators, 2023.') +
    `<p>Services now employ about half of all workers. Agriculture still employs 28.2% — far more than its 12.5% share of GDP — which is why farm productivity and rural wages matter so much for poverty.</p></div></section>` +
    `<section class="grid-2"><div class="card"><h2>Formal vs informal work</h2>${formality}` +
    sourceLine('BPS Sakernas, August 2024.') +
    `<p>Most Indonesian workers — 57.95% — work informally: without a formal contract, social security or paid leave. Formal work grew in 2024, but informality still defines the labour market.</p>` +
    `<dl class="facts"><div><dt>Labour force participation</dt><dd>70.63% of working-age people (Aug 2024)</dd></div>` +
    `<div><dt>Underemployed</dt><dd>8.0% of workers work under 35 hours a week and want more</dd></div>` +
    `<div><dt>Jobs added in a year</dt><dd>4.7 million more people working than in Aug 2023</dd></div></dl></div>` +
    `<div class="card"><h2>Poverty keeps falling</h2>${povChart}` +
    sourceLine('BPS, poverty releases, September figures.') +
    `<p>The poverty rate rose to 10.19% in September 2020, then fell every year. In September 2024 it was 8.57% — about 24.1 million people — and by March 2025 it had fallen further to 8.47%.</p></div></section>`;
}

// ---- Trade ------------------------------------------------------------------
export function viewTrade(state) {
  const mode = state.tradeMode || 'exports';
  const chartData = TRADE_SERIES.map((t) => ({
    x: String(t.year),
    y: mode === 'balance' ? t.exports - t.imports : t[mode],
  }));
  const chart = barChart(chartData, {
    label: mode === 'balance' ? 'Trade balance 2019 to 2024' : `${mode === 'exports' ? 'Exports' : 'Imports'} 2019 to 2024`,
    decimals: 1, highlightIndex: chartData.length - 1,
    note: mode === 'balance' ? 'Trade balance, US$ billion — ' : `${mode === 'exports' ? 'Exports' : 'Imports'}, US$ billion — `,
  });
  const modeBtns = [['exports', 'Exports'], ['imports', 'Imports'], ['balance', 'Balance']].map(([m, label]) =>
    `<button class="chip${mode === m ? ' chip-on' : ''}" data-action="trade-mode" data-mode="${m}">${label}</button>`).join('');
  const partnerChart = hbarChart(TRADE_PARTNERS.map((p) => ({ label: p.partner, value: p.share })),
    { label: 'Export markets 2024', decimals: 1, unit: '%', labelWidth: 170 });
  const productChart = hbarChart(TRADE_PRODUCTS.map((p) => ({ label: p.product, value: p.share })),
    { label: 'Export products 2024', decimals: 1, unit: '%', labelWidth: 260 });
  const rows = TRADE_SERIES.map((t) =>
    `<tr><td>${t.year}</td><td class="num">US$${fmt(t.exports, 1)} bn</td><td class="num">US$${fmt(t.imports, 1)} bn</td>` +
    `<td class="num">${t.exports - t.imports >= 0 ? '+' : ''}US$${fmt(t.exports - t.imports, 1)} bn</td></tr>`).join('');
  return pageHead('Trade', 'Indonesia sold US$264.7 billion of goods abroad in 2024 and bought US$233.7 billion — a surplus of US$31.0 billion, the fifth surplus in a row.') +
    `<section class="grid-2"><div class="card"><h2>Exports, imports, balance</h2>` +
    `<div class="chip-row">${modeBtns}</div>${chart}` +
    sourceLine('BPS / customs, merchandise trade; exports FOB, imports CIF.') +
    `<p>Exports jumped in 2021–2022 on coal, nickel and palm oil, then eased as commodity prices fell. Imports have grown faster since 2023, narrowing the surplus.</p></div>` +
    `<div class="card"><h2>Who buys from Indonesia</h2>${partnerChart}` +
    sourceLine('BPS, shares of goods exports, 2024.') +
    `<p>China takes 22.5% of Indonesia’s goods exports — more than the next two buyers combined. The United States (9.8%) and India (8.1%) follow.</p></div></section>` +
    `<section class="grid-2"><div class="card"><h2>What Indonesia sells</h2>${productChart}` +
    sourceLine('BPS, shares of goods exports, 2024.') +
    `<p>Mineral fuels and oils are still the largest export group at 20.8%, but palm oil (11.7%) and iron & steel (8.6%) show how processing — refining palm oil and smelting nickel into steel — is changing the mix.</p></div>` +
    `<div class="card"><h2>Trade at a glance</h2><div class="table-scroll"><table class="tbl"><thead><tr><th>Year</th><th class="num">Exports</th><th class="num">Imports</th><th class="num">Balance</th></tr></thead><tbody>${rows}</tbody></table></div>` +
    sourceLine('BPS / customs, US$ billion.') +
    `<dl class="facts"><div><dt>Trade in goods & services</dt><dd>Exports US$311.5 bn, 22.3% of GDP (2024, World Bank)</dd></div>` +
    `<div><dt>Current account</dt><dd>–US$8.5 billion deficit (2024)</dd></div>` +
    `<div><dt>Foreign direct investment</dt><dd>US$60.0 billion inflows (2024)</dd></div></dl></div></section>`;
}

// ---- Health & education -----------------------------------------------------
export function viewHealth() {
  const hdiChart = lineChart(HDI_SERIES.map((x) => ({ x: String(x.year), y: x.hdi })),
    { label: 'Human Development Index 2020 to 2025', decimals: 2, note: 'Human Development Index — ' });
  const lifeChart = lineChart(HDI_SERIES.map((x) => ({ x: String(x.year), y: x.life })),
    { label: 'Life expectancy 2020 to 2025', decimals: 2, unit: ' yrs', note: 'Life expectancy at birth, years — ' });
  const rows = HDI_SERIES.map((x) =>
    `<tr><td>${x.year}</td><td class="num">${fmt(x.hdi)}</td><td class="num">${fmt(x.life)}</td><td class="num">${fmt(x.expectedSchool)}</td><td class="num">${fmt(x.meanSchool)}</td></tr>`).join('');
  return pageHead('Health & education', 'People live longer and study longer than a generation ago: life expectancy reached 74.15 years in 2024 and the Human Development Index hit 75.02 — the “high” band.') +
    `<section class="grid-2"><div class="card"><h2>Human Development Index</h2>${hdiChart}` +
    sourceLine('BPS, HDI releases, November 2024 and November 2025.') +
    `<p>The index rose every year from 72.81 in 2020 to 75.90 in 2025, driven by all four of its components: longer lives, more schooling, and higher real spending per person.</p></div>` +
    `<div class="card"><h2>Life expectancy</h2>${lifeChart}` +
    sourceLine('BPS, HDI releases.') +
    `<p>A child born in 2024 can expect to live 74.15 years — 0.78 years longer than a child born in 2020. Life expectancy has risen every year in this series.</p></div></section>` +
    `<section class="card"><h2>The index, piece by piece</h2>` +
    `<div class="table-scroll"><table class="tbl"><thead><tr><th>Year</th><th class="num">HDI</th><th class="num">Life expectancy (yrs)</th><th class="num">Expected schooling (yrs)</th><th class="num">Mean schooling (yrs)</th></tr></thead><tbody>${rows}</tbody></table></div>` +
    sourceLine('BPS, HDI releases 2024–2025. Mean schooling is for people aged 25 and over.') +
    `<dl class="facts"><div><dt>Infant mortality</dt><dd>19.0 deaths per 1,000 live births (World Bank, 2023)</dd></div>` +
    `<div><dt>Maternal mortality</dt><dd>173 deaths per 100,000 live births (WHO, 2020)</dd></div>` +
    `<div><dt>Health spending</dt><dd>3.7% of GDP (World Bank, 2021)</dd></div>` +
    `<div><dt>Youth literacy (15–24)</dt><dd>99.8% (UNESCO, 2020)</dd></div>` +
    `<div><dt>Real spending per person</dt><dd>Rp 12,341,000 a year, adjusted (BPS, 2024)</dd></div>` +
    `<div><dt>HDI rank in the world</dt><dd>112th of 193 countries — high human development (UNDP)</dd></div></dl></section>`;
}

// ---- Sources ----------------------------------------------------------------
export function viewSources() {
  const rows = SOURCES.map((s) =>
    `<tr><td>${s.topic}</td><td>${s.source}</td><td>${s.year}</td></tr>`).join('');
  return pageHead('Sources & methods', 'Every figure on this site comes from a published official source. This page lists them all, so any number can be checked back to its publication.') +
    `<section class="card"><h2>Where each figure comes from</h2>` +
    `<div class="table-scroll"><table class="tbl"><thead><tr><th>Topic</th><th>Publication</th><th>Year</th></tr></thead><tbody>${rows}</tbody></table></div></section>` +
    `<section class="card"><h2>How to read this site</h2><dl class="facts">` +
    `<div><dt>Reference years</dt><dd>Most series end in 2024, the latest full year published by BPS when this site was built. Where a 2025 figure is published — HDI, GDP growth, poverty — it is shown and labelled 2025.</dd></div>` +
    `<div><dt>Two population counts</dt><dd>BPS and the civil registry (Dukcapil) count different things: BPS estimates the people actually living in each place, Dukcapil counts registered residents. This site uses BPS figures throughout, so the series are comparable.</dd></div>` +
    `<div><dt>Rounding</dt><dd>Figures are shown as published, rounded to one or two decimals. Shares may not add to exactly 100% because of rounding.</dd></div>` +
    `<div><dt>What is not here</dt><dd>This site republishes official statistics; it does not collect data, run surveys, or estimate anything itself. Figures are copied from the publications above.</dd></div></dl>` +
    `<h2>How to cite</h2><p class="cite">NusaStat — Statistik Indonesia. “Indonesia in numbers.” Figures as published by BPS-Statistics Indonesia, the World Bank, the United Nations and the World Health Organization; see the table above for the publication behind each figure. Accessed November 2026.</p></section>`;
}
