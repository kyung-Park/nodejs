const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  postId: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: String,
      unique: true
    },
    title: {
      type: String,
      unique: true
    },
    date: {
      type: Date,  
      default: () => Date.now() 
    },
    password: {
      type: Number
    },
    content: {
      type: String
    }
});

module.exports = mongoose.model("Post", postSchema);


// const postSchema = new mongoose.Schema({
//   goodsId: {
//     type: Number,
//     required: true,
//     unique: true
//   },
//   quantity: {
//     type: Number,
//     required: true
//   }
// });