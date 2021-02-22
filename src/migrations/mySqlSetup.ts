import { BaseDatabase } from '../data/BaseDatabase';

export class MySqlSetup extends BaseDatabase {

    public static USER_TABLE = 'musicatchers_users';
    public static MUSIC_TABLE = 'musicatchers_musics';
    public static GENRE_TABLE = 'musicatchers_genres';

    public static createTables = async (): Promise<void> => {
        try {
            await BaseDatabase.connection.raw(`
                CREATE TABLE IF NOT EXISTS ${MySqlSetup.USER_TABLE} (
                    id VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    nickname VARCHAR(255) NOT NULL UNIQUE,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL
                );
            `);

            await BaseDatabase.connection.raw(`
                CREATE TABLE IF NOT EXISTS ${MySqlSetup.MUSIC_TABLE} (
                    id VARCHAR(255) PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    author VARCHAR(255) NOT NULL,
                    date DATE NOT NULL,
                    file VARCHAR(255) NOT NULL,
                    genre VARCHAR(255) NOT NULL,
                    album VARCHAR(255) NOT NULL,
                    user_id VARCHAR(255) NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES ${MySqlSetup.USER_TABLE}(id)
                );
            `);

            await BaseDatabase.connection.raw(`
                CREATE TABLE IF NOT EXISTS ${MySqlSetup.GENRE_TABLE} (
                    id VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    music_id VARCHAR(255) NOT NULL,
                    FOREIGN KEY (music_id) REFERENCES ${MySqlSetup.MUSIC_TABLE}(id)
                );
            `);

            console.log('MySQL setup completed!');
        } catch (error) {
            console.log(error.message);
        } finally {
            BaseDatabase.destroyConnection();
        };
    };
};

MySqlSetup.createTables();