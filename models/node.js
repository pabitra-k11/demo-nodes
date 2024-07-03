const mongoose=require("mongoose");
let nodeSchema= mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        maximumLength:8,
    },
    node:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        maximumLength:10,
    }
});

let Node=mongoose.model("Node",nodeSchema);

module.exports=Node;