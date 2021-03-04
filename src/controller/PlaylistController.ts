import { Request, Response } from 'express';
import { AddTrackInputDTO, PlaylistInputDTO } from '../business/entities/Playlist';
import { PlaylistBusiness } from '../business/PlaylistBusiness';
import { MusicDatabase } from '../data/MusicDatabase';
import { PlaylistDatabase } from '../data/PlaylistDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { Validator } from '../services/Validator';

const playlistBusiness = new PlaylistBusiness(
    new Validator(),
    new IdGenerator(),
    new TokenManager(),
    new PlaylistDatabase(),
    new MusicDatabase()
);

export class PlaylistController {

    public createPlaylist = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const token: string = req.headers.authorization!;
            const input: PlaylistInputDTO = {
                name: req.body.name,
                description: req.body.description
            };

            await playlistBusiness.createPlaylist(token, input);

            res.status(201).send('Playlist created successfuly');
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send(error.message);
        };
    };

    public addTrackToPlaylist = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const token: string = req.headers.authorization!;
            const input: AddTrackInputDTO = {
                id: req.params.id,
                playlistId: req.params.playlistId
            };

            await playlistBusiness.addTrackToPlaylist(token, input);

            res.status(200).send('Track added successfuly');
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send(error.message);
        };
    };

    public getUserPlaylists = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const token: string = req.headers.authorization!;
            const result = await playlistBusiness.getUserPlaylists(token);

            res.status(200).send(result);
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send(error.message);
        };
    };
};