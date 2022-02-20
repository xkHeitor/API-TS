import { Developer } from "@src/app/models/developer";
import { Developer as TypeDeveloper} from "@src/app/models/type-of-developer";
import AuthService from "@src/app/services/auth";

const routeDeveloper = '/developers';
const standardDev = {
    "nome": "Heitor",
    "senha": "321",
    "sexo": "M",
    "idade": 23,
    "hobby": "Pixelmon",
    "datanascimento": "1998-10-13"
};

describe('POST - Developers', () => {

    beforeAll(async () => {
        await Developer.deleteMany();
    });

    it('Should create a new Developer with successfully', async () => {
        const res = await global.testRequest.post(routeDeveloper).send(standardDev);
        expect(res.status).toBe(201);
        await expect(AuthService.comparePasswords(standardDev.senha, res.body.senha)).resolves.toBeTruthy();
        expect(res.body).toMatchObject({ ...standardDev, ...{ senha: expect.any(String)} });
    });

    it('Should not create a developer with data same', async () => {
        const res = await global.testRequest.post(routeDeveloper).send(standardDev);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({
            error: "Internal Server Error",
            code: 500, 
            message: "This response means that the server did not understand the request because it has an invalid syntax: Developer already registered"
        });
    });

    it('Should authenticate the token of developer', async () => {
        const res = await global.testRequest.post(`${routeDeveloper}/auth`).send(standardDev);
        expect(typeof res.body.token).toBe('string');
        expect(res.body.token?.length > 0).toBeTruthy();
    });

});

describe('GET - Developers', () => {

    let token: string; 
    let dev: TypeDeveloper;

    beforeAll(async () => {
        await Developer.deleteMany();
        dev = (await global.testRequest.post(routeDeveloper).send(standardDev)).body;
        const res = await global.testRequest.post(`${routeDeveloper}/auth`).send(standardDev);
        token = res.body.token;
    });

    it('Should get one developer by id', async () => {
        const res = await global.testRequest.get(routeDeveloper).set({ token }).send(dev);
        expect(res.status).toBe(200);
        expect(res.body.developer).toEqual(dev);
    });

    it('Should request ID of developer', async () => {
        const res = await global.testRequest.get(routeDeveloper).set({ token }).send({});
        expect(res.status).toBe(400);
        expect(res.body).toEqual({
            error: 'Bad Request',
            code: 400,
            message: 'This response means that the server did not understand the request because it has an invalid syntax: developerID not found'
        });
    });

});