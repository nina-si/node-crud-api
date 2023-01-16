import http from 'http';
import { getUsers, handleWrongEndpoint } from './resolvers';

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url === '/api/users' && req.method === 'GET') {
      getUsers(res);
    } else {
      handleWrongEndpoint(res);
    }
  }
);

export default server;
