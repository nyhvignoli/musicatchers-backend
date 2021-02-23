import { Request, Response } from 'express';
import { MusicInputDTO, MusicOutputDTO } from '../business/entities/Music';
import { MusicBusiness } from '../business/MusicBusiness';
import { MusicDatabase } from '../data/MusicDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';
import { Validator } from '../services/Validator';

const musicBusiness = new MusicBusiness(
    new TokenManager(),
    new Validator(),
    new IdGenerator(),
    new MusicDatabase(),  
);

export class MusicController {

    public createMusic = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const token: string = req.headers.authorization!;
            const input: MusicInputDTO = {
                title: req.body.title,
                author: req.body.author,
                file: req.body.file,
                genre: req.body.genre as string[],
                album: req.body.album
            };

            const music = await musicBusiness.createMusic(token, input);

            res.status(201).send({ music });
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ message: error.message });
        };
    };

    public getMusics = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const token: string = req.headers.authorization!;
            const result: MusicOutputDTO[] = await musicBusiness.getMusics(token);

            res.status(200).send(result);
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ message: error.message });
        };
    };

    public getMusicById = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const token: string = req.headers.authorization!;
            const id: string = req.params.id;
            const result = await musicBusiness.getMusicById(token, id);
            
            res.status(200).send(result);
        } catch (error) {
            res
                .status(error.statusCode || 400)
                .send({ message: error.message });
        }
    };
};