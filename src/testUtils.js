const path = require('path');
const fs = require('fs').promises;
const { FILES_DIRECTORY_FOR_TESTS } = require('./constants');

const pathToDirectory = path.join(__dirname, '../', FILES_DIRECTORY_FOR_TESTS);

/**
 * @returns {Promise<void>} A Promise that resolves when the directory is successfully created.
 * @throws {Error} Throws an error if directory creation fails.
 */
const createDirectory = async () => {
  try {
    await fs.mkdir(pathToDirectory);
  } catch (error) {
    throw new Error(`Error on directory creation, ${error}`);
  }
}

/**
 * @returns {Promise<void>} A Promise that resolves when the directory and its contents are successfully removed.
 * @throws {Error} Throws an error if directory removal fails.
 */
const removeDirectory = async () => {
  try {
    await fs.rm(pathToDirectory, { recursive: true });
  } catch (error) {
    throw new Error(`Error on directory removing, ${error}`);
  }
};

module.exports = { removeDirectory, createDirectory };
