import { v4 as uuidv4 } from 'uuid';
import { IUser } from './interfaces';
import { writeFile } from './utils';

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

export const createUser = async (user: IUser) => {
  return new Promise(async (resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    db.push(newUser);
    await writeFile('./data.json', JSON.stringify(db));
    resolve(newUser);
  });
};
