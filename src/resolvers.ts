import http from 'http';
import { IUser } from './interfaces';
import { findUser } from './userModel';

let db: IUser[] = require('./data.json');

export const getUsers = async (res: http.ServerResponse) => {
  try {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db));
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (res: http.ServerResponse, userId: string) => {
  try {
    const user = await findUser(userId);

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User with this id does not exist' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    console.log(err);
  }
};

export const handleWrongId = (res: http.ServerResponse) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      message: 'User ID is invalid. Provide valid ID',
    })
  );
};

export const handleWrongEndpoint = (res: http.ServerResponse) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      message: 'Endpoint Not Found: Please use the api/users endpoint',
    })
  );
};
