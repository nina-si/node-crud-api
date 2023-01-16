import request from 'supertest';
import server from '../server';

let userId: string;
const testUser = { username: 'Test Piotrovich', age: 40, hobbies: ['coding'] };

describe('create new user', () => {
  it('should create user', async () => {
    const res = await request(server).post('/api/users').send(testUser);
    userId = res.body.id as string;
    expect(res.statusCode).toEqual(201);
    expect(res.body.username).toEqual(testUser.username);
    expect(res.body.age).toEqual(testUser.age);
    expect(res.body.hobbies).toEqual(testUser.hobbies);
  });
});

describe('fetch user by id', () => {
  it('should return created user', async () => {
    const res = await request(server).get(`/api/users/${userId}`).send();

    expect(res.statusCode).toEqual(200);
    expect(res.body.username).toEqual(testUser.username);
    expect(res.body.age).toEqual(testUser.age);
    expect(res.body.hobbies).toEqual(testUser.hobbies);
  });
});
