import { Developer } from "@src/app/models/developer";
import AuthService from "@src/app/services/auth";
import { StatusCodes } from "http-status-codes";

const routeDeveloper = '/developers';
const standardDev = {
    "nome": "Heitor",
    "senha": "321",
    "sexo": "M",
    "idade": 23,
    "hobby": "Lost ARK",
    "datanascimento": "1998-10-13"
};

describe('POST - Developers', () => {

    beforeAll(async () => {
        await Developer.deleteMany();
    });

    it('Should create a new Developer with successfully', async () => {
        const res = await global.testRequest.post(routeDeveloper).send(standardDev);
        expect(res.status).toBe(StatusCodes.CREATED);
        await expect(AuthService.comparePasswords(standardDev.senha, res.body.senha)).resolves.toBeTruthy();
        expect(res.body).toMatchObject({ ...standardDev, ...{ senha: expect.any(String)} });
    });

    it('Should not create a developer with data same', async () => {
        const res = await global.testRequest.post(routeDeveloper).send(standardDev);
        expect(res.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body).toEqual({
            error: "Internal Server Error",
            code: StatusCodes.INTERNAL_SERVER_ERROR, 
            message: "This response means that the server did not understand the request because it has an invalid syntax: Developer already registered"
        });
    });

    it('Should authenticate the token of developer', async () => {
        const res = await global.testRequest.post(`${routeDeveloper}/auth`).send(standardDev);
        expect(typeof res.body.token).toBe('string');
        expect(res.body.token?.length > 0).toBeTruthy();
    });

});