import { Capacitor } from '@capacitor/core';
import { Playlist } from 'capacitor-plugin-playlist';

export async function loadAndPlayLocalFile(filePath: string, fileName: string) {
  // КРИТИЧНО: конвертируем нативный путь в URL, понятный WebView
  const fileSrc = Capacitor.convertFileSrc(filePath);

  await Playlist.setPlaylistItems({
    items: [{
      trackId: 'local-1',
      assetUrl: fileSrc,
      title: fileName,
      artist: 'Локальный файл',
      album: 'Моё устройство',
    }],
  });

  await Playlist.play();
}
