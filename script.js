const tracks = [
    { title: 'Дискотека Авария — Новогодняя', file: "avaria.mp3"},
    { title: 'Нюша — Это Новый Год!', file: "nusha.mp3"},
    { title: 'Руки Вверх — С Новым Годом!', file: "ruki.mp3"},
    { title: 'Стекловата — Новый год', file: "steklovata.mp3"}
]

function createTrackList() {
    /* Получаем пустой элемент .track-list */
    const trackList = document.querySelector('.track-list');
    /* На всякий случай очищаем его от лищней верстки */
    trackList.innerHTML = ""

    /* Проходися по очереди по треками из переменной tracks */
    tracks.forEach((track, index) => {
        /* Создаем виртуальный элемент списка треков */
        const item = document.createElement('div')
        /* Добавляем к этому элементу класс track-item */
        item.classList.add('track-item')
        /* Если трек являеться текущим, то добавляем класс active */
        if(index === currentIndex) {
            item.classList.add('active')
        }
        /* Достаем из переменной tracks заголовок трека 
        и вставляем его внутрь элемента списка треков  */
        item.textContent = track.title
        /* Добавляем каждому элементу слушатель событий по клику */
        item.addEventListener('click', () => {
            /* При клике делаем текущий элемент активным */
            currentIndex = index
            /* Загружаем и обновляем активный трек */
            loadTrack(currentIndex)
            updateActiveTrack()
            /* Включаем аудио, если нажата кнопка плей */
            if(isPlaying) {
                audio.play()
            }
      });
        /* вставляем элементы списка по очереди в .track-list */
        trackList.appendChild(item);
    });
}

/* Получаем управление для аудио */
const audio = new Audio();
/* Текущий трек, по умолчанию первый */
let currentIndex = 0;
/* Название трека */
const titleEl = document.getElementById('title')
/* Обложка трека */
const coverEl = document.getElementById('cover')
/* Таймлайн трека */
const progressEl = document.getElementById('progress')
/* Кнопка плей */
const playBtn = document.getElementById('play')
/* Кнопка предыдущий трек */
const prevBtn = document.getElementById('prev')
/* Кнопка следущий трек */
const nextBtn = document.getElementById('next')
/* Кнопка в перемешку */
const shuffleBtn = document.getElementById('shuffle')
/* Кнопка повтор треков */
const repeatBtn = document.getElementById('repeat')
const isPlaying = false

function loadTrack(index) {
    /* Получили нужный трек */
    const track = tracks[index];
    /* Получили его название и положили в заголовок */
    titleEl.textContent = track.title

    audio.src = `audio/${track.file}`
    audio.load();

    const imgPath = 
    `images/${track.file.replace("mp3", "jpeg")}`
    const img = new Image();
    img.onload = () => {
        coverEl.style.backgroundImage = `url(${imgPath})`;
        coverEl.style.backgroundSize = "cover";
    }
    img.onerror = () => {
        coverEl.style.background = 
        'linear-gradient(45deg, orange, purple)';
        coverEl.style.backgroundSize = 
        "400% 400%";
        coverEl.style.animation = 
        "gradient 8s ease infinite";
    }
    img.src = imgPath

}

function updateActiveTrack() {
    document.querySelectorAll('.track-item')
    .forEach((item, index) => {
        if(index === currentIndex) {
            item.classList.add('active')
        } else {
            item.classList.remove('active')
        }
    })
}

createTrackList()
loadTrack(currentIndex)