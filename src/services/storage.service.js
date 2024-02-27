import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');
export const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
}

const isFileEXist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    }
    catch (error) {
        return false;
    }
}

const readFile = async (path) => {
    if (await isFileEXist(path)) {
        const fileData = await promises.readFile(path, 'utf-8');
        return JSON.parse(fileData);
    }

    return null;
}

export const saveKeyValue = async (key, value) => {
    let data = {}
    if (await isFileEXist(filePath)) {
        data = await readFile(filePath);
    }

    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
}

export const getKeyValue = async (key) => {
    const fileData = await readFile(filePath);
    if (fileData) {
        return fileData[key];
    }

    return undefined;
}
