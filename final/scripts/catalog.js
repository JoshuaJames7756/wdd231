// catalog.js — ES Module
// Fetches book data, renders the grid, handles genre filtering and the detail modal.

const grid = document.querySelector('#book-grid');
const genreFilter = document.querySelector('#genre-filter');
const resultsCount = document.querySelector('#results-count');
const modal = document.querySelector('#book-modal');
const modalContent = document.querySelector('#modal-content');
const modalClose = document.querySelector('#modal-close');

const LAST_VIEWED_KEY = 'pageAndInk_lastViewedBook';

let allBooks = [];

async function loadBooks() {
  try {
    const response = await fetch('data/books.json');

    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }

    const books = await response.json();
    allBooks = books;

    populateGenreFilter(books);
    renderBooks(books);
    restoreLastViewed();
  } catch (error) {
    grid.innerHTML = `<p class="error-message">Sorry, the catalog could not be loaded right now. Please try again later.</p>`;
    console.error('Failed to load books:', error);
  }
}

function populateGenreFilter(books) {
  // array method: map + filter to build a unique, sorted genre list
  const genres = [...new Set(books.map((book) => book.genre))].sort();

  genres.forEach((genre) => {
    const option = document.createElement('option');
    option.value = genre;
    option.textContent = genre;
    genreFilter.appendChild(option);
  });
}

function renderBooks(books) {
  if (books.length === 0) {
    grid.innerHTML = `<p class="empty-message">No books match that filter.</p>`;
    resultsCount.textContent = '0 books found';
    return;
  }

  // template literals + array method (map) build the card markup
  grid.innerHTML = books
    .map(
      (book) => `
      <article class="book-card card" data-id="${book.id}">
        <img src="${book.cover}" alt="Cover of ${book.title}" loading="lazy">
        <h2>${book.title}</h2>
        <p class="book-author">${book.author}</p>
        <p class="book-genre">${book.genre}</p>
        <p class="book-price">$${book.price.toFixed(2)}</p>
        <button class="btn view-details" data-id="${book.id}">View Details</button>
      </article>
    `
    )
    .join('');

  resultsCount.textContent = `${books.length} book${books.length === 1 ? '' : 's'} found`;
}

function filterByGenre() {
  const selected = genreFilter.value;

  // array method: filter
  const filtered =
    selected === 'all' ? allBooks : allBooks.filter((book) => book.genre === selected);

  renderBooks(filtered);
}

function openModal(bookId) {
  const book = allBooks.find((b) => b.id === bookId);
  if (!book) return;

  modalContent.innerHTML = `
    <img src="${book.cover}" alt="Cover of ${book.title}" loading="lazy">
    <h2>${book.title}</h2>
    <p class="book-author">by ${book.author}</p>
    <p class="book-genre">${book.genre}</p>
    <p class="book-price">$${book.price.toFixed(2)}</p>
    <p>${book.description}</p>
  `;

  modal.showModal();
  document.body.classList.add('modal-open');

  // localStorage: remember the last book the visitor viewed
  localStorage.setItem(LAST_VIEWED_KEY, JSON.stringify({ id: book.id, title: book.title }));
}

function closeModal() {
  modal.close();
  document.body.classList.remove('modal-open');
}

function restoreLastViewed() {
  const saved = localStorage.getItem(LAST_VIEWED_KEY);
  if (!saved) return;

  try {
    const { title } = JSON.parse(saved);
    resultsCount.textContent += ` — last viewed: ${title}`;
  } catch {
    localStorage.removeItem(LAST_VIEWED_KEY);
  }
}

// Event listeners (DOM manipulation / event handling)
genreFilter.addEventListener('change', filterByGenre);

grid.addEventListener('click', (event) => {
  const button = event.target.closest('.view-details');
  if (!button) return;

  const bookId = Number(button.dataset.id);
  openModal(bookId);
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
modal.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
});

loadBooks();