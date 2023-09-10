const http = require('http');
const processCSV = require('../index.js');

const server = http.createServer();

server.on('request', async (req, res) => {
    
    if(req.url === '/') {
        try {
            const result = await processCSV();
            console.log("RESULT", result)
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result.map(planet => planet['kepler_name'])));
        } catch (err) {
            res.statusCode = 500;
            res.end('Internal Server Error');
        }
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