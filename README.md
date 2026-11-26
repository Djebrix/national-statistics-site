# NusaStat — Statistik Indonesia

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/Djebrix/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/Djebrix/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

A national statistics site for **Indonesia**, built for the [make.fun bounty](https://make.fun/bounty/best-national-statistics-site-20261126-0539). It runs in a web browser from static files, on desktop and on a phone, with **no network requests** — every figure, chart and style is in the files under `app/`.

## What it shows

Eight linked sections, each with real published figures, charts drawn as inline SVG, and working controls:

- **Overview** — the year in review: pick a year (2020–2024) and all eight headline cards update; population and growth charts, the five largest provinces, and the latest releases.
- **Population** — population 2015–2024, the 2024 age pyramid, and a sortable, island-filterable table of the ten largest provinces (2020 Census).
- **Economy** — nominal GDP or GDP per capita at the flick of a switch, real growth by year and by quarter, and GDP by industry.
- **Prices & inflation** — annual inflation 2019–2024 and month-by-month CPI for 2022, 2023 or 2024, plus what moved prices in 2024.
- **Labour** — unemployment 2019–2024, the August 2024 labour-force picture, employment by sector, formal vs informal work, and the poverty rate.
- **Trade** — exports, imports or the balance by year, top export markets and top export products for 2024.
- **Health & education** — the Human Development Index and its components, 2020–2025, plus mortality, health spending and literacy.
- **Sources & methods** — the publication behind every figure, and how to cite the site.

Every control does what it says: the year selector, island filter, column sorting, GDP and trade toggles, inflation-year buttons and the indicator search in the header all change what the page shows.

## Data sources (all published, with years)

| Topic | Source | Year |
|---|---|---|
| Population | BPS-Statistics Indonesia, mid-year estimates; 2020 Population Census | 2015–2024 |
| Age structure | United Nations, World Population Prospects 2024 | 2024 |
| GDP, growth, GDP per capita | BPS, national accounts | 2019–2024 |
| Inflation | BPS, CPI releases; Bank Indonesia | 2019–2024 |
| Labour force & unemployment | BPS, National Labour Force Survey (Sakernas) | 2019–2024 |
| Employment by sector | World Bank, World Development Indicators | 2023 |
| Poverty | BPS poverty releases | 2019–2024 |
| Trade | BPS / customs trade statistics | 2019–2024 |
| Human Development Index | BPS, HDI releases | 2020–2025 |
| Mortality, health spending, literacy | World Bank WDI; WHO; UNESCO | 2020–2023 |

Headline figures for 2024: population 281.6 million; GDP Rp 22,139 trillion; real growth 5.03%; GDP per capita US$4,960; inflation 1.57%; open unemployment 4.91% (Aug 2024); poverty 8.57% (Sep 2024); exports US$264.7 billion; HDI 75.02.

## Open it locally

```sh
node serve.ts        # serves app/ at http://localhost:8080
```

Or open `app/index.html` through any static file server. No build step, no dependencies.

## Layout

```
app/
  index.html   page shell: masthead, search, nav, footer
  style.css    all styling (system fonts only)
  data.js      every dataset, with its source and year
  charts.js    SVG chart builders (line, bar, horizontal bar, pyramid, donut)
  views.js     one renderer per page
  main.js      hash router, state, search and controls
main.ts        hand-in program: copies app/ and screenshots/ to /output
               and writes dossier.json with the kit library
serve.ts       tiny static server for local testing
screenshots/   real renders of the site (desktop + phone)
vendor/
  makefun-frontend.ts   the kit library, unchanged
```

## License

MIT — see [LICENSE](LICENSE).
