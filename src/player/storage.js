import { Preferences } from '@capacitor/preferences';
export async function saveLastTrack(fileSrc) {
    await Preferences.set({ key: 'lastTrackPath', value: fileSrc });
}
export async function loadLastTrack() {
    const { value } = await Preferences.get({ key: 'lastTrackPath' });
    return value ?? null;
}
