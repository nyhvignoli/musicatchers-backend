import { Playlist } from "../business/entities/Playlist";
import { MySqlError } from "../business/error/MySqlError";
import { BaseDatabase } from "./BaseDatabase";

export class PlaylistDatabase extends BaseDatabase {

    private static toPlaylistModel = (playlist: any) => {
        return playlist && new Playlist(
            playlist.id,
            playlist.name,
            playlist.description,
            playlist.date,
            playlist.user_id
        );
    };

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

    public selectPlaylistById = async (
        id: string,
        userId: string
    ) => {
        try {
            const result = await BaseDatabase.connection(BaseDatabase.PLAYLIST_TABLE)
                .select('*')
                .where({ id })
                .and
                .where({ user_id: userId });

            return PlaylistDatabase.toPlaylistModel(result[0]);    

        } catch (error) {
            throw new MySqlError(500, error.message);
        };
    };

    public insertTrackIntoPlaylist = async (
        id: string,
        playlistId: string
    ) => {
        try {
            await BaseDatabase.connection(BaseDatabase.PLAYLIST_MUSIC_TABLE)
                .insert({
                    playlist_id: playlistId,
                    music_id: id
                });

        } catch (error) {
            throw new MySqlError(500, error.message);
        };
    };
};