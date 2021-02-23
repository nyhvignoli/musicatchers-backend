import { BaseError } from "../business/error/BaseError";

export class Validator {

    public validateEmptyProperties = (input: any) => {
        for (const key in input) {
            if (input[key] !== false && !input[key]) {
                throw new BaseError(422, `The field '${key}' is missing`);
            };
        };
    };

    public validatePassword = (password: string) => { 
        if (password.length < 6) {
            throw new BaseError(406, "Password must be at least 6 characters in length");
        };
    };    
};