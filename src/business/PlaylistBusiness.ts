import { MusicDatabase } from "../data/MusicDatabase";
import { PlaylistDatabase } from "../data/PlaylistDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { Validator } from "../services/Validator";
import { Music } from "./entities/Music";
import { AddTrackInputDTO, Playlist, PlaylistInputDTO } from "./entities/Playlist";
import { AuthData } from "./entities/User";
import { BaseError } from "./error/BaseError";

export class PlaylistBusiness {
    constructor (
        private validator: Validator,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private playlistDatabase: PlaylistDatabase,
        private musicDatabase: MusicDatabase
    ) { }

    public createPlaylist = async (
        token: string,
        input: PlaylistInputDTO
    ) => {
        try {
            const userData: AuthData = this.tokenManager.getTokenData(token);
            const { name, description } = input;
            this.validator.validateEmptyProperties(input);

            const id: string = this.idGenerator.generate();
            const date: Date = new Date();

            const playlist: Playlist = new Playlist(
                id,
                name,
                description,
                date,
                userData.id
            );

            await this.playlistDatabase.insertPlaylist(playlist);

        } catch (error) {
            throw new BaseError(error.statusCode, error.message);
        };
    };

    public addTrackToPlaylist = async (
        token: string,
        input: AddTrackInputDTO
    ) => {
        try {
            const userData: AuthData = this.tokenManager.getTokenData(token);
            const { id, playlistId } = input;
            this.validator.validateEmptyProperties(input);

            const music: Music = await this.musicDatabase.selectMusicById(
                id,
                userData.id
            );

            if (!music) {
                throw new BaseError(404, 'Music not found');
            };

            const playlist: Playlist = await this.playlistDatabase.selectPlaylistById(
                playlistId, 
                userData.id
            );

            if (!playlist) {
                throw new BaseError(404, 'Playlist not found');
            };

            await this.playlistDatabase.insertTrackIntoPlaylist(id, playlistId);

        } catch (error) {
            throw new BaseError(error.statusCode, error.message);
        };
    };

    public getUserPlaylists = async (
        token: string
    ): Promise<Playlist[]> => {
        try {
            const userData: AuthData = this.tokenManager.getTokenData(token);

            const playlists = await this.playlistDatabase.selectUserPlaylists(userData.id);

            if (!playlists) {
                throw new BaseError(404, 'No playlists for this user');
            };

            return playlists;
        } catch (error) {
            throw new BaseError(error.statusCode, error.message);
        };
    };
};