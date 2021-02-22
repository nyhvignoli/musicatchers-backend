import { User } from "../business/entities/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public createUser = async (user: User) : Promise<void> => {
        await BaseDatabase.connection(BaseDatabase.USER_TABLE)
        .insert({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password                
        });
    };
};