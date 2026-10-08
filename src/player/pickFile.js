import { FilePicker } from '@capawesome/capacitor-file-picker';
export async function pickAudioFile() {
    const result = await FilePicker.pickFiles({
        types: ['audio/*'],
        readData: false,
    });
    if (result.files.length > 0) {
        return result.files[0]; // { path, name, mimeType, size }
    }
    return null;
}
