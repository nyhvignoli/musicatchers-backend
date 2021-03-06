import express from 'express';
import { PlaylistController } from '../PlaylistController';

export const playlistRouter = express.Router();
const playlistController = new PlaylistController();

playlistRouter.get('/', playlistController.getUserPlaylists);
playlistRouter.get('/track/all/:playlistId', playlistController.getPlaylistTracks);
playlistRouter.put('/', playlistController.createPlaylist);
playlistRouter.put('/track', playlistController.addTrackToPlaylist);