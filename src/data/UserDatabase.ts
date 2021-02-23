import { User } from "../business/entities/User";
import { MySqlError } from "../business/error/MySqlError";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    public createUser = async (
        user: User
    ) : Promise<void> => {
        try {
            await BaseDatabase.connection(BaseDatabase.USER_TABLE)
            .insert({
                id: user.id,
                name: user.name,
                email: user.email,
                nickname: user.nickname,
                password: user.password                
            });
        } catch (error) {
            const errorInfo = MySqlError.sqlErrorHandler(error.message);
            throw new MySqlError(errorInfo.statusCode, errorInfo.message);
        };
    };
};