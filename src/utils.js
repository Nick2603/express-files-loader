const path = require('path');
const fs = require('fs').promises;
const { FILES_DIRECTORY } = require('./constants');

/**
 * @param {string} filename - The name of the file (without extension).
 * @returns {string} The full path to the file.
 */
const getFilePath = (filename) => path.join(__dirname, '../', FILES_DIRECTORY, `${filename}.json`);

/**
 * @param {string} filename - The name of the file (without extension).
 * @returns {Promise<Object>} A promise that resolves to the parsed JSON content of the file.
 * @throws {Error} If an error occurs during file read.
 */
const readFile = async (filename) => {
  try {
    const data = await fs.readFile(getFilePath(filename), 'utf-8');
    return JSON.parse(data);
  } catch (error) {
      throw new Error(`Error on file read: ${error}`);
  }
};

/**
 * @param {string} filename - The name of the file (without extension).
 * @param {Object} data - The data to write to the file.
 * @returns {Promise<void>} A promise that resolves when the file is successfully written.
 * @throws {Error} If an error occurs during file write.
 */
const writeFile = async (filename, data) => {
  const filePath = getFilePath(filename);

  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(`Error on file write: ${error}`);
  }
};

/**
 * @returns {Promise<string[]>} A promise that resolves to an array of filenames.
 * @throws {Error} If an error occurs during file listing.
 */
const getListOfFiles = async () => {
  try {
    const files = await fs.readdir(path.join(__dirname, '../', FILES_DIRECTORY));
    return files.map((file) => file.replace('.json', ''));
  } catch (error) {
    throw new Error(`Error on file listing: ${error}`);
  }
};

/**
 * @param {string} filename - The name of the file (without extension).
 * @returns {Promise<void>} A promise that resolves when the file is successfully removed.
 * @throws {Error} If an error occurs during file removal.
 */
const removeFile = async (filename) => {
  try {
    await fs.unlink(getFilePath(filename));
  } catch (error) {
    throw new Error(`Error on file removing: ${error}`);
  }
}

module.exports = {
  readFile,
  writeFile,
  getListOfFiles,
  removeFile,
}
