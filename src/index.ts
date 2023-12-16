import express from 'express';
import { MapleInvenLoader } from './loader/MapleInvenLoader';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/maple-inven', async (_, res) => {
  const results = await new MapleInvenLoader().load();
  res.send(results);
});
