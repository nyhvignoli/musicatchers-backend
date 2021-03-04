import { Validator } from "../../src/services/Validator";

describe(`Testing 'validatePassword', Validator`, () => {
    test(`Should return 406 error for password length lesser than 6 characters`, () => {
        expect.assertions(2);

        try {
            const password: string = '12345';
            const validator = new Validator();
            validator.validatePassword(password);

        } catch (error) {
            expect(error.statusCode).toBe(406);
            expect(error.message).toEqual(`Password must be at least 6 characters in length`);
        };
    });
});