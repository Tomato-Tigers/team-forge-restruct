const express = require('express');
const loginHandler = require('./api/login');
const registerHandler = require('./api/register');

const app = express();
app.use(express.json());

app.post('/api/login', loginHandler);
app.post('/api/register', registerHandler);

const port = 5000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
