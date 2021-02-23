import express from 'express';
import { MusicController } from '../MusicController';

export const musicRouter = express.Router();
const musicController = new MusicController();

musicRouter.post('/', musicController.createMusic);
musicRouter.get('/', musicController.getMusics);
musicRouter.get('/:id', musicController.getMusicById);