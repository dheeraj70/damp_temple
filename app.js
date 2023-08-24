const express = require("express");
const ejs = require("ejs");
const bodyParser=require("body-parser");
const fs = require('fs');
//const sys = require('sys');
const ImageDataURI = require('image-data-uri');
const mongoose = require("mongoose");


const app = express();

mongoose.connect("mongodb+srv://fruits54321:Goood54321@cluster0.bqgzh.mongodb.net/drawingDB",{useNewUrlParser:true});
const drawingSchema = new mongoose.Schema({
  name:String,
  data:String,
  likes:Number
});
const drawing = mongoose.model("drawing",drawingSchema);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("files"));
app.set("view engine","ejs");

app.get("/",function(req,res){
  res.render("index");

});
app.get("/draw",function(req,res){
  res.render("drawpad");
});

app.post("/draw",function(req,res){
   var imgdat=req.body.data;
   var person=req.body.drawer;
   const Onedrawing = new drawing({
     name:person,
     data:imgdat,
     likes:0
   });
   Onedrawing.save();
   res.redirect("/drawings");
  //  fs.writeFile("gd.txt",imgdat,function(err){
  //   console.log("ok");
  // });
  // var data = imgdat.replace("data:image/png;base64,","")
   // ImageDataURI.outputFile(imgdat,'files/imgsss/myfile' );
// fs.writeFileSync('files/imgsss/myfile.png', new Buffer(imgdat, 'base64'));

});
app.get("/drawings",function(req,res){
var draws =[];
drawing.find({},function(err,result){
  if(err){
    console.log(err);
  }else{
    for(var i =0;i<result.length;i++){
      var onedraw = [];
        onedraw.push(result[i].name,result[i].data,result[i].likes);
        draws.push(onedraw);
    }
    res.render("drawingss",{set:draws,setno:draws.length});
  }
})

});
app.get("/about",function(req,res){
  res.render("about");
});

app.listen(process.env.PORT || 3000,function(req,res){
  console.log("server started");
});
