// NusaStat main: hash router, page state, and every control on the site.
// The site is a single page; each section is a hash route (#/population, ...)
// so every page is reached by a link and the back button works.

import { INDICATORS } from './data.js';
import {
  viewOverview, viewPopulation, viewEconomy, viewPrices, viewLabour, viewTrade,
  viewHealth, viewSources,
} from './views.js';

const ROUTES = {
  '': viewOverview,
  overview: viewOverview,
  population: viewPopulation,
  economy: viewEconomy,
  prices: viewPrices,
  labour: viewLabour,
  trade: viewTrade,
  health: viewHealth,
  sources: viewSources,
};

const NAV = [
  ['overview', 'Overview'], ['population', 'Population'], ['economy', 'Economy'],
  ['prices', 'Prices'], ['labour', 'Labour'], ['trade', 'Trade'],
  ['health', 'Health & education'], ['sources', 'Sources'],
];

// State kept for the session only; nothing is stored, so a fresh load always
// shows the same deterministic starting view.
const state = {
  year: 2024,
  provinceIsland: 'All',
  provinceSort: 'pop',
  provinceDir: 'desc',
  gdpMode: 'nominal',
  inflationYear: 2024,
  tradeMode: 'exports',
};

const app = document.getElementById('app');
const nav = document.getElementById('nav');
const searchInput = document.getElementById('search');
const searchResults = document.getElementById('search-results');

function currentRoute() {
  const hash = window.location.hash.replace(/^#\/?/, '').split('?')[0];
  return ROUTES[hash] ? hash : '';
}

function renderNav(route) {
  nav.innerHTML = NAV.map(([slug, label]) => {
    const active = (route === '' ? 'overview' : route) === slug;
    return `<a href="#/${slug}"${active ? ' aria-current="page"' : ''}>${label}</a>`;
  }).join('');
}

function render() {
  const route = currentRoute();
  const view = ROUTES[route] || viewOverview;
  app.innerHTML = view(state);
  renderNav(route);
  window.scrollTo(0, 0);
  document.title = `NusaStat — ${NAV.find(([s]) => s === (route || 'overview'))?.[1] || 'Overview'} | Statistik Indonesia`;
}

// ---- Search: filters the indicator index as the visitor types. -------------
function runSearch() {
  const q = searchInput.value.trim().toLowerCase();
  if (q.length < 2) { searchResults.innerHTML = ''; searchResults.hidden = true; return; }
  const hits = INDICATORS.filter((x) => x.name.toLowerCase().includes(q)).slice(0, 8);
  if (!hits.length) {
    searchResults.innerHTML = '<li class="no-hit">No indicator matches that — try “inflation”, “exports” or “population”.</li>';
  } else {
    searchResults.innerHTML = hits.map((h) =>
      `<li><a href="#/${h.page}">${h.name}<span>${h.value}</span></a></li>`).join('');
  }
  searchResults.hidden = false;
}

searchInput.addEventListener('input', runSearch);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { searchInput.value = ''; searchResults.hidden = true; }
});
searchResults.addEventListener('click', () => {
  searchInput.value = '';
  searchResults.hidden = true;
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-box')) searchResults.hidden = true;
});

// ---- Controls: every button and select on the pages. -----------------------
app.addEventListener('change', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  if (el.dataset.action === 'year') {
    state.year = Number(el.value);
    render();
  }
});

app.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;
  if (action === 'filter-island') {
    state.provinceIsland = el.dataset.island;
    render();
  } else if (action === 'sort-provinces') {
    const key = el.dataset.key;
    if (state.provinceSort === key) {
      state.provinceDir = state.provinceDir === 'asc' ? 'desc' : 'asc';
    } else {
      state.provinceSort = key;
      state.provinceDir = key === 'name' ? 'asc' : 'desc';
    }
    render();
  } else if (action === 'gdp-mode') {
    state.gdpMode = el.dataset.mode;
    render();
  } else if (action === 'inflation-year') {
    state.inflationYear = Number(el.dataset.year);
    render();
  } else if (action === 'trade-mode') {
    state.tradeMode = el.dataset.mode;
    render();
  }
});

window.addEventListener('hashchange', render);
render();
