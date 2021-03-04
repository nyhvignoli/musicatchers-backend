import { SignupInputDTO } from "../../src/business/entities/User";
import { UserBusiness } from "../../src/business/UserBusiness";

describe (`Testing 'signup', UserBusiness`, () => {

    test('Should return access token', async () => {
        expect.assertions(9);

        const input: SignupInputDTO = {
            name: "name",
            nickname: "nickname",
            email: "email",
            password: "password"
        };

        const validator = { validateEmptyProperties: jest.fn(), validatePassword: jest.fn() };
        const idGenerator = { generate: jest.fn(() => 'id') };
        const hashManager = { hash: jest.fn(() => 'hashPassword') } as any;
        const userDatabase = { insertUser: jest.fn() } as any;
        const tokenManager = { generateToken: jest.fn(() => 'token') } as any;
        
        const userBusiness = new UserBusiness(
            validator,
            idGenerator,
            hashManager,
            userDatabase,
            tokenManager
        );

        const token = await userBusiness.signup(input);
  
        expect(validator.validateEmptyProperties).toHaveBeenCalled();
        expect(validator.validatePassword).toHaveBeenCalled();
        expect(idGenerator.generate).toHaveBeenCalled();
        expect(idGenerator.generate).toHaveReturnedWith('id');
        expect(hashManager.hash).toHaveBeenCalled();
        expect(hashManager.hash).toHaveReturnedWith('hashPassword');
        expect(tokenManager.generateToken).toHaveBeenCalled();
        expect(tokenManager.generateToken).toHaveReturnedWith('token');
        expect(token).toBe('token');
    });
});