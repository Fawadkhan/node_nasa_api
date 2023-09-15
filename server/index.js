const http = require('http');

const server = http.createServer();

const friends = [
    {
        id: 1,
        name: 'Randy',
    },
    {
        id: 2,
        name: 'Mike',
    },
    {
        id: 3,
        name: 'Jhon',
    },
    {
        id: 4,
        name: 'Joe',
    },
]

server.on('request', async (req, res) => {
    const items = req.url.split('/');
    if(req.method === "POST" && items[1] === 'friends') { 
        req.on('data', (data) => {
            const friend = data.toString();
            console.log("REQUEST:", friend)
            friends.push(JSON.parse(friend));
        }
        );
        req.pipe(res)
    }
    else if(req.method === "GET" && items[1] === 'friends') {
            res.statusCode = 200;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            if(items.length === 3) {
                const id = items[2];
                const friend = friends[id - 1]
                res.end(JSON.stringify(friend));
            }
            else {
                res.end(JSON.stringify(friends));
            }
            res.end();
        
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