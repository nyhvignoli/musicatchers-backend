import { Request, Response } from 'express';
import { SignupInputDTO } from '../business/entities/User';

export class UserController {
    public signup = async (req: Request, res: Response) => {
        try {
            const input: SignupInputDTO = {
                name: req.body.name,
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password,
            }

        } catch (error) {
            res.status(400)
                .send(error.message)
        };
    };
};