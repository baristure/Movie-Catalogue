const form = document.getElementById("movie-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-movies");

// Setup all events

eventlisteners();
function eventlisteners() {
  form.addEventListener("submit", addMovie);
  document.addEventListener("DOMContentLoaded", function() {
    let movies = Storage.getMoviesFromStorage();
    UI.loadAllMovies(movies);
  });
  cardbody.addEventListener("click", deleteMovie);
  clear.addEventListener("click", clearAllMovies);
}

function addMovie(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === "" || director === "" || url === "") {
    //ERROR
    UI.displayMessages(
      "Please make sure all required fields are filled out!",
      "danger"
    );
  } else {
    // New Movie
    const newMovie = new Movie(title, director, url);

    UI.addMovietoUI(newMovie); // Add movie to User Interface
    Storage.addMovieToStorage(newMovie); // Add movie to Storage
    UI.displayMessages("Movie added succesfully...", "success");
  }

  UI.clearInputs(titleElement, urlElement, directorElement); //Clear placeholders

  e.preventDefault();
}

function deleteMovie(e) {
  if (e.target.id === "delete-movie") {
    UI.deleteMovieFromUI(e.target);
    Storage.deleteMovieFromStorage(
      e.target.parentElement.previousElementSibling.previousElementSibling
        .texContent
    );
  }
  UI.displayMessages("Deleted successfully..", "success");
}

function clearAllMovies() {
  if (confirm("Are you sure?")) {
    UI.clearAllMoviesFromUI();
    Storage.clearAllMoviesFromStorage();
  }
}
