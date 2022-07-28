const mongoose = require("mongoose");

//여기서 몽고db에 연결 해줘야함
const connect = () => {
    mongoose.connect("mongodb://localhost:27017/spa_view", {ignoreUndefined: true}).catch((err) => {
        console.error(err);
    });
}; 

// 외부에서 사용할 수 있게 
module.exports = connect;