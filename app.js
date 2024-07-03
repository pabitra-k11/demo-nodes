const express=require("express");
const mongoose=require("mongoose");
const Node=require("./models/node.js");
const methodOverride=require("method-override");
const path =require("path");
const wrapAsync=require("./warpAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {schemaNode}=require("./schema.js");

const app=express();

require('dotenv').config()
console.log(process.env);


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));

const dbURL=process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connected to DB!");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(dbURL);
}
app.get("/",(req,res)=>{
    res.send("i am root!");
});

//index route
app.get("/nodes",async(req,res)=>{
   let nodes=await Node.find({});
   res.render("./node/index.ejs",{nodes});
});

//new route
app.get("/nodes/new",(req,res)=>{
    res.render("./node/new.ejs");
});

//Show route
app.get("/nodes/:id",wrapAsync(async(req,res,next)=>{
   
        let{id}=req.params;
        let node=await Node.findById(id);
        res.render("./node/show.ejs",{node});
    
   

}));

//create route
app.post("/nodes",wrapAsync(async(req,res,next)=>{
   let result= schemaNode.validate(req.body);
   console.log(result);
    let newNode= new Node(req.body.node);

    await newNode.save();
    console.log("node is inserted..!");
    res.redirect("/nodes");

}));

//edit route
app.get("/nodes/:id/edit",wrapAsync(async(req,res,next)=>{
    
    let{id}=req.params;
    let node= await Node.findById(id);
    res.render("./node/edit.ejs",{node});

}));

//update route
app.put("/nodes/:id",wrapAsync(async(req,res,next)=>{
   
    let{id}=req.params;
    let newUpdateNode=req.body.node;
    await Node.findByIdAndUpdate(id,{...newUpdateNode},{runValidator:true});
    res.redirect(`/nodes/${id}`);

}));

//delete route
app.delete("/nodes/:id",wrapAsync(async(req,res,next)=>{
  
    let{id}=req.params;
    await Node.findByIdAndDelete(id);
    res.redirect("/nodes");

}));

app.use((err,req,res,next)=>{
    let message=err.message;
    res.render("./node/error.ejs",{message});
});



app.listen(8080,()=>{
    console.log("Server listening on port :8080");
});