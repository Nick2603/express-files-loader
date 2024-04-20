import path from 'node:path';
import fs from 'node:fs/promises';
import { FILES_DIRECTORY_FOR_TESTS } from './constants';

const pathToDirectory = path.join(__dirname, '../', FILES_DIRECTORY_FOR_TESTS);

export const createDirectory = async (): Promise<void> => {
  try {
    await fs.mkdir(pathToDirectory);
  } catch (error) {
    throw new Error(`Error on directory creation, ${error}`);
  }
}

export const removeDirectory = async (): Promise<void> => {
  try {
    await fs.rm(pathToDirectory, { recursive: true });
  } catch (error) {
    throw new Error(`Error on directory removing, ${error}`);
  }
};
