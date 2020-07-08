let mysql=require("mysql");
let express=require("express");

let app = express();


app.get('/',function(request,response){
	fetchData(response);
	console.log('done displayed data');
});

let db=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'crud'

}); 

//now we have create connection with the database
db.connect(function(err){
	if (err) {throw err;}

	console.log("connected to the database");

})
//function

function executeQuery(sql,cb){

db.query(sql,function(error,result,fields){
	if (error) {throw error;}
	cb(result);

});
}

function fetchData(response){

	executeQuery("select * from data", function(result){
		console.log(result);

		response.write(`<table><tr><th>id</th><th>name</th><th>location</th><th>action</th>`);
	
		for(let row in result){
			response.write('<tr>');
			for(let column in result[row]){

    response.write('<td><label>' + result[row][column] + '</label></td>');

			} 
		response.write('<td><a href="#">delete</a><td></tr>');	


		}
	
	
		response.end('</table>');

	});
}

app.get('/insert',function(request,response){
	response.write('<input type="text"');
});





//set up template engine


//listen to port

app.listen(3000,function(){
	console.log('you are listen to port 3000');     //listen to the port
});

