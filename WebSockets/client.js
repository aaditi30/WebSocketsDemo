var ws = new WebSocket('ws://localhost:3000/score', 'echo-protocol');

function getData(){
	alert("inside getData"); 
    var quiz1=document.getElementById("test1").value;
	var quiz2=document.getElementById("test2").value;
	var midterm=document.getElementById("test3").value;
	total = parseInt(quiz1)+parseInt(quiz2)+parseInt(midterm);
    ws.send(total);
    alert("total is"+total);
}

ws.addEventListener("message", function(e) {
    // The data is simply the message that we're sending back
    var msg = e.data;

    // Append the message
    document.getElementById('gradeid').innerHTML = msg;
});

