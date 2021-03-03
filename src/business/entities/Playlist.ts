import { Music } from "./Music";

export class Playlist {
    constructor (
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly data: Date,
        private musics: Music[]
    ) { }

    public getMusics = () => this.musics;

    public setMusics = (musics: Music[]) => {
        this.musics = musics;
    };
};