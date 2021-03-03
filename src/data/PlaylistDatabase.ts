import { Playlist } from "../business/entities/Playlist";
import { MySqlError } from "../business/error/MySqlError";
import { BaseDatabase } from "./BaseDatabase";

export class PlaylistDatabase extends BaseDatabase {

    public insertPlaylist = async (
        playlist: Playlist
    ) => {
        try {
            await BaseDatabase.connection(BaseDatabase.PLAYLIST_TABLE)
                .insert({
                    id: playlist.id,
                    name: playlist.name,
                    description: playlist.description,
                    date: playlist.date,
                    user_id: playlist.userId
                });
                
        } catch(error) {
            throw new MySqlError(500, error.message);
        };
    };
};