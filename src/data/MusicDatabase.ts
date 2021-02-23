import { Genre, Music } from "../business/entities/Music";
import { MySqlError } from "../business/error/MySqlError";
import { BaseDatabase } from "./BaseDatabase";

export class MusicDatabase extends BaseDatabase {

    private static toMusicModel = (music: any, genres: Genre[]): Music => {
        return music && new Music(
            music.id,
            music.title,
            music.author,
            music.date,
            music.file,
            genres,
            music.album,
            music.user_id
        );
    };

    public insertMusic = async (
        music: Music
    ) => {
        try {
            await BaseDatabase.connection(BaseDatabase.MUSIC_TABLE)
            .insert({
                id: music.id,
                title: music.title,
                author: music.author,
                date: music.date,
                file: music.file,
                album: music.album,
                user_id: music.userId
            });

            for (let genre of music.getGenre()) {
                await BaseDatabase.connection(BaseDatabase.GENRE_TABLE)
                .insert({
                    id: genre.id,
                    name: genre.name
                });

                await BaseDatabase.connection(BaseDatabase.MUSIC_GENRE_TABLE)
                .insert({
                    music_id: music.id,
                    genre_id: genre.id
                });
            };
            
        } catch (error) {
            throw new MySqlError(500, error.message);
        };
    };

    public selectMusicsByUser = async (
        userId: string
    ): Promise<Music[]> => {
        try {
            const musicResult = await BaseDatabase.connection(BaseDatabase.MUSIC_TABLE)
                .select('*')
                .where({ user_id: userId });

            const musics: Music[] = [];  

            for (let music of musicResult) {
                const genreResult = await BaseDatabase.connection.raw(`
                    SELECT genre_id as id, name
                    FROM ${BaseDatabase.MUSIC_TABLE}
                    JOIN ${BaseDatabase.MUSIC_GENRE_TABLE}
                    ON ${BaseDatabase.MUSIC_GENRE_TABLE}.music_id = ${BaseDatabase.MUSIC_TABLE}.id
                    JOIN ${BaseDatabase.GENRE_TABLE}
                    ON ${BaseDatabase.GENRE_TABLE}.id = ${BaseDatabase.MUSIC_GENRE_TABLE}.genre_id
                    WHERE ${BaseDatabase.MUSIC_TABLE}.id = '${music.id}'
                `);

                const genres: Genre[] = [];
                for (let genre of genreResult[0]) {
                    genres.push({ 
                        id: genre.id,
                        name: genre.name 
                    });
                };

                musics.push(MusicDatabase.toMusicModel(musicResult[0], genres));

            };  

            return musics;
        } catch (error) {
            throw new MySqlError(500, error.message);
        };
    };
};