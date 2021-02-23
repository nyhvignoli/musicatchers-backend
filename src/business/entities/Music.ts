export class Music {
    constructor (
        public readonly id: string,
        public readonly title: string,
        public readonly author: string,
        public readonly date: Date,
        public readonly file: string,
        private genre: Genre[],
        public readonly album: string,
        public readonly userId: string
    ) { }

    public getGenre() {
        return this.genre;
    };

    public setGenre(genre: Genre[]) {
        this.genre = genre;
    };
};

export interface MusicInputDTO {
    title: string,
    author: string,
    file: string,
    genre: string[],
    album: string
};

export interface Genre {
    id: string,
    name: string
};