let mysql=require("mysql");
let express=require("express");

let app = express();

let db=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'crud'
});


if (!db) {

console.log("connection failed");

}
else{

console.log("connection succed");

}
function executeQuery(sql,cb){

db.query(sql,function(error,result,fields){
	if (error) {throw error;}
	cb(result);

});
}
app.get('/',function(request,response){

	executeQuery("select * from data", function(result){
		console.log(result);

	response.write(`<table><tr><th>id</th><th>name</th><th>location</th><th>action</th>`);
	
		for(let row in result){
			response.write('<tr>');
			for(let column in result[row]){

    response.write('<td><label>' + result[row][column] + '</label></td>');

			} 
		response.write('<td><a href="#">delete</a><td><td><a href="#">update</a><td></tr>');	
       	



		}
	
	
		response.end('</table>');

	
	

});

});


app.listen(3000,function(){
	console.log('you are listen to port 3000');     //listen to the port
});
