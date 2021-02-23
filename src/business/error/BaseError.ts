export class BaseError extends Error {
    constructor (
        public readonly statusCode: number = 400,
        public message: string
    ) {
        super(message);
    };
};