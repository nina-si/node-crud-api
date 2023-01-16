import http from 'http';
import * as uuid from 'uuid';
import {
  addNewUser,
  getUserById,
  getUsers,
  handleWrongEndpoint,
  handleWrongId,
} from './resolvers';

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url === '/api/users' && req.method === 'GET') {
      getUsers(res);
    } else if (req.url.match(/\/api\/users\/\w+/) && req.method === 'GET') {
      const currentId = req.url.split('/')[3];
      if (typeof currentId !== 'string' || !uuid.validate(currentId)) {
        handleWrongId(res);
      } else getUserById(res, currentId);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      addNewUser(req, res);
    } else {
      handleWrongEndpoint(res);
    }
  }
);

export default server;
