import express from 'express';
import { PlaylistController } from '../PlaylistController';

export const playlistRouter = express.Router();
const playlistController = new PlaylistController();

playlistRouter.put('/', playlistController.createPlaylist);