const express = require("express");
// 스키마에 있는 함수 가져오기
const connect = require("./schemas")
const app = express();
const port = 3000;

connect();

// comments라는 파일을 가져오기 위해 (상대경로) app.js에 안에있는경로에서 찾는다
const commentsRouter = require("./routes/comments");
const postsRouter = require("./routes/posts");

const requestMiddleware = ((req, res, next) =>{
    console.log("Request URL:", req.originalUrl, "-", new Date());
    next();
});

// body로 들어오는 json형태의 데이터를 파싱(가공)
app.use(express.json());

// 미들웨어를 사용할 수 있게 도와주는 use
// use 밑으로 get, listen을 두어야 영향을 받을 수 있다.
// next는 다음 미들웨어로 넘겨준다. 
// 응답없이 next가 호출이 안되는 경우에만 문제가 생긴다.
app.use(requestMiddleware);

app.use("/api", [commentsRouter, postsRouter]);

// get이라는 HTTP메소드로 / 이경로로 요청이 들어오면 response 객체는 
// express가 넘겨주는 거고 그다음 답장을 보내겠다
app.get('/', (req, res) => {
    res.send("hello");
});

//listen은 서버를 port 키겠다. 그다음 인자에 있는 함수를 실행하겠다.
app.listen(port, () => {
    console.log(port, "포트로 서버가 커졌어요!")
})