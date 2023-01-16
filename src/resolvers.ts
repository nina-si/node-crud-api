import http from 'http';
import { createUser, fetchUsers, findUser } from './userModel';
import { checkReqDataValid, getReqBody } from './utils';

export const getUsers = async (res: http.ServerResponse) => {
  try {
    const users = await fetchUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
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

export const addNewUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  const body = (await getReqBody(req)) as string;

  if (checkReqDataValid(body)) {
    const { username, age, hobbies } = JSON.parse(body);

    const newUser = await createUser({ username, age, hobbies });

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newUser));
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message:
          'Request body data is not valid. Check if all required fields are correct',
      })
    );
  }
};

export const handleWrongEndpoint = (res: http.ServerResponse) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      message: 'Endpoint Not Found: Please use the api/users endpoint',
    })
  );
};
