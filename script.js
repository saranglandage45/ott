const movies = [
  { id: 1, name: "Avengers", genre: "action", rating: 9 },
  { id: 2, name: "Batman", genre: "action", rating: 8 },
  { id: 3, name: "Superbad", genre: "comedy", rating: 7 },
  { id: 4, name: "Hangover", genre: "comedy", rating: 8 },
  { id: 5, name: "Titanic", genre: "drama", rating: 9 },
  { id: 6, name: "Joker", genre: "drama", rating: 9 }
];

// Display Movies
function displayMovies(list, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  list.forEach(movie => {
    container.innerHTML += `
      <div class="card">
        <img src="https://via.placeholder.com/200">
        <h3>${movie.name}</h3>
        <p>Genre: ${movie.genre}</p>
        <p>⭐ ${movie.rating}</p>
        <button onclick="watchMovie(${movie.id})">Watch ▶</button>
      </div>
    `;
  });
}

// Initial Load
displayMovies(movies, "movieList");

// Search Function
function searchMovies() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const genre = document.getElementById("genreFilter").value;

  let filtered = movies.filter(m =>
    m.name.toLowerCase().includes(query)
  );

  if (genre) {
    filtered = filtered.filter(m => m.genre === genre);
  }

  displayMovies(filtered, "movieList");
  recommendMovies(filtered);
}

// Watch Movie
function watchMovie(id) {
  let history = JSON.parse(localStorage.getItem("watchHistory")) || [];
  history.push(id);
  localStorage.setItem("watchHistory", JSON.stringify(history));
  alert("Playing movie...");
}

// Recommendation Algorithm
function recommendMovies(selected) {
  let recommended = [];

  selected.forEach(sm => {
    const similar = movies.filter(m => {
      return (
        m.id !== sm.id &&
        (
          m.genre === sm.genre || 
          Math.abs(m.rating - sm.rating) <= 1 ||
          m.name.split(" ")[0] === sm.name.split(" ")[0]
        )
      );
    });

    recommended = recommended.concat(similar);
  });

  // Remove duplicates
  recommended = [...new Map(recommended.map(item => [item.id, item])).values()];

  displayMovies(recommended, "recommendedList");
}