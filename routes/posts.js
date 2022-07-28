const express = require("express");
//comment 데이터를 사용하기 위해서 가져옴
const Comments = require("../schemas/comment")
// 모델 사용
const Posts = require("../schemas/post");
const router = express.Router();



//게시글 조회
router.get("/posts", async (req, res) => {
    const {  } = req.query;

    console.log()
    const posts = await Posts.find({  });
    res.json({
        // 키이름이 똑같다면 줄여도된다.
        // comments:comments 키:변수 = 객체 초기자 
        posts,
    })
    posts.find().sort({date:-1}, function(err, posts){});
})

// 게시글 작성
router.post("/posts", async (req, res) => {
    const {postId, user, title, date, password, content } = req.body;
    const posts = await Posts.find({ postId });
    if (posts.length) {
        return res
        .status(400)
        .json({ success: false, errorMessage: "이미 있는 게시글입니다." });
    }
    const createdPosts = await Posts.create({postId, user, title, date, password, content });
    res.send({ posts: createdPosts });
});

// 게시글 수정
router.put("/posts/:postId/posts", async (req, res) => {
    const { postId } = req.params;
    const { user, title, date, password, content } = req.body;
    const existPost = await Posts.find({postId: postId});

    if(!existPost.length){
        return res.status(400).json({ success: false, errorMessage: "댓글이 없습니다."});
    }

    
    await Posts.updateOne({ postId: postId }, { $set: {user, title, date, password, content }  });
    res.json({success: true, successMessage: "수정완료!" });
});


// 게시글 상세조회
// 주소는 항상 문자열, number로 변환해서 받아야함 
// :뒤에 뭔가 있으면 아무 값이나 받겠다는 의미 
router.get("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    const [ detail ] = await Posts.find({ postId: Number(postId) });

    // goodsId 배열은 숫자 이므로 맞춰준다
    // filter라는 메소드는 항상 배열을 반환한다 
    // const details = [];   이거는 const []= details; 와 같다 비구조화(distruacting)
    // const [detail] = comments.filter((item) => item.goodsId ===Number(goodsId));
    res.json({
        detail
    });
})

// 게시글 삭제
// 모델에서 반환하는건 프로미스 = await
router.delete("/comments/:goodsId/post", async (req, res )=> {
    const { goodsId } = req.params;

    const existPost = await Post.find({goodsId: Number(goodsId)});
    if(existPost.length){
      await Post.deleteOne({ goodsId: Number(goodsId)});
        //return res.status(400).json({ success: false, errorMessage: "이미 존재하는 글입니다."});
     }
     res.json({success: true});
});

module.exports = router;























// router.get("/posts", async (req, res) =>{
//     const posts = await Posts.find();
//     const goodsId = posts.map((post) => post.goodsId);
    
//     const comments = await Comments.find({goodsId: goodsId});

//     console.log(comments);
   
//     res.json({
//         posts: posts.map((post) => {
//             return {
//                 contents: post.contents,
//                 comments: comments.find((item) => item.goodsId === post.goodsId),
//             };
//         })
//     });
// });
