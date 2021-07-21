//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
let _ = require('lodash');
let port= 5000;

const homeStartingContent = "A journal is a written record of your thoughts, experiences, and observations. You can write in your journal daily, or only when you feel the urge.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



let posts=[];


app.get('/',function(req,res){
res.render("home",{homecontent:homeStartingContent,newone:posts });


});

app.get('/contact',(req,res)=>{
res.render("contact",{contact:contactContent});
});

app.get('/about',(req,res)=>{
  res.render("about",{about:aboutContent});
  });

app.get('/compose',(req,res)=>{
res.render("compose")
});


app.post('/compose',(req,res)=>{

let a={
  title:req.body.name1,
  post:req.body.text1,

};

posts.push(a);
res.redirect('/');

});

app.get('/new/:topic',(req,res)=>{
  
let match2 =_.lowerCase(req.params.topic); 


posts.forEach(function(ele){
let  match1 =_.lowerCase(ele.title);

 if(match1===match2){
   res.render('post',{
    title:ele.title,
    content:ele.post
   })
  

}

});



});




app.listen(port, function() {
  console.log(`Server started on the ${port}`);
});
