import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { Validator } from "../services/Validator";
import { AuthData, SignupInputDTO, User } from "./entities/User";

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
            throw new Error(error.message);
        };
    };
};