import { Request, Response } from 'express';
import { SignupInputDTO } from '../business/entities/User';
import { UserBusiness } from '../business/UserBusiness';
import { UserDatabase } from '../data/UserDatabase';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { Validator } from '../services/Validator';

const userBusiness = new UserBusiness(
    new Validator(),
    new IdGenerator(),
    new HashManager(),
    new UserDatabase(),
    new TokenManager(),    
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
            res
                .status(error.statusCode || 400)
                .send({ message: error.message });
        };
    };
};