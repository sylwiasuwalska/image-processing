import express from 'express';

const app = express();
const port = 3000;

app.get('/api', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server started at localhost: ${port}`);
});

export const myFunc = (num: number) => num * 5;
