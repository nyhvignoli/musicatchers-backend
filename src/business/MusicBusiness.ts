import { MusicDatabase } from "../data/MusicDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { Validator } from "../services/Validator";
import { Genre, Music, MusicInputDTO, MusicOutputDTO } from "./entities/Music";
import { AuthData } from "./entities/User";
import { BaseError } from "./error/BaseError";

export class MusicBusiness {
    constructor (
        private tokenManager: TokenManager,
        private validator: Validator,
        private idGenerator: IdGenerator,
        private musicDatabase: MusicDatabase        
    ) { }

    public createMusic = async (
        token: string,
        input: MusicInputDTO
    ): Promise<Music> => {
        try {
            const userData: AuthData = this.tokenManager.getTokenData(token);
            const { title, author, file, genre, album } = input;
            this.validator.validateEmptyProperties(input);

            const id: string = this.idGenerator.generate();
            const date: Date = new Date();
            const genres: Genre[] = genre.map((genre) => {
                return {
                    id: this.idGenerator.generate(),
                    name: genre
                }
            });

            const music: Music = new Music(
                id,
                title,
                author,
                date,
                file,
                genres,
                album,
                userData.id
            );

            await this.musicDatabase.insertMusic(music);
            return music;

        } catch (error) {
            throw new BaseError(error.statusCode, error.message);
        };
    };

    public getMusics = async (
        token: string
    ): Promise<MusicOutputDTO[]> => {
        try {
            const userData: AuthData = this.tokenManager.getTokenData(token);
            const musics = await this.musicDatabase.selectMusicsByUser(userData.id);

            if (!musics) {
                throw new BaseError(404, "Musics not found");
            };

            const musicsOutputDTO = musics.map((music) => {
                const genres = music.getGenre().map(genre => genre.name);
                return {
                    id: music.id,
                    title: music.title,
                    author: music.author,
                    createdAt: music.date,
                    file: music.file,
                    genre: genres,
                    album: music.album,
                    userId: music.userId,
                };
            });
            
            return musicsOutputDTO;

        } catch (error) {
            throw new BaseError(error.statusCode, error.message);
        };
    };
};