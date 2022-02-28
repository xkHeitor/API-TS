import { DeveloperBadRequest } from "./errors/developer";

export default class MandatoryIdentifier {

    private id: string;

    constructor(id?: string) {
        if(!id) throw new DeveloperBadRequest('idDeveloper not found');
        this.id = id;
    }

    get() {
        return this.id;
    }

}