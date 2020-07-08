
const path=require('path');

const express=require('express');

const ejs=require('ejs');

const ejsLint = require('ejs-lint');

const bodyParser=require('body-parser');

const mysql=require('mysql');

 const app=express();

 const connection=mysql.createConnection({
 	host:'localhost',
 	user:'root',
 	password:'',
 	database:'crud'
 });
 connection.connect(function (error) {
 	if (!!error) {
 		console.log('there is error');
 	}
 	else{
 		console.log('connect');
 	}
 });

//set views file
app.set('views', path.join(__dirname,'views'));

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/',(req,res) => {
 let sql='select * from data';
 let query=connection.query(sql,(err,rows)=>{
   if (err) throw err;
 res.render('user_index',{

   title:'my title',
   user: rows
 
   });

  });
});
;


app.get('/add',function(req,res){

  res.render('add');


});

app.post('/add',function(req,res){

  let newMysql={
    name:req.body.name,
    location:req.body.location
  };
  let conn= connection.query("INSERT INTO data SET ?", newMysql, function(err,result){
    if (err) throw err;
    res.render('add',{

      name:req.body.name,
      location:req.body.location

    });

  });
  if (conn) {
    console.log('data inserted well');

  }
  else{
    console.log('data is not inserted well');
  }

});


app.get('/delete',function(req,res){

connection.query('DELETE FROM data WHERE id= ?',req.query.id, function(err,rs){
  res.redirect('/');

});

});

//app.get('/edit',function(req,res){

  //connection.query('select from data WHERE id= ?',req.query.id,function(err,rs){

    //res.render('add',{user: rs});

  //});

//});




app.listen(3000, () => {
 	console.log('port 3000');
 });
