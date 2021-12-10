const movieApiURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=a8d94290e73c071b20fc84a878878634&page=1";

const showApiURL =
  "https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&api_key=a8d94290e73c071b20fc84a878878634&page=1";

const searchMovieAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=a8d94290e73c071b20fc84a878878634&query=";

const searchShowAPI =
  "https://api.themoviedb.org/3/search/tv?&api_key=a8d94290e73c071b20fc84a878878634&query=";

const imgPATH = "https://image.tmdb.org/t/p/w1280";

let movies = document.querySelector(".movies");
let shows = document.querySelector(".shows");
let form = document.querySelector("form");
let search = document.querySelector(".search");

getMovies(movieApiURL);

// Get all movies
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  displayMovies(data.results);
}

getShows(showApiURL);
// Get all shows
async function getShows(url) {
  const res = await fetch(url);
  const data = await res.json();

  displayShows(data.results);
}

//Display Movies
function displayMovies(showMovies) {
  // movies.innerHTML = "";

  showMovies.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("movie");
    div.innerHTML = `
        <img src="${imgPATH + movie.poster_path}" alt="${movie.title}" />

            <div class="details">
              <h2 class="title">${movie.title}</h2>
              <p class="rate">Rating: <span class="rating">${
                movie.vote_average
              }</span></p>
              <p class="overview">${movie.overview}</p>
            </div>
        `;
    movies.appendChild(div);
  });
}

//Display Shows
function displayShows(tvShows) {
  // shows.innerHTML = "";

  tvShows.forEach((show) => {
    const div = document.createElement("div");
    div.classList.add("show");
    div.innerHTML = `
        <img src="${imgPATH + show.poster_path}" alt="${show.original_name}" />

            <div class="details">
              <h2 class="title">${show.original_name}</h2>
              <p class="rate">Rating: <span class="rating">${
                show.vote_average
              }</span></p>
              <p class="overview">${show.overview}</p>
            </div>
        `;
    shows.appendChild(div);
  });
}

// Movies Search
form.addEventListener("submit", (event) => {
  event.preventDefault();
  movies.innerHTML = "";
  const searchValue = search.value;

  if (searchValue) {
    getMovies(searchMovieAPI + searchValue);
    search.value = "";
  }
});

// Shows Search
form.addEventListener("submit", (event) => {
  event.preventDefault();
  shows.innerHTML = "";
  const searchValue = search.value;

  if (searchValue) {
    getShows(searchShowAPI + searchValue);
    search.value = "";
  }
});
