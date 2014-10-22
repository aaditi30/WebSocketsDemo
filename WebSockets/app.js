var express = require('express');
var path = require('path');
//var favicon = require('http');
var bodyParser = require('body-parser');
//var md5= require('MD5');
var ws = require("nodejs-websocket");
var WebSocket=require('ws');
var app = express();
var http = require('http');
//var io = require('socket.io')(http);

//configure app
app.set('view engine','ejs');
app.set('js engine','js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.set('views',path.join(__dirname,'views'));
//to create static folders for js
app.use(express.static(__dirname + '/public'));

var server = http.createServer(function(request, response){
	response.writeHead(200, {
        "Content-Type": "text/plain"
    });
    response.write("Hello! This is the Node.js WebSocket server!");
    response.end();
});

//var connection = new WebSocket('ws://html5rocks.websocket.org/echo', ['soap', 'xmpp']);



 // app.get('/score',function(req,res){
 // 	console.log("inside app.get");
 // 	res.render('score')
 // });

// io.on('connection',function(socket){
// 	console.log("connection created");
// 	socket.on('disconnect',function(){
// 		console.log("connection ended");
// 	});
// });

// When the connection is open, send some data to the server
// connection.onopen = function () {
//   connection.send('Ping'); // Send the message 'Ping' to the server
// };

// // Log errors
// connection.onerror = function (error) {
//   console.log('WebSocket Error ' + error);
// };

// // Log messages from the server
// connection.onmessage = function (e) {
//   console.log('Server: ' + e.data);
// };

 server.listen(3000,function(){ 
 	console.log((new Date())+' server listening on port:3000');
 });

 var WebSocketServer= require('websocket').server;
 wsServer = new WebSocketServer({
    httpServer: server
});

 wsServer.on('request', function(r){
    // Code here to run on connection

    //to accept the connection
    var connection = r.accept('echo-protocol', r.origin);

    //count number of clients connecting
    var count = 0;
    var clients = {};

    // Specific id for this client & increment count
	var id = count++;
	// Store the connection method so we can loop through & contact all clients
	clients[id] = connection;

	//log msg to show client is connected
	console.log((new Date()) + ' Connection accepted from client [' + id + ']');

	// Create event listener
	connection.on('message', function(message) {

    // The total that was sent to us
    var total = message.utf8Data;
    console.log((new Date())+ 'Total received from client['+id+'] for grading');

    var grade;

    if (total <= 100) {
            grade = 'Grade C';
        } else if (total > 100 && total <= 200) {
            grade = 'Grade B';
        } else if (total > 200) {
            grade = 'Grade A';

        }
    console.log((new Date())+'Grade for client['+id+'] is'+grade);

    // Loop through all clients
    for(var i in clients){
        // Send a message to the client with the message
        clients[i].sendUTF(grade);
    }
});

	connection.on('close', function(reasonCode, description) {
    delete clients[id];
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
});


});


