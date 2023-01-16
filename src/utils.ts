import { promises as fsPromises } from 'fs';
import * as http from 'http';

export const writeFile = async (filePath: string, data: string) => {
  await fsPromises.writeFile(filePath, data);
};

export const getReqBody = async (req: http.IncomingMessage) => {
  return new Promise((resolve, reject) => {
    try {
      let reqBody = '';

      req.on('data', (chunk) => {
        reqBody += chunk.toString();
      });

      req.on('end', () => {
        resolve(reqBody);
      });
    } catch (err) {
      reject(err);
    }
  });
};

export const checkReqDataValid = (rawData: string): boolean => {
  try {
    const reqData = JSON.parse(rawData);
    const isUsernameValid =
      'username' in reqData && typeof reqData.username === 'string';
    const isAgeValid = 'age' in reqData && typeof reqData.age === 'number';
    const isHobbyValid =
      'hobbies' in reqData &&
      Array.isArray(reqData.hobbies) &&
      reqData.hobbies.every((elem) => typeof elem === 'string');
    return isUsernameValid && isAgeValid && isHobbyValid;
  } catch (err) {
    return false;
  }
};
