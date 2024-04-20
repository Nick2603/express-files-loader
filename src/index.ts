import express from 'express';
import { filesRouter } from './filesRouter';
import { ROUTER_PATHS } from './routerPaths';

export const app = express();

const PORT = 3000;

app.use(express.json());

app.use(ROUTER_PATHS.files, filesRouter);

export const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
