export class Music {
    constructor (
        public readonly id: string,
        public readonly title: string,
        public readonly author: string,
        public readonly createdAt: Date,
        public readonly file: string,
        private genres: Genre[],
        public readonly album: string,
        public readonly userId: string
    ) { }

    public getGenres = () => this.genres;
    
    public setGenres = (genres: Genre[]) => {
        this.genres = genres;
    };
};

export interface Genre {
    id: string,
    name: string
};

export enum Genres {
    POP = "Pop",
    ROCK = "Rock",
    METAL = "Metal",
    INDIE = "Indie",
    ALTERNATIVE = "Alternativo",
    CLASSIC = "Clássica",
    MPB = "MPB",
    RAP = "Rap",
    FUNK = "Funk",
    NEW_WAVE = "New Wave",
    DREAM_POP = "Dream Pop",
};

export interface MusicInputDTO {
    title: string,
    author: string,
    file: string,
    genres: string[],
    album: string
};

export interface MusicOutputDTO {
    id: string,
    title: string,
    author: string,
    createdAt: Date,
    file?: string,
    genres?: string[],
    album?: string,
    userId?: string
};