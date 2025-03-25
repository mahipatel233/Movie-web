const API_KEY = 'a70501be';
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&`;
const movieContainer = document.getElementById('movie-container');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

// Function to search for movies
async function searchMovies(query) {
  const response = await fetch(`${BASE_URL}s=${query}`);
  const data = await response.json();

  movieContainer.innerHTML = ''; // Clear previous results

  if (data.Search) {
    data.Search.forEach((movie) => displayMovie(movie));
  } else {
    movieContainer.innerHTML = '<p>No results found! 😢</p>';
  }
}

// Function to display movie cards
function displayMovie(movie) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');
  movieCard.innerHTML = `
    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
    <h3>${movie.Title} (${movie.Year})</h3>
    <button class="favorite-btn" onclick="addToFavorites('${movie.imdbID}')">Add to Favorites</button>
    <button class="info-btn" onclick="getSimilarMovies('${movie.imdbID}')">ℹ️ More Info</button>
  `;
  movieContainer.appendChild(movieCard);
}

// Function to get similar movies or movie details
async function getSimilarMovies(id) {
  const response = await fetch(`${BASE_URL}i=${id}`);
  const data = await response.json();

  if (data) {
    modalBody.innerHTML = `
      <h2>${data.Title} 🎬</h2>
      <p><strong>⭐ Rating:</strong> ${data.imdbRating}</p>
      <p><strong>🎭 Genre:</strong> ${data.Genre}</p>
      <p><strong>📅 Released:</strong> ${data.Released}</p>
      <p><strong>🎥 Director:</strong> ${data.Director}</p>
      <p><strong>📝 Plot:</strong> ${data.Plot}</p>
    `;

    modal.style.display = 'block';
  }
}

// Function to add movie to favorites
function addToFavorites(id) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    alert('Added to Favorites! ❤️');
  } else {
    alert('Already in Favorites! 😎');
  }
}

// Close modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = 'none';
};

// Search event
document.getElementById('search-btn').addEventListener('click', () => {
  const query = document.getElementById('search-input').value.trim();
  if (query) searchMovies(query);
});

// Load trending movies on page load
document.addEventListener('DOMContentLoaded', () => {
  searchMovies('batman');
});
