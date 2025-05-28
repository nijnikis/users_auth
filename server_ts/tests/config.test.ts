import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { getUsers } from '../src/controllers/usersController';
import config from '../src/config/config';


// import mongoose from 'mongoose';
// import app from './app';
// import config from './config/config';

// const start = async () => {
//   try {
//     await mongoose.connect(`mongodb+srv://${config.dbUser}:${config.dbPass}@cluster0.aopuzcc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
//     app.listen(config.port, () => console.log(`server started on port: ${config.port}`));
//   } catch (error) {
//     console.log('start error:', error);
//   }
// }

// start();

// describe('Users Controller', () => {
//     // beforeEach((): void => {
//     //   jest.setTimeout(60000);
//     // });
//   it('call controller', async () => {
//     // await mongoose.connect
//     const req = {} as Request;
//     const res = {
//       json: jest.fn(),
//     } as unknown as Response;
//     // const res = {} as unknown as Response;

//     // const response = await getUsers(req, res, jest.fn());
//     await getUsers(req, res, jest.fn());
//     // expect(response)
//     expect(res.json).toHaveBeenCalledWith([]);
//     // expect(res.json).toHaveBeenCalled();
//     // expect(response).toBe([]);
//   }, 10000);
// });

describe('Test config port', () => {
  it('port', async () => {
    expect(config.port).toBe(5000);
  });
});