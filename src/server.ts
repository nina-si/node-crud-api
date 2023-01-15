import http from 'http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('<h1>Hello</h1>');
});

export default server;
