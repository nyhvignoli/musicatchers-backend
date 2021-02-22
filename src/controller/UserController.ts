import { Request, Response } from 'express';
import { SignupInputDTO } from '../business/entities/User';
import { UserBusiness } from '../business/UserBusiness';
import { UserDatabase } from '../data/UserDatabase';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';

const userBusiness = new UserBusiness(
    new IdGenerator(),
    new HashManager(),
    new TokenManager(),
    new UserDatabase()
);

export class UserController {
    public signup = async (req: Request, res: Response) => {
        try {
            const input: SignupInputDTO = {
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password,
            }

            const token: string = await userBusiness.signup(input);
            res.status(200).send({ token });

        } catch (error) {
            res.status(400)
                .send(error.message)
        };
    };
};