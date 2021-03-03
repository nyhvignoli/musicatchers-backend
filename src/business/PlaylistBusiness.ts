import { PlaylistDatabase } from "../data/PlaylistDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { Validator } from "../services/Validator";
import { Playlist, PlaylistInputDTO } from "./entities/Playlist";
import { AuthData } from "./entities/User";
import { BaseError } from "./error/BaseError";

export class PlaylistBusiness {
    constructor (
        private validator: Validator,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private playlistDatabase: PlaylistDatabase
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
};