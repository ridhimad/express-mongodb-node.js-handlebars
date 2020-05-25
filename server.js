var express = require('express');
var bodyParser= require('body-parser');
const hbs=require('hbs');
const assert= require('assert');
const path = require("path");

var app= express();
var {ObjectID}=require('mongodb');
var {mongoose}= require('./db/mongoose.js')
var {Todo}=require('./models/todo');

app.set('view engine','hbs');
app.use(express.static(__dirname+'./views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/abc',(req,res) =>
{     var todo=new Todo({
  name:req.body.name,
  email:req.body.email,
  password:req.body.password,
  phone:req.body.phone
})
      todo.save().then((doc) => {
        console.log("Record inserted Successfully");
         return console.log(JSON.stringify(doc,undefined,2));
       }, (e) => {
                     console.log('Unable to save user', e);
               });
     return res.render('abc.hbs',{
      title:'SIGNUP SUCCESSFUL'
    });
});

app.get('/',function(req,res){
res.render("form.hbs",{
  title:"SIGNUP FORM"
});
});

app.get('/find',(req,res)=>{
     Todo.findOne({phone:req.query.phone}).then((doc) => {
  console.log("Record found Successfully");
   return console.log(JSON.stringify(doc,undefined,2));
 }, (e) => {
               console.log('Unable to save user', e);
         });
         return res.render('fd.hbs',{
         title:'FIND SUCCESSFUL'
       });
});

app.get('/f',function(req,res){
res.render("find.hbs",{title:"Find Form"});
});

app.delete('/delete1/:phone',(req,res)=>{
   Todo.findOneAndRemove({phone:req.query.phone}).then((doc) => {
      console.log("Record Deleted Successfully");
   return console.log(JSON.stringify(doc,undefined,2));
   return res.render('del.hbs',{
   title:'DELETE SUCCESSFUL'
  });
   }, (e) => {
               console.log('Unable to save user', e);
         });

});

app.get('/d',function(req,res){
res.render("delete.hbs",{
  title:"Delete Form"
});
});


app.put('/update/:phone', function (req, res) {
    var phone= req.query.phone;
    Todo.findOne({phone},function(err,foundObject){
      if(err){
        console.log(err);
        res.status(500).send();
      }else{
        if(!foundObject){
          res.status(404).send();
        }
        else{
          if(req.body.name){foundObject.phone=req.body.name;}
          if(req.body.email){foundObject.phone=req.body.email;}
          if(req.body.password){foundObject.phone=req.body.password;}
          if(req.body.phone){foundObject.phone=req.body.phone;}
          foundObject.save(function(err,updatedObject){
            if(err){console.log(err);
              res.status(500).send;}
            else{res.send(updatedObject);}
          });
        }
      }
    });

});
app.get('/u',function(req,res){
res.render("update.hbs",{
  title:"UPDATE FORM"
});
});

app.listen(3000,()=>{
console.log("server listening at port 3000");
});
