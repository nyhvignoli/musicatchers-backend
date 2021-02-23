import knex from 'knex';
import Knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export class BaseDatabase {
    protected static USER_TABLE = 'musicatchers_users';
    protected static MUSIC_TABLE = 'musicatchers_musics';
    protected static GENRE_TABLE = 'musicatchers_genres';
    protected static MUSIC_GENRE_TABLE = 'musicatchers_music_genre';

    protected static connection: Knex = knex({
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.PORT || "3306"),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        },
    });

    public static destroyConnection = async () : Promise<void> => {
        await BaseDatabase.connection.destroy();
    };
};