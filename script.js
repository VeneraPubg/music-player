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

    updateActiveTrack();
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

let isPlaying = false
let isShuffle = false
let repeatMod = 0;

playBtn.addEventListener('click', () => {
    if(isPlaying) {
        audio.pause();
        playBtn.textContent = "▶️"
    } else {
        audio.play();
        playBtn.textContent = "⏸️"
    }
    isPlaying = !isPlaying;
})

prevBtn.addEventListener('click', () => {
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
    } else {
        currentIndex = 
        (currentIndex - 1 + tracks.length) % tracks.length
        loadTrack(currentIndex);
    }
    if (isPlaying){
        audio.play()
    }
})

nextBtn.addEventListener('click', () => {
    if(isShuffle) {
        currentIndex = Math.floor(Math.random() * tracks.length)
    } else {
        currentIndex = (currentIndex + 1) % tracks.length
    }
    loadTrack(currentIndex)
    if(isPlaying) {
        audio.play()
    }
})

shuffleBtn.addEventListener('click', () => {
    isShuffle = !isShuffle
    if(isShuffle) {
        shuffleBtn.style.background = 'rgb(115, 232, 255)'
    } else {
        shuffleBtn.style.background = '#333'
    }
})

progressEl.addEventListener('input', () => {
    const seekTime = 
    (progressEl.value / 100) * audio.duration;
    audio.currentTime = seekTime
})

audio.addEventListener('timeupdate', () => {
    const percent = 
    (audio.currentTime / audio.duration) * 100
    progressEl.value = percent || 0;
})

audio.addEventListener("ended", () => {
    if(repeatMod === 1) {
        audio.play();
    } else {
        nextBtn.click();
    }
})

repeatBtn.addEventListener('click', () => {
    if(repeatMod === 0) {
        repeatMod = 1
        repeatBtn.textContent = '🔂'
    } else {
        repeatMod = 0
        repeatBtn.textContent = '🔁'
    }
})

function loadVolume() {
    const savedVolume = 
    localStorage.getItem("playerVolume");
    const volume = savedVolume ? parseFloat(savedVolume) : 1

}