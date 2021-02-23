import { Music } from "../business/entities/Music";
import { MySqlError } from "../business/error/MySqlError";
import { BaseDatabase } from "./BaseDatabase";

export class MusicDatabase extends BaseDatabase {

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
};