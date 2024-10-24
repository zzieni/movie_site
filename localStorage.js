export { getLocalStorage, saveLocalStorage, deleteLocalStorage };

function getLocalStorage() {
  let movies = localStorage.getItem('movies');

  if (movies) {
    return JSON.parse(movies);
  } else {
    return [];
  }
}

function saveLocalStorage(movie) {
  let movies = getLocalStorage(); // 겟리뷰에서 함수 호출
  const exists = movies.some((existingMovie) => existingMovie.id === movie.id); // id를 기준으로 체크

  if (!exists) {
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));
    alert('북마크에 추가되었습니다.');
  } else {
    alert('이미 북마크에 추가된 영화입니다.');
  }
}

function deleteLocalStorage(movieId) {
  let movies = getLocalStorage();
  const exists = movies.some((existingMovie) => existingMovie.id === movieId); // id를 기준으로 체크

  if (exists) {
    movies = movies.filter((movie) => movie.id !== movieId);
    localStorage.setItem('movies', JSON.stringify(movies));
    alert('북마크에 삭제 되었습니다.');
    showMovies(movies);
  } else {
    alert('북마크에 추가되지 않았습니다. 추가 후 삭제 해주시기 바랍니다.');
  }
}
