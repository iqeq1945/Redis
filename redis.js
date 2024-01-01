import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();
//* Redis 연결
// redis[s]://[[username][:password]@][host][:port][/db-number]
const redisClient = await createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
})
  .on('error', (err) => console.log('Redis Client Error', err))
  .connect();

export const setHistory = async (keyword, id) => {
  try {
    return await redisClient.zAdd(`keyword`, [
      { score: Date.now(), value: keyword },
    ]);
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getHistory = async (keyword, id) => {
  try {
    return await redisClient.zRange(`keyword`, -5, -1);
  } catch (e) {
    console.log(e);
    next(e);
  }
};
export default redisClient;
