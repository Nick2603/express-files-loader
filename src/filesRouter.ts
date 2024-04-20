import { Request, Response, Router } from 'express';
import {
  writeFile,
  readFile,
  getListOfFiles,
  removeFile
} from './utils';

export const filesRouter = Router();

filesRouter.post('/', async (req: Request, res: Response) => {
  const { filename, data } = req.body;

  if (!filename || !data) return res.status(400).json({ message: 'Missing filename or data in request body' });

  try {
    await writeFile(filename, data);
  
    res.status(201).json({ message: 'File created successfully' });
  } catch (error) {
    console.error(error);
  
    res.status(400).json({ message: 'Error on file creating' });
  }
});

filesRouter.get('/', async (_: Request, res: Response) => {
  try {
    const files = await getListOfFiles();
  
    res.json(files);
  } catch (error) {
    console.error(error);
  
    res.status(400).json({ message: 'Error retrieving files' });
  }
});

filesRouter.get('/:filename', async (req: Request, res: Response) => {
  const { filename } = req.params;

  try {
    const data = await readFile(filename);

    if (!data) return res.status(404).json({ message: 'File not found' });

    res.json(data);
  } catch (error) {
    console.error(error);
  
    res.status(400).json({ message: 'Error retrieving file' });
  }
});

filesRouter.put('/:filename', async (req: Request, res: Response) => {
  const { filename } = req.params;

  const { data } = req.body;

  if (!data) return res.status(400).json({ message: 'Missing data in request body' });

  try {
    await writeFile(filename, data);
  
    res.json({ message: 'File updated successfully' });
  } catch (error) {
    console.error(error);
  
    res.status(400).json({ message: 'Error updating file' });
  }
});

filesRouter.delete('/:filename', async (req: Request, res: Response) => {
  const { filename } = req.params;

  try {
    await removeFile(filename);

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error(error);

    res.status(400).json({ message: 'Error deleting file' });
  }
});
