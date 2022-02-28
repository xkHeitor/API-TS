import { Developer } from "@src/app/models/developer";
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

describe('DELETE - Developer', () => {

    let token: string;
    let idDeveloper: string;

    beforeAll(async () => {
        await Developer.deleteMany();
        const dev = (await global.testRequest.post(routeDeveloper).send(standardDev)).body;
        const res = await global.testRequest.post(`${routeDeveloper}/auth`).send(standardDev);
        
        token = res.body.token;
        idDeveloper = dev.id;
    });

    it('Should delete one developer', async () => {
        const res = await global.testRequest.delete(routeDeveloper).set({ token }).send({ id: idDeveloper });
        expect(res.status).toBe(StatusCodes.NO_CONTENT);
    });

});