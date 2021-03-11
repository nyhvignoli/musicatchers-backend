import { Genre } from '../business/entities/Music';
import { BaseDatabase } from '../data/BaseDatabase';

const genres: Genre[] = [
    { id: "1", name: "Rock" },
    { id: "2", name: "Pop" },
    { id: "3", name: "Rap" },
    { id: "4", name: "MPB" },
    { id: "5", name: "Classic" },
    { id: "6", name: "Alternative" },
    { id: "7", name: "Indie" },
    { id: "8", name: "New Wave" },
    { id: "9", name: "Dream Pop" },
    { id: "10", name: "Reggae" },
    { id: "11", name: "Funk" },
    { id: "12", name: "80's" },
    { id: "13", name: "Punk" },
    { id: "14", name: "Other" },
]

export class GenreTablePopulate extends BaseDatabase {

    public static populate = async (): Promise<void> => {
        try {
            await BaseDatabase.connection(BaseDatabase.GENRE_TABLE)
            .insert(genres);

            console.log('Genre table populate completed!');
        } catch (error) {
            console.log(error.message);
        } finally {
            BaseDatabase.destroyConnection();
        };
    };
};

GenreTablePopulate.populate();