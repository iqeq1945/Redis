import dotenv from 'dotenv';
import redis from 'redis';

dotenv.config(); // env환경변수 파일 가져오기

// Redis 연결
const redisClient = redis.createClient({legacyMode:true});
redisClient.on('connect', ()=>{
    console.info('Redis connected!');
});

redisClient.on('error', (err)=>{
    console.error('Redis Client Error', err);
});

redisClient.connect().then();
const redisCli = redisClient.v4;

let bool = await redisClient.v4.set('key', '123');
let data = await redisClient.v4.get('key');