import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class UserBusiness {
    constructor (
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private tokenManager: TokenManager,
        private userDatabase: UserDatabase
    ) { }

    public signup = async () => {
        
    };
};