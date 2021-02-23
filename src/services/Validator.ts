export class Validator {

    public validateEmptyProperties = (input: any) => {
        for (const key in input) {
            if (input[key] !== false && !input[key]) {
                throw new Error(`The field '${key}' is missing`);
            };
        };
    };

    public validatePassword = (password: string) => { 
        if (password.length < 6) {
            throw new Error("Password must be at least 6 characters in length");
        };
    };    
};