// require - express 모듈을 가져올때 사용
// Router만 붙여도 됨
const express = require("express");
// ..상대경로 모델은 보통 대문자로 
const Comments = require("../schemas/comment");
const Post = require("../schemas/post");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("this is root page");
});

//댓글 목록 조회
router.get("/comments", async (req, res) => {
    const { category } = req.query;

    console.log()
    const comments = await Comments.find({ category });
    res.json({
        // 키이름이 똑같다면 줄여도된다.
        // comments:comments 키:변수 = 객체 초기자 
        comments
    })
})

// 댓글 삭제
// 모델에서 반환하는건 프로미스 = await
router.delete("/comments/:commentId/comments", async (req, res )=> {
    const { commentId } = req.params;

    const existPost = await Comments.find({commentId: commentId});
    if(existPost.length){
      await Comments.deleteOne({ commentId: commentId});
        //return res.status(400).json({ success: false, errorMessage: "이미 존재하는 글입니다."});
     }
     res.json({success: true});
});

// 댓글 수정
// 게시글이 없을떄 에러를 내기 
//json은 타입까지 넘겨 받기 때문에 number처리 안해도됨 
router.put("/comments/:commentId/comments", async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const existPost = await Comments.find({commentId: Number(commentId)});
   
    if(!content.length) {
        return res.status(400).json({ success: false, errorMessage: "댓글 내용을 입력해주세요."})
    }
   
    if(!existPost.length){
        return res.status(400).json({ success: false, errorMessage: "댓글이 없습니다."});
    }
    
    await Comments.updateOne({ commentId: Number(commentId) }, { $set: { content }  });
    res.json({success: true});
});

// 댓글 생성
// 생성api
// get을 제외한 메소드들은 body를 받아 올 수 있다
// find는 프로미스를 반환한다. await 사용하기 위해 async
// create 모델을 생성하면서 insert까지 해주는 함수 
// comments.length 는 배열로 넘어오고 1이면 있는거고 0이면 없는거 이기 떄문에 
router.post("/comments", async (req, res) => {
    const { commentId, content } = req.body;
    
    
    const comments = await Comments.find({ commentId });
    
    if(!content.length) {
        return res.status(400).json({ success: false, errorMessage: "댓글 내용을 입력해주세요."})
    }

    if (comments.length) {
        return res
        .status(400)
        .json({ success: false, errorMessage: "이미 있는 게시글입니다." });
    }

    const createdComments = await Comments.create({ commentId, content });
    res.json({ comments: createdComments });
    //res.send({ comments: createdComments });
});


// require 요청을 받으려면 모듈로 내보내야 한다.
// router는 위에서 정의한 것들 
// router를 모듈로써 내보내야겠다. 
module.exports = router; 


























// // 게시글에 댓글 추가 
// // comment에 대한걸 post에 담는다. 개수와 함께 
// // 이미 존재하는 post 를 가져오는거
// // 파라미터로 가져오는건 다 문자열이다
// router.post("/comments/:goodsId/post", async (req, res) => {
//     const { goodsId } = req.params;
//     const { content } = req.body; 

//     const existpost= await Post.find({ goodsId: Number(goodsId) });
//     if(existpost.length){
//         return res.status(400).json({ success: false, errorMessage: "이미 존재하는 댓글입니다."});
//     }

//     await Post.create ({ goodsId: Number(goodsId), content });
//     res.send({ success: true});
// });







// // 댓글 상세조회!
// // 주소는 항상 문자열, number로 변환해서 받아야함 
// // :뒤에 뭔가 있으면 아무 값이나 받겠다는 의미 
// router.get("/comments/:goodsId", async (req, res) => {
//     const { goodsId } = req.params;
//     const [detail] = await Comments.find({ goodsId: Number(goodsId) });

//     // goodsId 배열은 숫자 이므로 맞춰준다
//     // filter라는 메소드는 항상 배열을 반환한다 
//     // const details = [];   이거는 const []= details; 와 같다 비구조화(distruacting)
//     // const [detail] = comments.filter((item) => item.goodsId ===Number(goodsId));
//     res.json({
//         detail
//     });
// })

// // 게시글에 댓글 추가 
// // comment에 대한걸 post에 담는다. 개수와 함께 
// // 이미 존재하는 post 를 가져오는거
// // 파라미터로 가져오는건 다 문자열이다
// router.post("/comments/:goodsId/post", async (req, res) => {
//     const { goodsId } = req.params;
//     const { content } = req.body; 

//     const existPost = await Post.find({goodsId: Number(goodsId)});
//     if(existPost.length){
//         return res.status(400).json({ success: false, errorMessage: "이미 존재하는 댓글입니다."});
//     }

//     await Post.create ({ goodsId: Number(goodsId), content });
//     res.send({ success: true});
// });