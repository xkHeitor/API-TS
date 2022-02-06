import AuthService from "@src/app/services/auth";
import { StatusCodes } from "@src/app/types/status-codes";
import { authMiddleware } from "../auth";

describe('AuthMiddleware', () => {

    const sendMock = jest.fn();
    const nextFake = jest.fn();

    it('Should verify a JWT token and call the next middleware', () => {
        const jwtToken = AuthService.generateToken({ data: 'fakeData' });
        const reqFake = { headers: { token: jwtToken } };
        const resFake = {};

        authMiddleware(reqFake, resFake, nextFake);
    });

    it('Should return UNAUTHORIZED if there is a problem on the token verification', () => {
        const reqFake = { headers: { token: 'Invalid' } };
        const resFake = { status: jest.fn(() => ({ send: sendMock })) };

        authMiddleware(reqFake, resFake as object, nextFake);
        expect(resFake.status).toHaveBeenCalledWith(StatusCodes.Unauthorized);
        console.log(resFake.status)
        expect(sendMock).toHaveBeenCalledWith({ code: StatusCodes.Unauthorized, error: 'jwt malformed' });
    });

});