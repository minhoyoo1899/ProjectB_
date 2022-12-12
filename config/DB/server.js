// import http  from 'http';
const http = require('http');
const mysql = require('mysql');

// console.log(http);
const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    switch (req.url) {
      case '/':
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end("인덱스");
    }
  } else if (req.url === "POST") {
    console.log('this is POST')
  }
});

server.listen(8282, () => {
  console.log('server running 8282');
});