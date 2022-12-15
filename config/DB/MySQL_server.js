// import http  from 'http';
const http = require('http');
const mysql = require('mysql');

// console.log(http);

const dbconfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  port:'3306',
  database: 'hi_five'
}

const conn = mysql.createConnection(dbconfig);
// conn.query('SELECT * FROM test_table;', (error, rows) => {
//   if (error) throw error;
//   console.log(rows);
// });


// http 모듈로 서버연결
const server = http.createServer((req, res) => {
  if (req.method === "GET") {
    switch (req.url) {
      case '/':
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end("인덱스");
        break;
      case '/db':
        conn.query('SELECT * FROM test_table;', (error, rows) => {
          if (error) throw error;
          console.log(rows);
          console.log(typeof rows);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(`데이터 테스트 : ${rows}`);
        });
        break;
    }
  } else if (req.url === "POST") {
    console.log('this is POST')
  }
});

server.listen(8282, () => {
  console.log('server running 8282');
}); 