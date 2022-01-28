import { Developer, DeveloperModel } from "../models/developer";
import { BaseService } from "../services/index";

export abstract class DeveloperRepository extends BaseService {


    /* eslint-disable @typescript-eslint/no-explicit-any */
    protected async getById(id: number): Promise<any> {
        return await Developer.findOne({ id });
    }

    protected async create(developer: DeveloperModel): Promise<any> {
        return await developer.save();
    }

}