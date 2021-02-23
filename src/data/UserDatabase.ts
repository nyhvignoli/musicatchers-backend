import { User } from "../business/entities/User";
import { MySqlError } from "../business/error/MySqlError";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

    private static toUserModel = (obj: any): User => {
        return obj && new User(
            obj.id,
            obj.name,
            obj.nickname,
            obj.email,
            obj.password
        );
    };

    public insertUser = async (
        user: User
    ): Promise<void> => {
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
            const errorInfo = MySqlError.duplicateEntryHandler(error.message);
            throw new MySqlError(errorInfo.statusCode, errorInfo.message);
        };
    };

    public selectUserByProperty = async (
        key: string,
        value: string
    ): Promise<User> => {
        try {
            const result = await BaseDatabase.connection(BaseDatabase.USER_TABLE)
                .select('*')
                .where(key, value);

            return UserDatabase.toUserModel(result[0]);

        } catch (error) {
            console.log(error.message)
            throw new MySqlError();
        };
    };
};