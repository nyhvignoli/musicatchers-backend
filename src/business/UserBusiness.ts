import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { Validator } from "../services/Validator";
import { AuthData, LoginInputDTO, SignupInputDTO, User } from "./entities/User";
import { BaseError } from "./error/BaseError";

export class UserBusiness {
    constructor (
        private validator: Validator,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private userDatabase: UserDatabase,
        private tokenManager: TokenManager,
    ) { }

    public signup = async (
        input: SignupInputDTO
    ): Promise<string> => {
        try {
            const { name, nickname, email, password } = input;
            this.validator.validateEmptyProperties(input);
            this.validator.validatePassword(password);

            const id: string = this.idGenerator.generate();
            const cypherPassword: string = this.hashManager.hash(password);
            const user: User = new User(
                id,
                name,
                nickname, 
                email, 
                cypherPassword
            );

            await this.userDatabase.createUser(user);

            const userData: AuthData = { id }
            const token: string = this.tokenManager.generateToken(userData);

            return token;
        } catch (error) {
            throw new BaseError(error.statusCode, error.message);
        };
    };

    public login = async (
        input: LoginInputDTO
    ): Promise<string> => {
        try {
            const { email, password } = input;
            this.validator.validateEmptyProperties(input);
            this.validator.validatePassword(password);

            const user: User = await this.userDatabase.selectUserByProperty("email", email);

            if (!user) {
                throw new BaseError(404, 'User not found');
            };

            const passwordIsCorrect: boolean = this.hashManager.compare(
                password, user.password
            );

            if (!passwordIsCorrect) {
                throw new BaseError(401, 'Incorrect password');
            };

            const userData: AuthData = { id: user.id };
            const token: string = this.tokenManager.generateToken(userData);

            return token;
        } catch (error) {
            throw new BaseError(error.statusCode, error.message);
        };
    };
};