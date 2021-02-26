import { Genre, Music } from "../business/entities/Music";
import { MySqlError } from "../business/error/MySqlError";
import { BaseDatabase } from "./BaseDatabase";
import { GenreDatabase } from "./GenreDatabase";

export class MusicDatabase extends BaseDatabase {

    private genreDatabase = new GenreDatabase();

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

            for (let genre of music.getGenres()) {
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
            const musicResult = await BaseDatabase.connection()
                .select('*')
                .from(BaseDatabase.MUSIC_TABLE)
                .where({ user_id: userId });

            const musics: Music[] = []; 

            for (let music of musicResult) {
                const genres = await this.genreDatabase.selectGenreByMusic(music.id);
                musics.push(MusicDatabase.toMusicModel(music, genres));
            };  

            return musics;
        } catch (error) {
            throw new MySqlError(500, error.message);
        };
    };

    public selectMusicById = async (
        id: string
    ): Promise<Music> => {
        try {
            const musicResult = await BaseDatabase.connection(BaseDatabase.MUSIC_TABLE)
                .select('*')
                .where({ id });

            const genres = await this.genreDatabase.selectGenreByMusic(id);    

            return MusicDatabase.toMusicModel(musicResult[0], genres);

        } catch (error) {
            throw new MySqlError(500, error.message);
        };
    };
};