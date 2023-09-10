const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    if(req.url === '/friends') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello friends' }));
    }
    else if(req.url === '/messages') {

        res.write('<p>HELLO IM JUST A PARAGRAPH</p>')
        res.write('<p>HELLO IM JUST A PARAGRAPH</p>')
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
})

server.listen(8000, () => {
    console.log('Server is running on port 8000');
}
);
module.exports = server;