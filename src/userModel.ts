import { IUser } from './interfaces';

let db = require('./data.json');

export const fetchUsers = async () => {
  return new Promise((resolve) => {
    resolve(db);
  });
};

export const findUser = (id: string) => {
  return new Promise((resolve, reject) => {
    const user = db.find((item: IUser) => item.id === id);
    resolve(user);
  });
};
