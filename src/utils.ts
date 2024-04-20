import path from 'node:path';
import fs from 'node:fs/promises';
import { FILES_DIRECTORY } from './constants';

const getFilePath = (filename: string): string => path.join(__dirname, '../', FILES_DIRECTORY, `${filename}.json`);


export const readFile = async (filename: string): Promise<any> => {
  try {
    const data = await fs.readFile(getFilePath(filename), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
      throw new Error(`Error on file read: ${error}`);
  }
};

export const writeFile = async (filename: string, data: Object): Promise<void> => {
  const filePath = getFilePath(filename);

  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(`Error on file write: ${error}`);
  }
};

export const getListOfFiles = async (): Promise<string[]> => {
  try {
    const files = await fs.readdir(path.join(__dirname, '../', FILES_DIRECTORY));
    return files.map((file) => file.replace('.json', ''));
  } catch (error) {
    throw new Error(`Error on file listing: ${error}`);
  }
};

export const removeFile = async (filename: string): Promise<void> => {
  try {
    await fs.unlink(getFilePath(filename));
  } catch (error) {
    throw new Error(`Error on file removing: ${error}`);
  }
}
