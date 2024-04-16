const express = require('express');
const { filesRouter } = require('./filesRouter')
const { ROUTER_PATHS } = require('./routerPaths')

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(ROUTER_PATHS.files, filesRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

module.exports = { app, server };
