import { AuthData, UserOutputDTO } from "../../src/business/entities/User";
import { UserBusiness } from "../../src/business/UserBusiness";

describe (`Testing 'getCurrentUser', UserBusiness`, () => {

    test(`Should return user info`, async () => {
        expect.assertions(3);

        const validator = { } as any;
        const idGenerator = { } as any;
        const hashManager = { } as any;

        const user: UserOutputDTO = {
            id: 'id',
            name: 'name',
            nickname: 'nickname',
            email: 'email'
        };

        const userDatabase = { 
            selectUserByProperty: jest.fn(async (): Promise<UserOutputDTO> => user )
        } as any;

        const userData: AuthData = { id: 'id' };
        const tokenManager = { getTokenData: jest.fn((token) => userData ) } as any;

        const userBusiness = new UserBusiness(
            validator,
            idGenerator,
            hashManager,
            userDatabase,
            tokenManager
        );
        
        const output: UserOutputDTO = await userBusiness.getCurrentUser('token');

        expect(tokenManager.getTokenData).toHaveBeenCalled();
        expect(tokenManager.getTokenData).toHaveReturnedWith(userData);
        expect(output).toEqual(user);
    });
});