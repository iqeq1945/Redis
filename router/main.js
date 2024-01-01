import express from 'express';
import redisClient, { getHistory, setHistory } from '../redis.js';
const Router = express.Router();

Router.get('/history', async (req, res) => {
  const result = await setHistory('123', '1');
  console.log(result);
});

Router.get('/get', async (req, res) => {
  const result = await getHistory('1');
  console.log(result);
});
export default Router;
