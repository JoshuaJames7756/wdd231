// featured.js — ES Module
// Fetches the same book data source and displays 4 featured titles on the home page.

const featuredGrid = document.querySelector('#featured-grid');

async function loadFeatured() {
  try {
    const response = await fetch('data/books.json');

    if (!response.ok) {
      throw new Error(`Network response was not ok (status ${response.status})`);
    }

    const books = await response.json();

    // array method: slice the first 4 as "featured"
    const featured = books.slice(0, 4);
    renderFeatured(featured);
  } catch (error) {
    featuredGrid.innerHTML = `<p class="error-message">Featured titles could not be loaded right now.</p>`;
    console.error('Failed to load featured books:', error);
  }
}

function renderFeatured(books) {
  // template literals + array method (map)
  featuredGrid.innerHTML = books
    .map(
      (book) => `
      <a href="catalog.html" class="featured-card card">
        <img src="${book.cover}" alt="Cover of ${book.title}" loading="lazy">
        <h3>${book.title}</h3>
        <p>${book.author}</p>
      </a>
    `
    )
    .join('');
}

loadFeatured();