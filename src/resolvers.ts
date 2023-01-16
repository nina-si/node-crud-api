import http from 'http';
import { MESSAGES } from './constants';
import { IUser } from './interfaces';
import {
  createUser,
  deleteEntry,
  fetchUsers,
  findUser,
  updateEntry,
} from './userModel';
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
      res.end(JSON.stringify({ message: MESSAGES.USER_NOT_FOUND_MSG }));
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
      message: MESSAGES.INVALID_ID_MSG,
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
        message: MESSAGES.INVALID_POST_DATA_MSG,
      })
    );
  }
};

export const updateUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  userId: string
) => {
  const user = (await findUser(userId)) as IUser;

  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: MESSAGES.USER_NOT_FOUND_MSG }));
  } else {
    try {
      const body = (await getReqBody(req)) as string;
      const bodyData = await JSON.parse(body);
      const updatedUserData = {
        username:
          bodyData.username && typeof bodyData.username === 'string'
            ? bodyData.username
            : user.username,
        age:
          bodyData.age && typeof bodyData.age === 'number'
            ? bodyData.age
            : user.age,
        hobbies:
          bodyData.hobbies &&
          Array.isArray(bodyData.hobbies) &&
          bodyData.hobbies.every((hobby) => typeof hobby === 'string')
            ? bodyData.hobbies
            : user.hobbies,
      };
      const updatedUser = await updateEntry(userId, updatedUserData);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedUser));
    } catch (err) {
      console.log('Error info: ', err.message);
      return handleServerError(res, err.message || '');
    }
  }
};

export const deleteUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  userId: string
) => {
  const user = (await findUser(userId)) as IUser;

  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: MESSAGES.USER_NOT_FOUND_MSG }));
  } else {
    try {
      await deleteEntry(userId);
      res.writeHead(204);
      res.end();
    } catch (err) {
      console.log('Error info: ', err.message);
      return handleServerError(res, err.message || '');
    }
  }
};

export const handleWrongEndpoint = (res: http.ServerResponse) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      message: MESSAGES.WRONG_ENDPOINT_MSG,
    })
  );
};

export const handleServerError = (
  res: http.ServerResponse,
  msg: string = ''
) => {
  const errorText = !!msg.length
    ? `${MESSAGES.SERVER_ERROR_MSG}. Details: ${msg}`
    : MESSAGES.SERVER_ERROR_MSG;
  res.writeHead(500, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      message: errorText,
    })
  );
};
