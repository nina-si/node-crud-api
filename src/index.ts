import http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('<h1>Hello</h1>');
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
