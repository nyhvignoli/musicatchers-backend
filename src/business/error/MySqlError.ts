export class MySqlError extends Error {
    constructor (
        public readonly statusCode: number = 500,
        public message: string = "An unexpected error ocurred"
    ) {
        super(message);
    };

    public static sqlErrorHandler = (errorMessage: string) => {
        let message: string = '';

        if (errorMessage.toLowerCase().includes('duplicate entry')) {
            message = 'Email or nickname already registered';
        };

        return { 
            statusCode: 409,
            message
        };
    };
};