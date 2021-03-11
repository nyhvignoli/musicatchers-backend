import { Genre } from "../business/entities/Music";
import { MySqlError } from "../business/error/MySqlError";
import { BaseDatabase } from "./BaseDatabase";

export class GenreDatabase extends BaseDatabase {

    private static toGenreModel = (genre: any ): Genre => {
        return genre && {
            id: genre.id,
            name: genre.name,
        };
    };

    public insertMusicGenres = async (
        genres: Genre[],
        musicId: string
    ): Promise<void> => {
        try {
            for (let genre of genres) {
                await BaseDatabase.connection(BaseDatabase.GENRE_TABLE)
                .insert({
                    id: genre.id,
                    name: genre.name
                });

                await BaseDatabase.connection(BaseDatabase.MUSIC_GENRE_TABLE)
                .insert({
                    music_id: musicId,
                    genre_id: genre.id
                });
            };
            
        } catch (error) {
            throw new MySqlError(500, error.message);
        };
    };

    public selectAllGenres = async (): Promise<string[]> => {
        try {
            const result = await BaseDatabase.connection(BaseDatabase.GENRE_TABLE)
                .distinct("name");

            const genres: string[] = [];

            for (let genre of result) {
                result && genres.push(genre.name);
            };
            
            return genres;
        } catch (error) {
            throw new MySqlError(500, error.message);
        };
    };

    public selectGenreByMusic = async (
        musicId: string
    ): Promise<Genre[]> => {
        try {
            const genreResult = await BaseDatabase.connection.raw(`
                SELECT genre_id as id, name
                FROM ${BaseDatabase.GENRE_TABLE}
                JOIN ${BaseDatabase.MUSIC_GENRE_TABLE}
                ON ${BaseDatabase.GENRE_TABLE}.id = ${BaseDatabase.MUSIC_GENRE_TABLE}.genre_id
                WHERE ${BaseDatabase.MUSIC_GENRE_TABLE}.music_id = '${musicId}';
            `);

            const genres: Genre[] = [];
            
            for (let genre of genreResult[0]) {
                genres.push(GenreDatabase.toGenreModel(genre));
            };

            return genres;
        } catch (error) {
            throw new MySqlError(500, error.message);
        };
    };
};