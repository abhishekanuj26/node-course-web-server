const express=require('express');
var app=express();
const fs=require('fs');
const hbs=require('hbs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');




app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
 var now=new Date().toString();
 
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err)
    console.log('unable to append server.log');
  });


   next();
});


hbs.registerHelper('scream',(text)=>{
    return text.toUpperCase();
});
 
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pagetitle:'home',
    curryear: new Date().getFullYear()
  });

});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pagetitle:'about page',
        curryear: new Date().getFullYear()
    });
})
app.listen(3000);