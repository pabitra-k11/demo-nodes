
const mongoose=require("mongoose");
const Node=require("../models/node.js");
const initData=require("./data.js");
main().then(()=>{
    console.log("connected to DB!");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/practice");
}

const initDB=async()=>{
    await Node.deleteMany({});
    await Node.insertMany(initData.data);
    console.log("Data was intialized!");


}

initDB();