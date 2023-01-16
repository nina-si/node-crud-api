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

export const checkReqDataValid = (rawData: string) => {
  try {
    const reqData = JSON.parse(rawData);
    return (
      'username' in reqData &&
      'age' in reqData &&
      'hobbies' in reqData &&
      typeof reqData.username === 'string' &&
      typeof reqData.age === 'number' &&
      Array.isArray(reqData.hobbies)
    );
  } catch (err) {
    return false;
  }
};
