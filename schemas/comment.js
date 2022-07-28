const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  commentId: {
    type: Number,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true,
    unique: true
  }
});

// comments 는 모델
module.exports = mongoose.model("Comments", commentsSchema);

// const commentsSchema = mongoose.Schema({
//   goodsId: {
//       type: Number,
//       required: true,
//       unique: true
//     },
//     title: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     name: {
//       type: String
//     },
//     password: {
//       type: Number
//     },
//     text: {
//       type: String
//     }
// });