import { Capacitor } from '@capacitor/core';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { Playlist } from 'capacitor-plugin-playlist';
import { Preferences } from '@capacitor/preferences';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Мой плеер</h1>
  <button id="pick">Выбрать трек</button>
  <button id="resume">Продолжить последний</button>
  <p id="status">—</p>
`;

const status = document.querySelector<HTMLParagraphElement>('#status')!;

document.querySelector('#pick')!.addEventListener('click', async () => {
  try {
    const result = await FilePicker.pickFiles({
      types: ['audio/*'],
      readData: false,
    });
    if (!result.files.length) return;

    const file = result.files[0];
    const fileSrc = Capacitor.convertFileSrc(file.path);

    await Preferences.set({ key: 'lastTrackPath', value: fileSrc });

    await Playlist.setPlaylistItems({
      items: [{
        trackId: 'local-1',
        assetUrl: fileSrc,
        title: file.name,
        artist: 'Локальный файл',
        album: 'Моё устройство',
      }],
    });
    await Playlist.play();

    status.textContent = `Играет: ${file.name}`;
  } catch (e) {
    status.textContent = `Ошибка: ${(e as Error).message}`;
    console.error(e);
  }
});

document.querySelector('#resume')!.addEventListener('click', async () => {
  const { value } = await Preferences.get({ key: 'lastTrackPath' });
  status.textContent = value ? `Последний: ${value}` : 'Нет сохранённого трека';
});
