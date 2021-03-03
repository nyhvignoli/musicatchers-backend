import { Request, Response } from 'express';
import { PlaylistInputDTO } from '../business/entities/Playlist';
import { PlaylistBusiness } from '../business/PlaylistBusiness';
import { PlaylistDatabase } from '../data/PlaylistDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { Validator } from '../services/Validator';

const playlistBusiness = new PlaylistBusiness(
    new Validator(),
    new IdGenerator(),
    new TokenManager(),
    new PlaylistDatabase()
);

export class PlaylistController {

    public createPlaylist = async (
        req: Request,
        res: Response
    ) => {
        try {
            const token: string = req.headers.authorization!;
            const input: PlaylistInputDTO = {
                name: req.body.name,
                description: req.body.description
            };

            await playlistBusiness.createPlaylist(token, input);

            res.status(201).send('Success');
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send(error.message);
        };
    };
};