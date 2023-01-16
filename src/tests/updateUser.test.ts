import request from 'supertest';
import { IUser } from '../interfaces';
import server from '../server';

let userId: string;
const testUser = { username: 'Test Lvov', age: 30, hobbies: [] };
const updatedData = { username: 'New Name' };

describe('update created user', () => {
  it('should update existing user', async () => {
    const newUser = await request(server).post('/api/users').send(testUser);
    userId = newUser.body.id as string;
    const res = await request(server)
      .put(`/api/users/${userId}`)
      .send(updatedData);
    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual(updatedData.username);
    expect(res.body.age).toEqual(testUser.age);
    expect(res.body.hobbies).toEqual(testUser.hobbies);
  });

  it('should update data in db', async () => {
    const db = require('../data.json');
    const userEntry = db.filter((entry: IUser) => entry.id === userId)[0];
    expect(userEntry.username).toEqual(updatedData.username);
    expect(userEntry.age).toEqual(testUser.age);
    expect(userEntry.hobbies).toEqual(testUser.hobbies);
  });

  it('should return created user', async () => {
    const res = await request(server).get(`/api/users/${userId}`).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual(updatedData.username);
    expect(res.body.age).toEqual(testUser.age);
    expect(res.body.hobbies).toEqual(testUser.hobbies);
  });
});
