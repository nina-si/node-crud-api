import http from 'http';
import { IUser } from './interfaces';

let db: IUser[] = require('./data.json');

export const getUsers = (res: http.ServerResponse) => {
  try {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db));
  } catch (err) {
    console.log(err);
  }
};
