import { SignupInputDTO } from "../../src/business/entities/User";
import { UserBusiness } from "../../src/business/UserBusiness";
import { HashManager } from "../../src/services/HashManager";
import { IdGenerator } from "../../src/services/IdGenerator";
import { TokenManager } from "../../src/services/TokenManager";
import { Validator } from "../../src/services/Validator";

describe (`Testing 'signup', UserBusiness`, () => {

    let validator = { } as Validator;
    let idGenerator = { } as IdGenerator;
    let hashManager = { } as any;
    let userDatabase = { } as any;
    let tokenManager = { } as any;

    test('Should return access token', async () => {
        expect.assertions(2);

        const input: SignupInputDTO = {
            name: "name",
            nickname: "nickname",
            email: "email",
            password: "password"
        };

        validator = { validateEmptyProperties: jest.fn(), validatePassword: jest.fn() };
        idGenerator = { generate: jest.fn(() => 'id') };
        hashManager = { hash: jest.fn(() => 'hashPassword') };
        userDatabase = { insertUser: jest.fn() };
        tokenManager = { generateToken: jest.fn(() => 'token') };
        
        const userBusiness = new UserBusiness(
            validator,
            idGenerator,
            hashManager,
            userDatabase,
            tokenManager
        );

        await userBusiness.signup(input);
  
        expect(validator.validateEmptyProperties).toHaveBeenCalled();
        expect(validator.validatePassword).toHaveBeenCalled();
    });
});