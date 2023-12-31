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

export default redisClient;
