import express from 'express';
import { MapleInvenLoader } from './loader/MapleInvenLoader';

const app = express();
const port = 3000;

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (typeof origin === 'string' && isWhiteList(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

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

function isWhiteList(host: string): boolean {
  const whiteList = ['https://eruhoon.github.io', 'http://localhost:5173'];
  return whiteList.indexOf(host) > -1;
}
