'use strict';

// ======================================================
//  CONSTANTS
// ======================================================

const GAME_GENRES = [
  { id: 'action',     label: '⚔️ Action' },
  { id: 'adventure',  label: '🗺️ Abenteuer' },
  { id: 'rpg',        label: '🎭 RPG' },
  { id: 'strategy',   label: '♟️ Strategie' },
  { id: 'platformer', label: '🏃 Platformer' },
  { id: 'puzzle',     label: '🧩 Puzzle' },
  { id: 'simulation', label: '🏡 Simulation' },
  { id: 'horror',     label: '👻 Horror' },
  { id: 'fighting',   label: '🥊 Fighting' },
  { id: 'sport',      label: '⚽ Sport' },
  { id: 'racing',     label: '🏎️ Rennspiel' },
  { id: 'shooter',    label: '🎯 Shooter' },
  { id: 'other',      label: '✨ Sonstiges' },
];

const ANIME_GENRES = [
  { id: 'action',    label: '⚔️ Action' },
  { id: 'adventure', label: '🗺️ Abenteuer' },
  { id: 'comedy',    label: '😄 Comedy' },
  { id: 'drama',     label: '🎭 Drama' },
  { id: 'fantasy',   label: '🐉 Fantasy' },
  { id: 'horror',    label: '👻 Horror' },
  { id: 'mecha',     label: '🤖 Mecha' },
  { id: 'romance',   label: '💕 Romance' },
  { id: 'scifi',     label: '🚀 Sci-Fi' },
  { id: 'sol',       label: '☕ Slice of Life' },
  { id: 'sport',     label: '🏆 Sport' },
  { id: 'thriller',  label: '🔪 Thriller' },
  { id: 'shounen',   label: '🔥 Shōnen' },
  { id: 'shoujo',    label: '🌸 Shōjo' },
  { id: 'isekai',    label: '🌀 Isekai' },
  { id: 'psycho',    label: '🧠 Psycho' },
  { id: 'other',     label: '✨ Sonstiges' },
];

const PLATFORMS = [
  'Nintendo Switch',
  'Nintendo Switch 2',
  'Nintendo 3DS',
  'Nintendo DS',
  'Wii U',
  'Wii',
  'Game Boy / GBA',
  'PC',
  'PlayStation 4',
  'PlayStation 5',
  'Xbox',
  'Mobile',
  'Sonstiges',
];

const GAME_STATUSES = {
  geplant:     { label: 'Geplant',     css: 'geplant' },
  spielend:    { label: 'Spielend',    css: 'spielend' },
  gespielt:    { label: 'Gespielt',    css: 'gespielt' },
  abgebrochen: { label: 'Abgebrochen', css: 'abgebrochen' },
};

const ANIME_STATUSES = {
  geplant:     { label: 'Geplant',    css: 'geplant' },
  schauend:    { label: 'Am Schauen', css: 'schauend' },
  geschaut:    { label: 'Geschaut',   css: 'geschaut' },
  abgebrochen: { label: 'Abgebrochen',css: 'abgebrochen' },
};

const STAT_COLORS = {
  geplant:     'var(--status-planned)',
  spielend:    'var(--status-active)',
  schauend:    'var(--status-active)',
  gespielt:    'var(--coral)',
  geschaut:    'var(--coral)',
  abgebrochen: 'var(--status-dropped)',
};

const SORT_OPTIONS = [
  { value: 'dateAdded-desc', label: 'Neueste zuerst' },
  { value: 'dateAdded-asc',  label: 'Älteste zuerst' },
  { value: 'title-asc',      label: 'A–Z' },
  { value: 'title-desc',     label: 'Z–A' },
  { value: 'rating-desc',    label: 'Beste Bewertung' },
  { value: 'dateLast-desc',  label: 'Zuletzt gespielt' },
];

const STORAGE_KEY = 'tracker-v1-data';

// ======================================================
//  DEFAULT DATA (Vorauswahl beim ersten Start)
// ======================================================

const DEFAULT_DATA = {
  games: [
    // --- Mario ---
    { id: 'dg-01', title: 'Super Mario Odyssey',                         platform: 'Nintendo Switch',   genres: ['platformer', 'adventure'], status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-02', title: 'Super Mario Bros. Wonder',                    platform: 'Nintendo Switch',   genres: ['platformer'],              status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-03', title: 'Mario Kart 8 Deluxe',                         platform: 'Nintendo Switch',   genres: ['racing', 'sport'],         status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-04', title: "Super Mario 3D World + Bowser's Fury",        platform: 'Nintendo Switch',   genres: ['platformer', 'adventure'], status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-05', title: 'Paper Mario: The Origami King',               platform: 'Nintendo Switch',   genres: ['rpg', 'adventure'],        status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-06', title: 'Mario + Rabbids Kingdom Battle',              platform: 'Nintendo Switch',   genres: ['strategy'],                status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-07', title: 'Mario + Rabbids Sparks of Hope',              platform: 'Nintendo Switch',   genres: ['strategy'],                status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    // --- Zelda ---
    { id: 'dg-08', title: 'The Legend of Zelda: Breath of the Wild',    platform: 'Nintendo Switch',   genres: ['adventure', 'action'],     status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-09', title: 'The Legend of Zelda: Tears of the Kingdom',  platform: 'Nintendo Switch',   genres: ['adventure', 'action'],     status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-10', title: 'The Legend of Zelda: Skyward Sword HD',      platform: 'Nintendo Switch',   genres: ['adventure', 'action'],     status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-11', title: "The Legend of Zelda: Link's Awakening",      platform: 'Nintendo Switch',   genres: ['adventure', 'puzzle'],     status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-12', title: 'The Legend of Zelda: Echoes of Wisdom',      platform: 'Nintendo Switch',   genres: ['adventure', 'puzzle'],     status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    // --- Pokémon ---
    { id: 'dg-13', title: "Pokémon Let's Go, Pikachu! / Eevee!",        platform: 'Nintendo Switch',   genres: ['rpg', 'adventure'],        status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-14', title: 'Pokémon Sword / Shield',                     platform: 'Nintendo Switch',   genres: ['rpg', 'adventure'],        status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-15', title: 'Pokémon Brilliant Diamond / Shining Pearl',  platform: 'Nintendo Switch',   genres: ['rpg', 'adventure'],        status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-16', title: 'Pokémon Legends: Arceus',                    platform: 'Nintendo Switch',   genres: ['rpg', 'action'],           status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-17', title: 'Pokémon Scarlet / Violet',                   platform: 'Nintendo Switch',   genres: ['rpg', 'adventure'],        status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    // --- Xenoblade ---
    { id: 'dg-18', title: 'Xenoblade Chronicles: Definitive Edition',   platform: 'Nintendo Switch',   genres: ['rpg', 'action'],           status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-19', title: 'Xenoblade Chronicles 2',                     platform: 'Nintendo Switch',   genres: ['rpg', 'action'],           status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-20', title: 'Xenoblade Chronicles 3',                     platform: 'Nintendo Switch',   genres: ['rpg', 'action'],           status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
    { id: 'dg-21', title: 'Xenoblade Chronicles X: Definitive Edition', platform: 'Nintendo Switch 2', genres: ['rpg', 'action'],           status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', notes: '' },
  ],
  anime: [
    { id: 'da-01', title: 'Attack on Titan',                            genres: ['action', 'thriller', 'drama'],    status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 94,  notes: '' },
    { id: 'da-02', title: 'Demon Slayer: Kimetsu no Yaiba',             genres: ['action', 'shounen', 'fantasy'],   status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 55,  notes: '' },
    { id: 'da-03', title: 'Jujutsu Kaisen',                             genres: ['action', 'shounen', 'horror'],    status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 47,  notes: '' },
    { id: 'da-04', title: 'My Hero Academia',                           genres: ['action', 'shounen'],              status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 138, notes: '' },
    { id: 'da-05', title: 'One Punch Man',                              genres: ['action', 'comedy', 'shounen'],    status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 24,  notes: '' },
    { id: 'da-06', title: 'Fullmetal Alchemist: Brotherhood',           genres: ['action', 'adventure', 'drama'],   status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 64,  notes: '' },
    { id: 'da-07', title: 'Death Note',                                 genres: ['thriller', 'psycho', 'drama'],    status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 37,  notes: '' },
    { id: 'da-08', title: 'Steins;Gate',                                genres: ['scifi', 'thriller', 'drama'],     status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 24,  notes: '' },
    { id: 'da-09', title: 'Re:Zero − Starting Life in Another World',   genres: ['isekai', 'fantasy', 'drama'],     status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 50,  notes: '' },
    { id: 'da-10', title: 'Sword Art Online',                           genres: ['action', 'isekai', 'adventure'],  status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 99,  notes: '' },
    { id: 'da-11', title: 'Hunter x Hunter (2011)',                     genres: ['action', 'adventure', 'shounen'], status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 148, notes: '' },
    { id: 'da-12', title: 'Naruto Shippuden',                           genres: ['action', 'adventure', 'shounen'], status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 500, notes: '' },
    { id: 'da-13', title: 'Dragon Ball Super',                          genres: ['action', 'adventure', 'shounen'], status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 131, notes: '' },
    { id: 'da-14', title: 'Tokyo Ghoul',                                genres: ['action', 'horror', 'drama'],      status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 48,  notes: '' },
    { id: 'da-15', title: 'Vinland Saga',                               genres: ['action', 'adventure', 'drama'],   status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 48,  notes: '' },
    { id: 'da-16', title: 'Spy × Family',                               genres: ['comedy', 'action', 'sol'],        status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 37,  notes: '' },
    { id: 'da-17', title: 'Chainsaw Man',                               genres: ['action', 'horror', 'shounen'],    status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 12,  notes: '' },
    { id: 'da-18', title: "Frieren: Beyond Journey's End",              genres: ['fantasy', 'adventure', 'drama'],  status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 28,  notes: '' },
    { id: 'da-19', title: 'Haikyuu!!',                                  genres: ['sport', 'shounen', 'drama'],      status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 85,  notes: '' },
    { id: 'da-20', title: 'Made in Abyss',                              genres: ['adventure', 'fantasy', 'horror'], status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 25,  notes: '' },
    { id: 'da-21', title: 'That Time I Got Reincarnated as a Slime',    genres: ['isekai', 'fantasy', 'comedy'],    status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 48,  notes: '' },
    { id: 'da-22', title: 'Mushoku Tensei: Jobless Reincarnation',      genres: ['isekai', 'fantasy', 'adventure'], status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 23,  notes: '' },
    { id: 'da-23', title: 'Kaguya-sama: Love Is War',                   genres: ['comedy', 'romance'],              status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 37,  notes: '' },
    { id: 'da-24', title: 'Oshi no Ko',                                 genres: ['drama', 'thriller', 'psycho'],    status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 23,  notes: '' },
    { id: 'da-25', title: 'Black Clover',                               genres: ['action', 'fantasy', 'shounen'],   status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 170, notes: '' },
    { id: 'da-26', title: 'Overlord',                                   genres: ['isekai', 'fantasy', 'action'],    status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 52,  notes: '' },
    { id: 'da-27', title: 'Violet Evergarden',                          genres: ['drama', 'romance', 'sol'],        status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 13,  notes: '' },
    { id: 'da-28', title: 'Dr. Stone',                                  genres: ['adventure', 'scifi', 'shounen'],  status: 'geplant', rating: 0, dateAdded: '2026-06-01', dateStarted: '', dateLast: '', episodesCurrent: 0, episodesTotal: 35,  notes: '' },
  ],
};

// ======================================================
//  STATE
// ======================================================

const state = {
  tab: 'games',
  filters: { search: '', status: '', genre: '' },
  sort: 'dateAdded-desc',
  data: { games: [], anime: [] },
  editingId: null,
  confirmCallback: null,
};

// ======================================================
//  STORAGE
// ======================================================

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.games) && Array.isArray(parsed.anime)) {
        state.data = parsed;
        return;
      }
    }
    // Erste App-Öffnung: Vorauswahl laden
    state.data = JSON.parse(JSON.stringify(DEFAULT_DATA));
    saveData();
  } catch {
    console.warn('Tracker: Fehler beim Laden der Daten.');
  }
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
    schedulePush();
  } catch {
    showToast('⚠️ Speichern fehlgeschlagen!');
  }
}

// ======================================================
//  UTILITIES
// ======================================================

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(str) {
  if (!str) return '–';
  const parts = str.split('-');
  if (parts.length !== 3) return str;
  return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getGenreLabel(id, tab) {
  const list = tab === 'games' ? GAME_GENRES : ANIME_GENRES;
  return list.find(g => g.id === id)?.label ?? id;
}

function getStatuses(tab) {
  return tab === 'games' ? GAME_STATUSES : ANIME_STATUSES;
}

function getCurrentList() {
  return state.data[state.tab] ?? [];
}

// ======================================================
//  FILTERING & SORTING
// ======================================================

function getFilteredSorted() {
  let items = [...getCurrentList()];
  const { search, status, genre } = state.filters;

  if (search) {
    const q = search.toLowerCase();
    items = items.filter(i =>
      i.title.toLowerCase().includes(q) ||
      (i.notes ?? '').toLowerCase().includes(q)
    );
  }
  if (status) {
    items = items.filter(i => i.status === status);
  }
  if (genre) {
    items = items.filter(i => (i.genres ?? []).includes(genre));
  }

  const [field, dir] = state.sort.split('-');
  items.sort((a, b) => {
    let va, vb;
    switch (field) {
      case 'title':    va = a.title.toLowerCase();  vb = b.title.toLowerCase(); break;
      case 'rating':   va = a.rating ?? 0;           vb = b.rating ?? 0;         break;
      case 'dateLast': va = a.dateLast ?? '';         vb = b.dateLast ?? '';      break;
      default:         va = a.dateAdded ?? '';        vb = b.dateAdded ?? '';     break;
    }
    if (va < vb) return dir === 'asc' ? -1 : 1;
    if (va > vb) return dir === 'asc' ?  1 : -1;
    return 0;
  });

  return items;
}

// ======================================================
//  RENDER
// ======================================================

function render() {
  const items = getFilteredSorted();
  const grid  = document.getElementById('cards-grid');
  const empty = document.getElementById('empty-state');

  if (items.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
  } else {
    empty.classList.add('hidden');
    grid.innerHTML = items.map(item => renderCard(item)).join('');

    grid.querySelectorAll('.card').forEach(card => {
      const id = card.dataset.id;
      card.addEventListener('click', e => {
        if (!e.target.closest('.card-actions')) openDetailModal(id);
      });
      card.querySelector('.btn-edit')?.addEventListener('click', e => {
        e.stopPropagation();
        openEditModal(id);
      });
      card.querySelector('.btn-delete')?.addEventListener('click', e => {
        e.stopPropagation();
        confirmDelete(id);
      });
      card.querySelector('.btn-quick-done')?.addEventListener('click', e => {
        e.stopPropagation();
        quickDone(id);
      });
    });
  }

  renderStats(items);
  syncFilterOptions();
}

function renderCard(item) {
  const statuses = getStatuses(state.tab);
  const status   = statuses[item.status] ?? { label: item.status, css: item.status };
  const isDone   = item.status === 'gespielt' || item.status === 'geschaut';

  const genreBadges = (item.genres ?? [])
    .map(g => `<span class="genre-badge">${getGenreLabel(g, state.tab)}</span>`)
    .join('');

  const ratingHtml = (item.rating > 0)
    ? `<div class="card-rating">★ ${item.rating}<span style="font-weight:400;color:var(--text-muted)">/10</span></div>`
    : `<div class="card-rating empty">Keine Bewertung</div>`;

  const metaItems = [];
  if (state.tab === 'games' && item.platform) {
    metaItems.push(`<span class="card-meta-item">🕹️ ${escapeHtml(item.platform)}</span>`);
  }
  if (item.dateStarted) {
    metaItems.push(`<span class="card-meta-item">▶ ${formatDate(item.dateStarted)}</span>`);
  }
  if (item.dateLast) {
    const icon = state.tab === 'games' ? '🎮' : '👁️';
    metaItems.push(`<span class="card-meta-item">${icon} ${formatDate(item.dateLast)}</span>`);
  }

  let episodeHtml = '';
  if (state.tab === 'anime' && (item.episodesTotal > 0)) {
    const cur = item.episodesCurrent ?? 0;
    const tot = item.episodesTotal;
    const pct = Math.min(100, Math.round((cur / tot) * 100));
    episodeHtml = `
      <div class="episode-bar">
        <div class="episode-text">Ep. ${cur} / ${tot}</div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
      </div>`;
  }

  return `
    <div class="card" data-id="${escapeHtml(item.id)}" role="listitem">
      <div class="card-top">
        <div class="card-genres">${genreBadges}</div>
        <span class="status-pill status-${escapeHtml(status.css)}">${escapeHtml(status.label)}</span>
      </div>
      <div class="card-title">${escapeHtml(item.title)}</div>
      <div class="card-meta">${metaItems.join('')}</div>
      ${episodeHtml}
      <div class="card-bottom">
        ${ratingHtml}
        <div class="card-actions">
          <button class="card-action-btn btn-quick-done${isDone ? ' is-done' : ''}" title="${isDone ? 'Abgehakt' : 'Als gespielt/geschaut markieren'}" aria-label="Abhaken">✓</button>
          <button class="card-action-btn btn-edit" title="Bearbeiten" aria-label="Bearbeiten">✏️</button>
          <button class="card-action-btn btn-delete danger" title="Löschen" aria-label="Löschen">🗑️</button>
        </div>
      </div>
    </div>`;
}

function renderStats(items) {
  const bar      = document.getElementById('stats-bar');
  const statuses = getStatuses(state.tab);
  const counts   = Object.fromEntries(Object.keys(statuses).map(k => [k, 0]));
  items.forEach(i => { if (counts[i.status] !== undefined) counts[i.status]++; });

  const parts = [`<span class="stat-item"><strong>${items.length}</strong>&thinsp;gesamt</span>`];
  Object.entries(statuses).forEach(([key, val]) => {
    if (counts[key] > 0) {
      parts.push(`<span class="stat-item"><span class="stat-dot" style="background:${STAT_COLORS[key] ?? '#888'}"></span>${counts[key]}&thinsp;${escapeHtml(val.label)}</span>`);
    }
  });
  bar.innerHTML = parts.join('');
}

function syncFilterOptions() {
  const statusSel = document.getElementById('filter-status');
  const genreSel  = document.getElementById('filter-genre');
  const statuses  = getStatuses(state.tab);
  const genres    = state.tab === 'games' ? GAME_GENRES : ANIME_GENRES;

  const curStatus = state.filters.status;
  const curGenre  = state.filters.genre;
  const curSort   = state.sort;

  statusSel.innerHTML = '<option value="">Alle Status</option>' +
    Object.entries(statuses)
      .map(([k, v]) => `<option value="${k}" ${curStatus === k ? 'selected' : ''}>${escapeHtml(v.label)}</option>`)
      .join('');

  genreSel.innerHTML = '<option value="">Alle Genres</option>' +
    genres
      .map(g => `<option value="${g.id}" ${curGenre === g.id ? 'selected' : ''}>${escapeHtml(g.label)}</option>`)
      .join('');

  const sortSel = document.getElementById('sort-by');
  sortSel.innerHTML = SORT_OPTIONS
    .map(o => `<option value="${o.value}" ${curSort === o.value ? 'selected' : ''}>${escapeHtml(o.label)}</option>`)
    .join('');
}

// ======================================================
//  FORM BUILDER
// ======================================================

function buildForm(tab, entry) {
  const genres   = tab === 'games' ? GAME_GENRES : ANIME_GENRES;
  const statuses = getStatuses(tab);
  const e        = entry ?? {};
  const selected = e.genres ?? [];

  const genreToggles = genres
    .map(g => `<button type="button" class="genre-toggle${selected.includes(g.id) ? ' selected' : ''}" data-genre="${g.id}">${g.label}</button>`)
    .join('');

  const statusOpts = Object.entries(statuses)
    .map(([k, v]) => `<option value="${k}" ${(e.status ?? 'geplant') === k ? 'selected' : ''}>${escapeHtml(v.label)}</option>`)
    .join('');

  const platformHtml = tab === 'games' ? `
    <div class="form-group">
      <label class="form-label" for="field-platform">Plattform</label>
      <select class="form-input" id="field-platform">
        <option value="">– Keine Angabe –</option>
        ${PLATFORMS.map(p => `<option value="${p}" ${e.platform === p ? 'selected' : ''}>${escapeHtml(p)}</option>`).join('')}
      </select>
    </div>` : '';

  const episodeHtml = tab === 'anime' ? `
    <div class="form-group">
      <label class="form-label">Episoden (aktuell / gesamt)</label>
      <div class="episode-inputs">
        <input type="number" class="form-input" id="field-ep-current" min="0" max="9999" placeholder="0" value="${e.episodesCurrent ?? 0}" inputmode="numeric">
        <span class="episode-sep">/</span>
        <input type="number" class="form-input" id="field-ep-total" min="0" max="9999" placeholder="?" value="${e.episodesTotal ?? 0}" inputmode="numeric">
      </div>
    </div>` : '';

  const startLabel = tab === 'games' ? 'Zuerst gespielt' : 'Zuerst geschaut';
  const lastLabel  = tab === 'games' ? 'Zuletzt gespielt' : 'Zuletzt geschaut';
  const rating     = e.rating ?? 0;

  return `
    <div class="form-group">
      <label class="form-label required" for="field-title">Titel</label>
      <input type="text" class="form-input" id="field-title"
        placeholder="${tab === 'games' ? 'z.B. The Legend of Zelda: TOTK' : 'z.B. Fullmetal Alchemist: Brotherhood'}"
        value="${escapeHtml(e.title ?? '')}" required autocomplete="off" autocorrect="off">
    </div>

    <div class="form-group">
      <label class="form-label required" for="field-status">Status</label>
      <select class="form-input" id="field-status">${statusOpts}</select>
    </div>

    ${platformHtml}

    <div class="form-group">
      <label class="form-label">Genres</label>
      <div class="genre-selector" id="genre-selector">${genreToggles}</div>
    </div>

    <div class="form-group">
      <label class="form-label" for="field-rating">
        Bewertung:&ensp;<span id="rating-label">${rating > 0 ? `★ ${rating}/10` : 'Keine'}</span>
      </label>
      <div class="rating-input-wrap">
        <input type="range" class="rating-slider" id="field-rating" min="0" max="10" step="1" value="${rating}">
        <span class="rating-display" id="rating-display">${rating > 0 ? `${rating}/10` : '–'}</span>
      </div>
    </div>

    ${episodeHtml}

    <div class="form-group">
      <label class="form-label" for="field-date-added">Hinzugefügt</label>
      <input type="date" class="form-input" id="field-date-added" value="${e.dateAdded ?? today()}" autocomplete="off">
    </div>

    <div class="form-row">
      <div class="form-group">
        <label class="form-label" for="field-date-started">${startLabel}</label>
        <input type="date" class="form-input" id="field-date-started" value="${e.dateStarted ?? ''}" autocomplete="off">
      </div>
      <div class="form-group">
        <label class="form-label" for="field-date-last">${lastLabel}</label>
        <input type="date" class="form-input" id="field-date-last" value="${e.dateLast ?? ''}" autocomplete="off">
      </div>
    </div>

    <div class="form-group">
      <label class="form-label" for="field-notes">Notizen</label>
      <textarea class="form-textarea" id="field-notes" placeholder="Gedanken, Meinungen, Fortschritt…" rows="3">${escapeHtml(e.notes ?? '')}</textarea>
    </div>`;
}

function initFormListeners() {
  document.getElementById('genre-selector')?.addEventListener('click', e => {
    const btn = e.target.closest('.genre-toggle');
    if (btn) btn.classList.toggle('selected');
  });

  const slider  = document.getElementById('field-rating');
  const label   = document.getElementById('rating-label');
  const display = document.getElementById('rating-display');
  if (slider) {
    const update = () => {
      const v = parseInt(slider.value, 10);
      label.textContent   = v > 0 ? `★ ${v}/10` : 'Keine';
      display.textContent = v > 0 ? `${v}/10`    : '–';
    };
    slider.addEventListener('input', update);
  }
}

function collectFormData() {
  const title = document.getElementById('field-title')?.value.trim();
  if (!title) return null;

  const data = {
    title,
    status:      document.getElementById('field-status')?.value ?? 'geplant',
    genres:      [...document.querySelectorAll('.genre-toggle.selected')].map(el => el.dataset.genre),
    rating:      parseInt(document.getElementById('field-rating')?.value ?? '0', 10),
    dateAdded:   document.getElementById('field-date-added')?.value  || today(),
    dateStarted: document.getElementById('field-date-started')?.value || '',
    dateLast:    document.getElementById('field-date-last')?.value   || '',
    notes:       document.getElementById('field-notes')?.value.trim() ?? '',
  };

  if (state.tab === 'games') {
    data.platform = document.getElementById('field-platform')?.value ?? '';
  } else {
    data.episodesCurrent = parseInt(document.getElementById('field-ep-current')?.value ?? '0', 10);
    data.episodesTotal   = parseInt(document.getElementById('field-ep-total')?.value ?? '0', 10);
  }

  return data;
}

// ======================================================
//  MODAL MANAGEMENT
// ======================================================

function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.removeAttribute('hidden');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => el.classList.add('open'));
  });
  el.setAttribute('aria-hidden', 'false');
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el || !el.classList.contains('open')) return;
  el.classList.remove('open');
  el.setAttribute('aria-hidden', 'true');
  const onEnd = () => {
    el.setAttribute('hidden', '');
    el.removeEventListener('transitionend', onEnd);
  };
  el.addEventListener('transitionend', onEnd, { once: true });
}

function openAddModal() {
  state.editingId = null;
  document.getElementById('entry-form').innerHTML = buildForm(state.tab, null);
  initFormListeners();
  document.getElementById('modal-form-title').textContent =
    state.tab === 'games' ? 'Neues Spiel' : 'Neuen Anime hinzufügen';
  openModal('modal-form-backdrop');
  setTimeout(() => document.getElementById('field-title')?.focus(), 80);
}

function openEditModal(id) {
  const item = getCurrentList().find(i => i.id === id);
  if (!item) return;
  state.editingId = id;
  document.getElementById('entry-form').innerHTML = buildForm(state.tab, item);
  initFormListeners();
  document.getElementById('modal-form-title').textContent =
    state.tab === 'games' ? 'Spiel bearbeiten' : 'Anime bearbeiten';
  closeModal('modal-detail-backdrop');
  openModal('modal-form-backdrop');
  setTimeout(() => document.getElementById('field-title')?.focus(), 80);
}

function openDetailModal(id) {
  const item = getCurrentList().find(i => i.id === id);
  if (!item) return;

  const statuses = getStatuses(state.tab);
  const status   = statuses[item.status] ?? { label: item.status, css: item.status };

  const genreBadges = (item.genres ?? [])
    .map(g => `<span class="genre-badge">${getGenreLabel(g, state.tab)}</span>`)
    .join('');

  const ratingText = item.rating > 0 ? `★ ${item.rating} / 10` : '–';

  const sharedFields = [
    { label: 'Status',      value: status.label },
    { label: 'Bewertung',   value: ratingText, coral: true },
    { label: 'Hinzugefügt', value: formatDate(item.dateAdded) },
  ];

  const typeFields = state.tab === 'games'
    ? [
        { label: 'Plattform',      value: item.platform || '–' },
        { label: 'Zuerst gespielt', value: formatDate(item.dateStarted) },
        { label: 'Zuletzt gespielt', value: formatDate(item.dateLast) },
      ]
    : [
        { label: 'Episoden', value: (item.episodesTotal > 0) ? `${item.episodesCurrent ?? 0} / ${item.episodesTotal}` : '–' },
        { label: 'Zuerst geschaut', value: formatDate(item.dateStarted) },
        { label: 'Zuletzt geschaut', value: formatDate(item.dateLast) },
      ];

  const allFields = [...sharedFields, ...typeFields];

  const gridHtml = allFields
    .map(f => `
      <div class="detail-field">
        <div class="detail-field-label">${escapeHtml(f.label)}</div>
        <div class="detail-field-value${f.coral ? ' coral' : ''}">${escapeHtml(f.value)}</div>
      </div>`)
    .join('');

  const notesHtml = item.notes
    ? `<div class="detail-notes-label">Notizen</div><div class="detail-notes">${escapeHtml(item.notes)}</div>`
    : '';

  document.getElementById('modal-detail-title').textContent = item.title;
  document.getElementById('modal-detail-body').innerHTML = `
    <div class="detail-header">
      <div class="detail-status-row">
        <span class="status-pill status-${escapeHtml(status.css)}">${escapeHtml(status.label)}</span>
      </div>
      <div class="detail-genres">${genreBadges}</div>
    </div>
    <div class="detail-grid">${gridHtml}</div>
    ${notesHtml}`;

  document.getElementById('btn-detail-edit').onclick   = () => openEditModal(id);
  document.getElementById('btn-detail-delete').onclick = () => confirmDelete(id);
  openModal('modal-detail-backdrop');
}

function confirmDelete(id) {
  const item = getCurrentList().find(i => i.id === id);
  if (!item) return;
  document.getElementById('modal-confirm-text').textContent =
    `„${item.title}" wird unwiderruflich gelöscht.`;
  state.confirmCallback = () => {
    deleteEntry(id);
    closeModal('modal-confirm-backdrop');
    closeModal('modal-detail-backdrop');
    showToast('Eintrag gelöscht');
  };
  openModal('modal-confirm-backdrop');
}

// ======================================================
//  CRUD
// ======================================================

function saveEntry(formData) {
  if (!formData) return;

  if (state.editingId) {
    const idx = state.data[state.tab].findIndex(i => i.id === state.editingId);
    if (idx !== -1) {
      state.data[state.tab][idx] = { ...state.data[state.tab][idx], ...formData };
      showToast('Eintrag aktualisiert ✓');
    }
  } else {
    const newItem = { id: generateId(), ...formData };
    state.data[state.tab].unshift(newItem);
    showToast('Hinzugefügt ✓');
  }

  saveData();
  closeModal('modal-form-backdrop');
  render();
}

function deleteEntry(id) {
  state.data[state.tab] = state.data[state.tab].filter(i => i.id !== id);
  saveData();
  render();
}

function quickDone(id) {
  const list = state.data[state.tab];
  const idx  = list.findIndex(i => i.id === id);
  if (idx === -1) return;
  const item       = list[idx];
  const doneStatus = state.tab === 'games' ? 'gespielt' : 'geschaut';
  list[idx] = {
    ...item,
    status:      doneStatus,
    dateLast:    today(),
    dateStarted: item.dateStarted || today(),
  };
  saveData();
  render();
  showToast(`„${item.title}" abgehakt ✓`);
}

// ======================================================
//  GITHUB SYNC
// ======================================================

const SYNC_TOKEN_KEY = 'tracker-sync-token';
const SYNC_SHA_KEY   = 'tracker-sync-sha';
const GITHUB_OWNER   = 'VentusObscurion';
const GITHUB_REPO    = 'tracker';
const GITHUB_FILE    = 'data.json';
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${GITHUB_FILE}`;

const sync = {
  token:         null,
  sha:           null,
  status:        'no-token', // 'no-token' | 'idle' | 'syncing' | 'ok' | 'error' | 'offline'
  lastSync:      null,
  dirty:         false,
  debounceTimer: null,
};

// ---- Config ----

function loadSyncConfig() {
  sync.token = localStorage.getItem(SYNC_TOKEN_KEY) || null;
  sync.sha   = localStorage.getItem(SYNC_SHA_KEY)   || null;
}

function saveSyncToken(token) {
  if (token) {
    sync.token = token;
    localStorage.setItem(SYNC_TOKEN_KEY, token);
  } else {
    sync.token = null;
    sync.sha   = null;
    localStorage.removeItem(SYNC_TOKEN_KEY);
    localStorage.removeItem(SYNC_SHA_KEY);
  }
}

// ---- Status UI ----

const SYNC_STATUS_MAP = {
  'no-token': { color: 'var(--text-muted)',   spin: false, label: 'Sync nicht konfiguriert' },
  'idle':     { color: 'var(--text-muted)',   spin: false, label: 'Bereit' },
  'syncing':  { color: 'var(--coral)',         spin: true,  label: 'Synchronisiere…' },
  'ok':       { color: 'var(--status-active)', spin: false, label: null }, // label set dynamically
  'error':    { color: '#F88379',              spin: false, label: 'Sync fehlgeschlagen – tippen zum erneuten Versuch' },
  'offline':  { color: 'var(--text-muted)',   spin: false, label: 'Offline' },
};

function setSyncStatus(status) {
  sync.status = status;
  updateSyncUI();
}

function updateSyncUI() {
  const btn  = document.getElementById('btn-sync');
  const icon = document.getElementById('sync-icon');
  const line = document.getElementById('sync-status-line');
  const s    = SYNC_STATUS_MAP[sync.status] ?? SYNC_STATUS_MAP['idle'];

  if (btn)  btn.style.color = s.color;
  if (icon) {
    if (s.spin) icon.classList.add('spin');
    else        icon.classList.remove('spin');
  }

  const label = sync.status === 'ok' && sync.lastSync
    ? `Zuletzt synchronisiert: ${sync.lastSync.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}`
    : (s.label ?? '');

  if (btn)  btn.title = label;
  if (line) line.textContent = label;
}

// ---- Base64 helpers (Unicode-safe) ----

function toBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach(b => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

function fromBase64(b64) {
  const bin   = atob(b64.replace(/\s/g, ''));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder('utf-8').decode(bytes);
}

// ---- API calls ----

async function githubPull() {
  if (!sync.token) { setSyncStatus('no-token'); return false; }
  setSyncStatus('syncing');
  try {
    const res = await fetch(GITHUB_API_URL, {
      cache: 'no-store',
      headers: {
        'Authorization':        `Bearer ${sync.token}`,
        'Accept':               'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (res.status === 404) {
      // data.json doesn't exist yet — first push will create it
      sync.lastSync = new Date();
      setSyncStatus('ok');
      return true;
    }

    if (!res.ok) {
      setSyncStatus('error');
      showToast('⚠️ GitHub Pull fehlgeschlagen (' + res.status + ')');
      return false;
    }

    const json    = await res.json();
    const decoded = JSON.parse(fromBase64(json.content));

    if (decoded && Array.isArray(decoded.games) && Array.isArray(decoded.anime)) {
      state.data = { games: decoded.games, anime: decoded.anime };
      // Persist locally without triggering another push
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data)); } catch {}
      render();
    }

    sync.sha      = json.sha;
    sync.lastSync = new Date();
    localStorage.setItem(SYNC_SHA_KEY, json.sha);
    setSyncStatus('ok');
    return true;
  } catch {
    setSyncStatus(navigator.onLine ? 'error' : 'offline');
    return false;
  }
}

async function githubPush() {
  if (!sync.token) { setSyncStatus('no-token'); return false; }
  setSyncStatus('syncing');
  try {
    const body = {
      message: `sync: ${new Date().toISOString()}`,
      content: toBase64(JSON.stringify(state.data, null, 2)),
    };
    if (sync.sha) body.sha = sync.sha;

    const res = await fetch(GITHUB_API_URL, {
      method: 'PUT',
      headers: {
        'Authorization':        `Bearer ${sync.token}`,
        'Accept':               'application/vnd.github+json',
        'Content-Type':         'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify(body),
    });

    if (res.status === 409) {
      // SHA conflict — pull first then re-push
      showToast('Sync-Konflikt wird aufgelöst…');
      const pulled = await githubPull();
      if (pulled) return githubPush();
      return false;
    }

    if (!res.ok) {
      setSyncStatus('error');
      showToast('⚠️ GitHub Push fehlgeschlagen (' + res.status + ')');
      return false;
    }

    const json = await res.json();
    sync.sha      = json.content.sha;
    sync.dirty    = false;
    sync.lastSync = new Date();
    localStorage.setItem(SYNC_SHA_KEY, json.content.sha);
    setSyncStatus('ok');
    return true;
  } catch {
    setSyncStatus(navigator.onLine ? 'error' : 'offline');
    return false;
  }
}

function schedulePush() {
  if (!sync.token) return;
  sync.dirty = true;
  clearTimeout(sync.debounceTimer);
  sync.debounceTimer = setTimeout(() => githubPush(), 4000);
}

function manualSync() {
  if (sync.status === 'syncing') return;
  clearTimeout(sync.debounceTimer);
  githubPush().then(ok => {
    if (ok) showToast('Sync erfolgreich ✓');
  });
}

// ---- Settings Modal ----

function openSettingsModal() {
  const field = document.getElementById('settings-token');
  if (field) field.value = sync.token ?? '';
  updateSyncUI();
  openModal('modal-settings-backdrop');
}

function applySettings() {
  const raw = document.getElementById('settings-token')?.value.trim() ?? '';
  saveSyncToken(raw || null);
  closeModal('modal-settings-backdrop');
  if (sync.token) {
    showToast('Token gespeichert, lade Daten…');
    githubPull().then(ok => { if (ok) showToast('Daten geladen ✓'); });
  } else {
    setSyncStatus('no-token');
    showToast('Token entfernt – nur lokaler Speicher');
  }
}

// ---- Lifecycle ----

function initSync() {
  loadSyncConfig();
  if (!sync.token) { setSyncStatus('no-token'); return; }

  // Pull on startup
  githubPull();

  // Push when app is hidden (minimized / tab switch / phone sleeps)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && sync.dirty && sync.token) {
      clearTimeout(sync.debounceTimer);
      githubPush();
    }
  });

  // Handle online/offline
  window.addEventListener('online',  () => {
    if (sync.dirty && sync.token) githubPush();
    else if (sync.token) setSyncStatus('ok');
  });
  window.addEventListener('offline', () => setSyncStatus('offline'));
}

// ======================================================
//  EXPORT / IMPORT
// ======================================================

function exportData() {
  try {
    const json = JSON.stringify(state.data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `tracker-backup-${today()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Export erfolgreich ✓');
  } catch {
    showToast('⚠️ Export fehlgeschlagen!');
  }
}

function importData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed && Array.isArray(parsed.games) && Array.isArray(parsed.anime)) {
        state.data = { games: parsed.games, anime: parsed.anime };
        saveData();
        render();
        showToast(`Import: ${parsed.games.length} Spiele, ${parsed.anime.length} Anime ✓`);
      } else {
        showToast('⚠️ Ungültiges Dateiformat!');
      }
    } catch {
      showToast('⚠️ Fehler beim Lesen der Datei!');
    }
  };
  reader.onerror = () => showToast('⚠️ Datei konnte nicht gelesen werden!');
  reader.readAsText(file, 'utf-8');
}

// ======================================================
//  TOAST
// ======================================================

let toastTimer = null;

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

// ======================================================
//  EVENT LISTENERS
// ======================================================

function initEventListeners() {
  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.tab === state.tab) return;
      document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      state.tab = btn.dataset.tab;
      state.filters = { search: '', status: '', genre: '' };
      state.sort = 'dateAdded-desc';
      document.getElementById('input-search').value = '';
      render();
    });
  });

  // Search
  document.getElementById('input-search').addEventListener('input', e => {
    state.filters.search = e.target.value.trim();
    render();
  });

  // Status filter
  document.getElementById('filter-status').addEventListener('change', e => {
    state.filters.status = e.target.value;
    render();
  });

  // Genre filter
  document.getElementById('filter-genre').addEventListener('change', e => {
    state.filters.genre = e.target.value;
    render();
  });

  // Sort
  document.getElementById('sort-by').addEventListener('change', e => {
    state.sort = e.target.value;
    render();
  });

  // FAB — Add new entry
  document.getElementById('btn-add').addEventListener('click', openAddModal);

  // Form submit
  document.getElementById('entry-form').addEventListener('submit', e => {
    e.preventDefault();
    saveEntry(collectFormData());
  });

  // Form modal: close / cancel
  document.getElementById('modal-form-close').addEventListener('click',  () => closeModal('modal-form-backdrop'));
  document.getElementById('modal-form-cancel').addEventListener('click', () => closeModal('modal-form-backdrop'));

  // Detail modal: close
  document.getElementById('modal-detail-close').addEventListener('click', () => closeModal('modal-detail-backdrop'));

  // Confirm modal: cancel / confirm
  document.getElementById('btn-confirm-cancel').addEventListener('click', () => closeModal('modal-confirm-backdrop'));
  document.getElementById('btn-confirm-ok').addEventListener('click', () => {
    if (state.confirmCallback) {
      state.confirmCallback();
      state.confirmCallback = null;
    }
  });

  // Close modals by clicking backdrop
  ['modal-form-backdrop', 'modal-detail-backdrop', 'modal-confirm-backdrop', 'modal-settings-backdrop'].forEach(id => {
    document.getElementById(id)?.addEventListener('click', e => {
      if (e.target.id === id) closeModal(id);
    });
  });

  // Keyboard: Escape closes any open modal
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    ['modal-settings-backdrop', 'modal-confirm-backdrop', 'modal-form-backdrop', 'modal-detail-backdrop'].forEach(id => {
      const el = document.getElementById(id);
      if (el?.classList.contains('open')) { closeModal(id); }
    });
  });

  // Export
  document.getElementById('btn-export').addEventListener('click', exportData);

  // Import
  document.getElementById('file-import').addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) importData(file);
    e.target.value = '';
  });

  // Sync button (manual)
  document.getElementById('btn-sync').addEventListener('click', () => {
    if (!sync.token) {
      openSettingsModal();
    } else {
      manualSync();
    }
  });

  // Settings modal
  document.getElementById('btn-settings').addEventListener('click', openSettingsModal);
  document.getElementById('modal-settings-close').addEventListener('click',  () => closeModal('modal-settings-backdrop'));
  document.getElementById('modal-settings-cancel').addEventListener('click', () => closeModal('modal-settings-backdrop'));
  document.getElementById('btn-settings-save').addEventListener('click', applySettings);
}

// ======================================================
//  SERVICE WORKER
// ======================================================

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(registration => {
      // Check for updates immediately on load
      registration.update();

      // Re-check every time the app becomes visible (e.g. switching back from another app)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') registration.update();
      });

      // When a new SW takes over, reload to get fresh files
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });
    }).catch(() => {
      // Silent fail — app still works without SW
    });
  }
}

// ======================================================
//  INIT
// ======================================================

function init() {
  loadData();
  initEventListeners();
  syncFilterOptions();
  render();
  registerServiceWorker();
  initSync();
}

document.addEventListener('DOMContentLoaded', init);
