import { Developer, DeveloperModel } from "@src/app/models/developer";
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


describe('GET - Developers', () => {

    let token: string; 
    let dev: Partial<DeveloperModel>;

    beforeAll(async () => {
        await Developer.deleteMany();
        dev = (await global.testRequest.post(routeDeveloper).send(standardDev)).body;
        const res = await global.testRequest.post(`${routeDeveloper}/auth`).send(standardDev);
        token = res.body.token;
    });

    it('Should get one developer by id', async () => {
        const res = await global.testRequest.get(`${routeDeveloper}/${dev.id}`).set({ token }).send();
        expect(res.status).toBe(StatusCodes.OK);
        expect(res.body.developer).toEqual(dev);
    });

    it('Should request ID of developer', async () => {
        const res = await global.testRequest.get(`${routeDeveloper}/${'0'}`).set({ token }).send({});
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
        expect(res.body).toEqual({
            error: 'Bad Request',
            code: StatusCodes.BAD_REQUEST,
            message: 'This response means that the server did not understand the request because it has an invalid syntax: idDeveloper not found'
        });
    });

});