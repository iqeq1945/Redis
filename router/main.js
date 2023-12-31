import express from 'express';
import redisClient from '../redis.js';
const Router = express.Router();

Router.get('/', async (req, res) => {
  await redisClient.set('key', 'value');
  const value = await redisClient.get('key');
  res.send(value);
});

export default Router;
