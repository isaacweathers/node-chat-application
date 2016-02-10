var http = require('http');

function handleRequest(request, response) {
	response.end('It works!' + request.url);
}

var server = http.createServer(handleRequest);

server.listen(8000, function () {
	console.log("I'm listening!");
});