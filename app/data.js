// NusaStat data: published official figures for Indonesia, each with its source
// and reference year. Figures are copied from the publications listed in SOURCES;
// nothing here is estimated by this site. Values are rounded as published.

export const COUNTRY = {
  name: 'Indonesia',
  nameId: 'Republik Indonesia',
  capital: 'Jakarta',
  areaKm2: 1904569,
  provinces: 38,
  regenciesCities: 514,
  currency: 'Indonesian rupiah (IDR)',
  language: 'Bahasa Indonesia',
};

export const LATEST = {
  year: 2024,
  population: 281.6, // million, BPS mid-year estimate
  populationNote: 'BPS mid-year estimate, 2024',
  gdpNominalRpTn: 22139, // Rp trillion, BPS
  gdpGrowth: 5.03, // %, BPS
  gdpPerCapitaUsd: 4960, // US$, BPS (Rp 78.62 million)
  inflation: 1.57, // % annual average CPI, BPS
  unemployment: 4.91, // % open unemployment, Aug 2024, BPS Sakernas
  poverty: 8.57, // % of population, Sep 2024, BPS
  exportsUsdBn: 264.7, // goods, BPS / customs
  importsUsdBn: 233.7,
  tradeBalanceUsdBn: 31.0,
  hdi: 75.02, // BPS, high human development
  lifeExpectancy: 74.15, // years, BPS
};

// Population, million people, BPS mid-year estimates (2020 is the census count).
export const POPULATION_SERIES = [
  { year: 2015, value: 255.5 }, { year: 2016, value: 258.7 },
  { year: 2017, value: 261.9 }, { year: 2018, value: 265.0 },
  { year: 2019, value: 268.1 }, { year: 2020, value: 270.2 },
  { year: 2021, value: 272.3 }, { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 }, { year: 2024, value: 281.6 },
];

// Age structure, 2024, shares of total population in percent.
// UN World Population Prospects 2024: 0-14 is 24.6%, 15-64 is 68.1%, 65+ is 7.3%.
export const AGE_BANDS = [
  { band: '0–9', male: 8.0, female: 7.6 },
  { band: '10–19', male: 8.4, female: 8.0 },
  { band: '20–29', male: 8.1, female: 7.9 },
  { band: '30–39', male: 7.8, female: 7.5 },
  { band: '40–49', male: 6.8, female: 6.7 },
  { band: '50–59', male: 5.2, female: 5.2 },
  { band: '60–69', male: 3.4, female: 3.5 },
  { band: '70+', male: 2.7, female: 3.2 },
];

// Ten most populous provinces, 2020 Population Census (BPS).
export const PROVINCES = [
  { name: 'West Java', id: 'Jawa Barat', island: 'Java', pop: 48274162, capital: 'Bandung' },
  { name: 'East Java', id: 'Jawa Timur', island: 'Java', pop: 40665696, capital: 'Surabaya' },
  { name: 'Central Java', id: 'Jawa Tengah', island: 'Java', pop: 36516035, capital: 'Semarang' },
  { name: 'North Sumatra', id: 'Sumatera Utara', island: 'Sumatra', pop: 14799361, capital: 'Medan' },
  { name: 'Banten', id: 'Banten', island: 'Java', pop: 11904562, capital: 'Serang' },
  { name: 'Jakarta', id: 'DKI Jakarta', island: 'Java', pop: 10562088, capital: 'Jakarta' },
  { name: 'South Sulawesi', id: 'Sulawesi Selatan', island: 'Sulawesi', pop: 9073509, capital: 'Makassar' },
  { name: 'Lampung', id: 'Lampung', island: 'Sumatra', pop: 9007848, capital: 'Bandar Lampung' },
  { name: 'South Sumatra', id: 'Sumatera Selatan', island: 'Sumatra', pop: 8467432, capital: 'Palembang' },
  { name: 'Riau', id: 'Riau', island: 'Sumatra', pop: 6394087, capital: 'Pekanbaru' },
];

// GDP at current prices, Rp trillion, BPS. Growth is real, year on year.
export const GDP_SERIES = [
  { year: 2019, nominal: 15833, growth: 5.02, perCapitaUsd: 4178 },
  { year: 2020, nominal: 15434, growth: -2.07, perCapitaUsd: 3934 },
  { year: 2021, nominal: 16970, growth: 3.70, perCapitaUsd: 4351 },
  { year: 2022, nominal: 19588, growth: 5.31, perCapitaUsd: 4784 },
  { year: 2023, nominal: 20892, growth: 5.05, perCapitaUsd: 4877 },
  { year: 2024, nominal: 22139, growth: 5.03, perCapitaUsd: 4960 },
];

// Quarterly real GDP growth, year on year, %, BPS.
export const GDP_QUARTERLY_2024 = [
  { q: 'Q1 2024', growth: 5.11 }, { q: 'Q2 2024', growth: 5.05 },
  { q: 'Q3 2024', growth: 4.95 }, { q: 'Q4 2024', growth: 5.02 },
];

// Shares of GDP by industry, %, BPS 2024 (rounded; remainder is other industries).
export const GDP_SECTORS = [
  { sector: 'Manufacturing', share: 18.7 },
  { sector: 'Wholesale & retail trade', share: 13.0 },
  { sector: 'Agriculture, forestry & fishing', share: 12.5 },
  { sector: 'Construction', share: 10.0 },
  { sector: 'Mining & quarrying', share: 8.0 },
  { sector: 'Financial & insurance', share: 4.2 },
  { sector: 'Transport & storage', share: 3.9 },
  { sector: 'Information & communication', share: 3.9 },
  { sector: 'Public administration', share: 3.4 },
  { sector: 'Education', share: 3.2 },
  { sector: 'Real estate', share: 2.7 },
  { sector: 'Accommodation & food service', share: 2.6 },
  { sector: 'Health & social work', share: 1.2 },
  { sector: 'Other industries', share: 12.7 },
];

// Consumer price inflation, annual average, %, BPS.
export const INFLATION_SERIES = [
  { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 },
];

// CPI inflation by month, year on year, %, BPS.
export const INFLATION_MONTHLY = {
  2022: [2.18, 2.06, 2.64, 3.47, 3.55, 4.35, 4.94, 4.69, 5.95, 5.71, 5.42, 5.51],
  2023: [5.28, 5.47, 4.97, 4.33, 4.00, 3.52, 3.08, 3.27, 2.28, 2.56, 2.86, 2.61],
  2024: [2.57, 2.75, 3.05, 3.00, 2.84, 2.51, 2.13, 2.12, 1.84, 1.71, 1.55, 1.57],
};
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Labour market, BPS National Labour Force Survey (Sakernas), August of each year.
export const UNEMPLOYMENT_SERIES = [
  { year: 2019, rate: 5.28 }, { year: 2020, rate: 7.07 },
  { year: 2021, rate: 6.49 }, { year: 2022, rate: 5.86 },
  { year: 2023, rate: 5.32 }, { year: 2024, rate: 4.91 },
];
export const LABOUR_2024 = {
  labourForce: 152.11, // million people, Aug 2024
  employed: 144.64, // million
  unemployed: 7.47, // million
  participation: 70.63, // % of working-age population
  formal: 42.05, // % of employed
  informal: 57.95, // % of employed
  underemployed: 8.0, // % of employed, working under 35 hours and wanting more
};
// Employment by broad sector, % of total employment, World Bank WDI 2023.
export const EMPLOYMENT_SECTORS = [
  { sector: 'Services', share: 49.8 },
  { sector: 'Agriculture', share: 28.2 },
  { sector: 'Industry', share: 22.0 },
];

// Poverty rate, % of population, BPS (September figures).
export const POVERTY_SERIES = [
  { year: 2019, value: 9.22 }, { year: 2020, value: 10.19 },
  { year: 2021, value: 9.71 }, { year: 2022, value: 9.57 },
  { year: 2023, value: 9.36 }, { year: 2024, value: 8.57 },
];

// Merchandise trade, US$ billion, BPS / customs (exports FOB, imports CIF).
export const TRADE_SERIES = [
  { year: 2019, exports: 167.7, imports: 171.3 },
  { year: 2020, exports: 163.2, imports: 141.6 },
  { year: 2021, exports: 231.6, imports: 196.2 },
  { year: 2022, exports: 291.9, imports: 237.4 },
  { year: 2023, exports: 258.8, imports: 221.9 },
  { year: 2024, exports: 264.7, imports: 233.7 },
];
// Largest buyers of Indonesian goods, 2024, shares of goods exports, BPS.
export const TRADE_PARTNERS = [
  { partner: 'China', share: 22.5 },
  { partner: 'United States', share: 9.8 },
  { partner: 'India', share: 8.1 },
  { partner: 'Japan', share: 6.4 },
  { partner: 'Malaysia', share: 4.2 },
  { partner: 'All other markets', share: 49.0 },
];
// Largest export product groups, 2024, shares of goods exports, BPS.
export const TRADE_PRODUCTS = [
  { product: 'Mineral fuels & oils', share: 20.8 },
  { product: 'Animal & vegetable fats & oils (palm oil)', share: 11.7 },
  { product: 'Iron & steel', share: 8.6 },
  { product: 'All other goods', share: 58.9 },
];

// Human Development Index and its components, BPS.
export const HDI_SERIES = [
  { year: 2020, hdi: 72.81, life: 73.37, expectedSchool: 12.98, meanSchool: 8.48 },
  { year: 2021, hdi: 73.16, life: 73.46, expectedSchool: 13.08, meanSchool: 8.54 },
  { year: 2022, hdi: 73.77, life: 73.70, expectedSchool: 13.10, meanSchool: 8.69 },
  { year: 2023, hdi: 74.39, life: 73.93, expectedSchool: 13.15, meanSchool: 8.77 },
  { year: 2024, hdi: 75.02, life: 74.15, expectedSchool: 13.21, meanSchool: 8.85 },
  { year: 2025, hdi: 75.90, life: 74.47, expectedSchool: 13.30, meanSchool: 9.07 },
];

// Latest releases, newest first, with the release date as published.
export const RELEASES = [
  { date: '5 Feb 2026', title: 'Economy grew 5.11% in 2025; GDP Rp 23,821 trillion', source: 'BPS' },
  { date: '5 Nov 2025', title: 'Human Development Index 2025 reached 75.90', source: 'BPS' },
  { date: 'Jul 2025', title: 'Poverty rate fell to 8.47% in March 2025', source: 'BPS' },
  { date: '5 Feb 2025', title: 'Economy grew 5.03% in 2024; GDP per capita US$4,960', source: 'BPS' },
  { date: '15 Nov 2024', title: 'Human Development Index 2024 reached 75.02', source: 'BPS' },
  { date: 'Nov 2024', title: 'Open unemployment 4.91% in August 2024, lowest since 2019', source: 'BPS Sakernas' },
];

// Every figure's publication, for the Sources page and the footer.
export const SOURCES = [
  { topic: 'Population 2015–2024', source: 'BPS-Statistics Indonesia, mid-year population estimates; 2020 Population Census', year: '2015–2024' },
  { topic: 'Population by province', source: 'BPS, 2020 Population Census', year: '2020' },
  { topic: 'Age structure', source: 'United Nations, World Population Prospects 2024', year: '2024' },
  { topic: 'GDP, growth and GDP per capita', source: 'BPS, national accounts release, 5 February 2025', year: '2019–2024' },
  { topic: 'GDP by industry', source: 'BPS, national accounts', year: '2024' },
  { topic: 'Consumer price inflation', source: 'BPS, CPI releases; Bank Indonesia inflation reports', year: '2019–2024' },
  { topic: 'Labour force and unemployment', source: 'BPS, National Labour Force Survey (Sakernas), August 2024', year: '2019–2024' },
  { topic: 'Employment by sector', source: 'World Bank, World Development Indicators', year: '2023' },
  { topic: 'Poverty rate', source: 'BPS, poverty releases (September figures)', year: '2019–2024' },
  { topic: 'Exports, imports and partners', source: 'BPS / Directorate General of Customs and Excise, trade statistics', year: '2019–2024' },
  { topic: 'Human Development Index', source: 'BPS, HDI releases, 15 November 2024 and 5 November 2025', year: '2020–2025' },
  { topic: 'Infant and maternal mortality', source: 'World Bank WDI (2023); WHO maternal mortality estimates (2020)', year: '2020–2023' },
  { topic: 'Health spending and literacy', source: 'World Bank WDI (2021); UNESCO Institute for Statistics (2020)', year: '2020–2021' },
];

// Searchable indicator index: name, page, and the figure shown there.
export const INDICATORS = [
  { name: 'Population', page: 'population', value: '281.6 million (2024)' },
  { name: 'Population growth', page: 'population', value: '0.82% a year (2024)' },
  { name: 'Median age', page: 'population', value: 'about 30 years (2024)' },
  { name: 'Urban population', page: 'population', value: '59.0% (2024)' },
  { name: 'West Java population', page: 'population', value: '48.3 million (2020 census)' },
  { name: 'Gross domestic product', page: 'economy', value: 'Rp 22,139 trillion (2024)' },
  { name: 'GDP growth', page: 'economy', value: '5.03% (2024)' },
  { name: 'GDP per capita', page: 'economy', value: 'US$4,960 (2024)' },
  { name: 'Manufacturing share of GDP', page: 'economy', value: '18.7% (2024)' },
  { name: 'Inflation', page: 'prices', value: '1.57% (2024)' },
  { name: 'CPI inflation by month', page: 'prices', value: 'Dec 2024: 1.57% year on year' },
  { name: 'Unemployment rate', page: 'labour', value: '4.91% (Aug 2024)' },
  { name: 'Labour force', page: 'labour', value: '152.11 million (Aug 2024)' },
  { name: 'Informal employment', page: 'labour', value: '57.95% of workers (Aug 2024)' },
  { name: 'Poverty rate', page: 'labour', value: '8.57% (Sep 2024)' },
  { name: 'Exports', page: 'trade', value: 'US$264.7 billion (2024)' },
  { name: 'Imports', page: 'trade', value: 'US$233.7 billion (2024)' },
  { name: 'Trade surplus', page: 'trade', value: 'US$31.0 billion (2024)' },
  { name: 'Largest export market', page: 'trade', value: 'China, 22.5% of exports (2024)' },
  { name: 'Human Development Index', page: 'health', value: '75.02 (2024)' },
  { name: 'Life expectancy', page: 'health', value: '74.15 years (2024)' },
  { name: 'Mean years of schooling', page: 'health', value: '8.85 years (2024)' },
  { name: 'Infant mortality', page: 'health', value: '19.0 per 1,000 live births (2023)' },
];
