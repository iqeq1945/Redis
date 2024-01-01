import express, { json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import redisClient from './redis.js';
import session from 'express-session';
import RedisStore from 'connect-redis';
import mainRouter from './router/main.js';

dotenv.config(); // env환경변수 파일 가져오기
const app = express();
const port = 3000;

// Other settings
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

/*
redisClient.connect().then(); // redis v4 연결 (비동기)
const redisCli = redisClient.v4; // 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용
*/
//* 세션 쿠키 미들웨어
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  resave: false,
  saveUninitialized: true,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  store: new RedisStore({ client: redisClient, prefix: 'session:' }), // 세션 데이터를 로컬 서버 메모리가 아닌 redis db에 저장하도록 등록
};
app.use(session(sessionOption));

app.use('/', mainRouter);

app.listen(port, function () {
  console.log(`App is listening on port ${port} !`);
});
