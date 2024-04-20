import request from 'supertest';
import { app , server } from './index';
import { removeDirectory, createDirectory } from './testUtils';

jest.mock('./constants', () => {
  return {
    ...jest.requireActual('./constants'),
    FILES_DIRECTORY: 'testFiles',
  };
});

const testFileData = { key: 'value' };
const testFileName = 'testFile';

describe('File Management API', () => {
  beforeAll(async () => {
    await createDirectory();
  });

  afterAll(async () => {
    jest.restoreAllMocks();

    await removeDirectory();

    try {
      server.close();
    } catch (error) {
      throw new Error('Error on server shutting down');
    }
  });

  test('should create a new file', async () => {
    const response = await request(app)
      .post('/files')
      .send({ filename: testFileName, data: testFileData })
      .expect(201);

    expect(response.body.message).toBe('File created successfully');
  });

  test('should retrieve a list of files', async () => {
    const response = await request(app)
      .get('/files')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toContain(testFileName);
  });

  test('should retrieve file content', async () => {
    const response = await request(app)
      .get(`/files/${testFileName}`)
      .expect(200);

    expect(response.body).toEqual(testFileData);
  });

  test('should update file content', async () => {
    const updatedData = { updatedKey: 'updatedValue' };
  
    const response = await request(app)
      .put(`/files/${testFileName}`)
      .send({ data: updatedData })
      .expect(200);

    expect(response.body.message).toBe('File updated successfully');
  });

  test('should delete a file', async () => {
    const response = await request(app)
      .delete(`/files/${testFileName}`)
      .expect(200);

    expect(response.body.message).toBe('File deleted successfully');
  });
});
