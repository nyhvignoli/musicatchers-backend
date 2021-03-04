import { LoginInputDTO, User } from "../../src/business/entities/User";
import { UserBusiness } from "../../src/business/UserBusiness";
import { IdGenerator } from "../../src/services/IdGenerator";

describe (`Testing 'login', UserBusiness`, () => {

    let validator = { validateEmptyProperties: jest.fn(), validatePassword: jest.fn() };
    let idGenerator = { } as IdGenerator;
    let hashManager = { compare: jest.fn(() => true) } as any;
    let userDatabase = { } as any;
    let tokenManager = { generateToken: jest.fn(() => 'token') } as any;

    test(`Should return 'User not found' for non existing email`, async () => {
        expect.assertions(4);
        
        try {
            const input: LoginInputDTO = {
                email: "email",
                password: "password"
            };

            userDatabase = { 
                insertUser: jest.fn(), 
                selectUserByProperty: jest.fn(() => undefined )
            };

            const userBusiness = new UserBusiness(
                validator,
                idGenerator,
                hashManager,
                userDatabase,
                tokenManager
            );
    
            await userBusiness.login(input);

        } catch (error) {
            expect(validator.validateEmptyProperties).toHaveBeenCalled();
            expect(validator.validatePassword).toHaveBeenCalled();
            expect(error.statusCode).toBe(404);
            expect(error.message).toEqual(`User not found`);
        };
    });

    test(`Should return access token`, async () => {
        expect.assertions(7);

        const input: LoginInputDTO = {
            email: "email",
            password: "password"
        };

        userDatabase = { 
            insertUser: jest.fn(), 
            selectUserByProperty: jest.fn(() => new User(
                'id',
                'name',
                'nickname',
                'email',
                'password'
            )) 
        };
        
        const userBusiness = new UserBusiness(
            validator,
            idGenerator,
            hashManager,
            userDatabase,
            tokenManager
        );

        const token = await userBusiness.login(input);
  
        expect(validator.validateEmptyProperties).toHaveBeenCalled();
        expect(validator.validatePassword).toHaveBeenCalled();
        expect(hashManager.compare).toHaveBeenCalled();
        expect(hashManager.compare).toHaveReturnedWith(true);
        expect(tokenManager.generateToken).toHaveBeenCalled();
        expect(tokenManager.generateToken).toHaveReturnedWith('token');
        expect(token).toBe('token');
    });
});