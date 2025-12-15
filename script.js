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

function loadTrack(index) {
}

function updateActiveTrack() {

}

createTrackList()