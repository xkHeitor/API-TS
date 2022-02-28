import { Developer } from "@src/app/models/developer";

const routeDeveloper = '/developers';
const routeAuthDeveloper = routeDeveloper + '/auth';
const standardDev = {
    "nome": "Heitor",
    "senha": "321",
    "sexo": "M",
    "idade": 23,
    "hobby": "Lost ARK",
    "datanascimento": "1998-10-13"
};

describe('PUT - Developer', () => {
   
    let token: string;
    let idDeveloper: string;
    beforeAll(async () => {
        await Developer.deleteMany();
        const dev = (await global.testRequest.post(routeDeveloper).send(standardDev)).body;
        const auth = await global.testRequest.post(routeAuthDeveloper).send(standardDev);
        token = auth.body.token;
        idDeveloper = dev.id;
    });

    it('Should change one developer data', async () => {
        const changedDeveloper = { hobby: 'Skate' };
        const res = await global.testRequest.put(`${routeDeveloper}/${idDeveloper}`).set({ token }).send(changedDeveloper);
        expect(res.status).toBe(200);
        expect(res.body.modifiedCount).toBe(1);
    });
    
});