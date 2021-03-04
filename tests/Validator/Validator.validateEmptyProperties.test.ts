import { SignupInputDTO } from "../../src/business/entities/User";
import { Validator } from "../../src/services/Validator";

describe (`Testing 'validateEmptyProperties', Validator`, () => {

    const validator = new Validator();
    
    test('Should return 422 error for missing properties', async () => {
        expect.assertions(2);

        const input: SignupInputDTO = {
            name: "",
            nickname: "nickname",
            email: "email",
            password: "password"
        };

        try {
            validator.validateEmptyProperties(input);
    
        } catch (error) {
            expect(error.statusCode).toBe(422);
            expect(error.message).toContain(`The field 'name' is missing`);
        };
    });
});