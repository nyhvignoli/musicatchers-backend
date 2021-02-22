import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { AuthData, SignupInputDTO, User } from "./entities/User";

export class UserBusiness {
    constructor (
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager,
        private userDatabase: UserDatabase
    ) { }

    public signup = async (
        input: SignupInputDTO
    ): Promise<string> => {
        try {
            const { name, nickname, email, password } = input;

            if ( !name || !nickname || !email || !password ) {
                throw new Error('Missing inputs');
            };

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