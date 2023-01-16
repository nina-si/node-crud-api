import request from 'supertest';
import server from '../server';
import { clearUsersDatabase } from '../utils';

beforeAll(async () => {
  return await clearUsersDatabase();
});

describe('fetch empty users-list', () => {
  it('should return empty users-list', async () => {
    const db = require('../data.json');
    const res = await request(server).get('/api/users').send();
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(db);
    expect(res.body.length === 0);
  });
});
