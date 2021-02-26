import { Genre, Music } from "../business/entities/Music";
import { MySqlError } from "../business/error/MySqlError";
import { BaseDatabase } from "./BaseDatabase";

export class GenreDatabase extends BaseDatabase {

    private static toGenreModel = (genre: any ): Genre => {
        return genre && {
            id: genre.id,
            name: genre.name,
        };
    };

    // public insertMusic = async (
    //     music: Music
    // ) => {
    //     try {
    //         await BaseDatabase.connection(BaseDatabase.MUSIC_TABLE)
    //         .insert({
    //             id: music.id,
    //             title: music.title,
    //             author: music.author,
    //             date: music.date,
    //             file: music.file,
    //             album: music.album,
    //             user_id: music.userId
    //         });

    //         for (let genre of music.getGenres()) {
    //             await BaseDatabase.connection(BaseDatabase.GENRE_TABLE)
    //             .insert({
    //                 id: genre.id,
    //                 name: genre.name
    //             });

    //             await BaseDatabase.connection(BaseDatabase.MUSIC_GENRE_TABLE)
    //             .insert({
    //                 music_id: music.id,
    //                 genre_id: genre.id
    //             });
    //         };
            
    //     } catch (error) {
    //         throw new MySqlError(500, error.message);
    //     };
    // };

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