import { Developer } from "@src/app/models/developer";
import AuthService from "@src/app/services/auth";

describe('Developers', () => {

    beforeEach(async () => {
        await Developer.deleteMany();
    });

    const routeDeveloper = '/developers';
    const standardDev = {
        "nome": "Heitor",
        "senha": "321",
        "sexo": "M",
        "idade": 23,
        "hobby": "Pixelmon",
        "datanascimento": "1998-10-13"
    }

    it('Should create a new Developer with successfully', async () => {
        const res = await global.testRequest.post(routeDeveloper).send(standardDev);
        expect(res.status).toBe(201);
        await expect(AuthService.comparePasswords(standardDev.senha, res.body.senha)).resolves.toBeTruthy();
        expect(res.body).toMatchObject({ ...standardDev, ...{ senha: expect.any(String)} });
    });

});