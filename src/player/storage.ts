import { Preferences } from '@capacitor/preferences';

export async function saveLastTrack(fileSrc: string) {
  await Preferences.set({ key: 'lastTrackPath', value: fileSrc });
}

export async function loadLastTrack(): Promise<string | null> {
  const { value } = await Preferences.get({ key: 'lastTrackPath' });
  return value ?? null;
}
