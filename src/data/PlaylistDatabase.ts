import { MusicOutputDTO } from "../business/entities/Music";
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

    public static toMusicOutputDTO = (music: any): MusicOutputDTO => {
        return music && {
            id: music.id,
            title: music.title,
            author: music.author,
            createdAt: music.date
        };
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
                    date: playlist.createdAt,
                    user_id: playlist.userId
                });

        } catch(error) {
            throw new MySqlError(500, error.message);
        };
    };

    public selectUserPlaylists = async (
        userId: string
    ): Promise<Playlist[]> => {
        try {
            const result = await BaseDatabase.connection(BaseDatabase.PLAYLIST_TABLE)
                .select('*')
                .where({ user_id: userId });

            const playlists: Playlist[] = [];    

            for (let playlist of result) {
                playlists.push(PlaylistDatabase.toPlaylistModel(playlist));
            };
            
            return playlists;   

        } catch (error) {
            throw new MySqlError(500, error.message);
        };
    };

    public selectPlaylistById = async (
        id: string,
        userId: string
    ): Promise<Playlist> => {
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
        musicId: string,
        playlistId: string
    ): Promise<void> => {
        try {
            await BaseDatabase.connection(BaseDatabase.PLAYLIST_MUSIC_TABLE)
                .insert({
                    playlist_id: playlistId,
                    music_id: musicId
                });

        } catch (error) {
            throw new MySqlError(500, error.message);
        };
    };

    public selectPlaylistTracks = async (
        playlistId: string,
        userId: string
    ) => {
        try {
            const result = await BaseDatabase.connection(BaseDatabase.MUSIC_TABLE)
                .join(`${BaseDatabase.PLAYLIST_MUSIC_TABLE}`, 'music_id', 'id' )
                .select('id', 'title', 'author', 'date')
                .where({ playlist_id: playlistId })
                .and
                .where({user_id: userId });

            const musics: MusicOutputDTO[] = [];  

            for (let music of result) {
                musics.push(PlaylistDatabase.toMusicOutputDTO(music))
            };

            return musics;   

        } catch (error) {
            throw new MySqlError(500, error.message);
        };
    };
};