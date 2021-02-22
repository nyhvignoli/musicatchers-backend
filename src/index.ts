import cors from 'cors';
import express, { Express } from 'express';
import { AddressInfo } from 'net';
import { userRouter } from './controller/router/userRouter';

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);

const server = app.listen(3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.log(`Failure upon running server`);
    };
});