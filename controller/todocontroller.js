let bodyParser=require('body-Parser');

let data=[{item:'getmilk'},{item:'walkgdog'},{item:'kick some coding ass'}];
let urlencodedparser = bodyParser.urlencoded({extended: false});
module.exports = function (app) {

	app.get('/todo', function(req,res){

  res.render('todo',{todos: data});

	});

app.post('/todo',urlencodedparser, function(req,res){
   
   data.push(req.body);
   res.JSON(data);

	});
app.delete('/todo', function(req,res){


	});
};