import {
  getLocalStorage,
  saveLocalStorage,
  deleteLocalStorage,
} from './localStorage.js';

// api_key
const API_KEY = 'api_key=801b921dd3005ae0f5f5340fd6e3924e';

// 기본 url
const BASE_URL = 'https://api.themoviedb.org/3/';

// 기본 url + popular url + api key
const API_URL = BASE_URL + 'movie/now_playing?language=en-US&page=1&' + API_KEY;

// 이미지 URL
const IMG_URL = 'https://media.themoviedb.org/t/p/w220_and_h330_face';

// 검색 URL
const SERCH_URL = BASE_URL + 'search/movie?' + API_KEY;

const cardList = document.querySelector('.card-list');
const from = document.getElementById('serchFrom');
const moveSerchInput = document.getElementById('serchInput');
const showBookMark = document.querySelector('.bookMark');
const goBack = document.querySelector('.goBack');
const modal = document.querySelector('.modal-list');

/**
 * TMDB API 연동
 */
async function getMovies(url) {
  try {
    // 1. 요청 생성
    console.log('네트워크 요청을 생성합니다...');

    // 2. 요청 전송 (비동기 시작)
    const response = await fetch(url);
    console.log('서버로부터 응답을 받았습니다.');

    // 3. 응답 수신 및 상태 확인
    if (!response.ok) {
      throw new Error('응답 상태가 좋지 않습니다.');
    }
    // 4. 응답 처리 (데이터를 JSON 형식으로 변환)
    const data = await response.json();
    showMovies(data.results);
    console.log('응답 데이터를 처리합니다: ', data);

    // (map, filter 계산 등 데이터 처리 가능)
  } catch (error) {
    // 5. 에러 처리
    console.error('네트워크 요청 중 에러가 발생했습니다:', error);
  }
}
getMovies(API_URL);

/**
 * 영화 카드
 */
function showMovies(data) {
  cardList.innerHTML = '';
  data.forEach((e) => {
    const { title, poster_path, vote_average, id } = e;

    const card = document.createElement('div'); // <div><div/> 생성
    card.className = 'card'; // 위에 만든 div태그에 클래스 이름 넣어줌 부여함 -> <div class="card"><div/>
    card.id = `${id}`;

    card.innerHTML = `
        <img src='${IMG_URL + poster_path}'/>
        <h4 id='movie-title'>${title}</h4>
        <p id='vote-average'>평점 : ${vote_average}</p>
        `;

    cardList.appendChild(card); // cardList의 자식으로 card 넣어준다.
  });

  /**
   * 영화 검색 기능
   */
  // 검색어 입력 후 검색버튼 클릭 또는 엔터키를 누르면 영화 검색 api를 이용하여 해당하는 영화를 불러온다
  from.addEventListener('submit', (search) => {
    search.preventDefault(); // submit 시 새로고침 방지

    const serchKeyWorld = moveSerchInput.value;

    getMovies(SERCH_URL + '&query=' + serchKeyWorld);
  });

  // 상세 정보 모달
  cardList.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) return;

    const movieId = event.target.closest('.card').id;
    const movie = data.find((movie) => {
      return movie.id === Number(movieId);
    });

    modal.classList.remove('hide');
    modal.style.display = '';

    const modalHtml = `
      <div class="modal">
        <div class="modal_popup">
          <img id="movie-post-img" src='${IMG_URL + movie.poster_path}'/>
          <h1>${movie.title}</h1>
          <p>${movie.overview}</p>
          <p>개봉일 : ${movie.release_date}</p>
          <button id="close-btn">닫기</button>
          <button id="book-mark-save-btn" data-action="save">북마크 추가</button>
          <button id="book-mark-del-btn" data-action="save">북마크 삭제</button>
        </div>
      </div>  
    `;
    modal.innerHTML = modalHtml;

    // 닫기
    const closeBtn = modal.querySelector('#close-btn');
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      modal.classList.add('hide');
    });

    // 북마크 추가
    const bookMarkBtn = modal.querySelector('#book-mark-save-btn');
    bookMarkBtn.addEventListener('click', (e) => {
      saveLocalStorage(movie);
      modal.style.display = 'none';
      modal.classList.add('hide');
    });

    // 북마크 삭제
    const bookMarkDelBtn = modal.querySelector('#book-mark-del-btn');
    bookMarkDelBtn.addEventListener('click', (e) => {
      deleteLocalStorage(movie.id);
      modal.style.display = 'none';
      modal.classList.add('hide');
    });
  });
}

/**
 *  북마크 보기
 */
showBookMark.addEventListener('click', (event) => {
  const movies = getLocalStorage();
  showMovies(movies);
});

/** 뒤로가기 */
goBack.addEventListener('click', (event) => {
  getMovies(API_URL);
});
