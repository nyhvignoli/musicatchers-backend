import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class TokenManager {
    private defaultExpiresIn: string | number = isNaN(Number(process.env.JWT_EXPIRES_IN)) ? process.env.JWT_EXPIRES_IN! : Number(process.env.JWT_EXPIRES_IN)

    public generateToken = (
        input: AuthData,
        expiresIn: string | number = this.defaultExpiresIn
    ): string => {
        return jwt.sign(
            input,
            process.env.JWT_KEY as string,
            { expiresIn }
        );
    };

    public getTokenData = (
        token: string
    ): AuthData => {
        const payload = jwt.verify(
            token, process.env.JWT_KEY as string
        ) as AuthData;

        return {
            id: payload.id
        };
    };
};

export interface AuthData {
    id: string
};

export default new TokenManager();