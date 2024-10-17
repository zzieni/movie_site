// api_key
const API_KEY = 'api_key=801b921dd3005ae0f5f5340fd6e3924e';

// 기본 url
const BASE_URL = 'https://api.themoviedb.org/3/';

// 기본 url + popular url + api key
const API_URL = BASE_URL + 'movie/now_playing?language=en-US&page=1&' + API_KEY;

// 이미지 URL
const IMG_URL = 'https://media.themoviedb.org/t/p/w220_and_h330_face';

const moveCard = document.getElementsByClassName('main')[0];

function getMovies(url) {
  console.log(url);
  fetch(url) // 웹 리소스(데이터)를 비동기적으로 가져오기 위해 fatch를 사용
    .then((res) => res.json()) // fetch가 성공적으로 수행되면 리소스(데이터)를 res라는 변수에 담아 .json()을 사용해서 데이터 형태를 변경
    .then((data) => {
      console.log(data.results); // 콘솔로 데이터 잘 들어오는지 확인
      showMovies(data.results);
    });
}
getMovies(API_URL);

function showMovies(data) {
  moveCard.innerHTML = '';

  data.forEach((e) => {
    const { title, poster_path, vote_average, id } = e;
    const moveData = document.createElement('div');
    moveData.classList.add('card');
    moveData.innerHTML = `<img src='${IMG_URL + poster_path}'/>
          <p>${title}</p>
          <p>평점 : ${vote_average}</p>
          `;
    moveData.style.color = '#A9A9A9';

    console.log('🚀 ~ file: app.js:45 ~ data.forEach ~ moveCard:', moveCard);
    moveCard.appendChild(moveData);
  });
}
