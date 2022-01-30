import { AnyObject } from "mongoose";
import { Developer, DeveloperModel } from "../models/developer";
import { BaseService } from "../services/index";

export abstract class DeveloperRepository extends BaseService {


    /* eslint-disable @typescript-eslint/no-explicit-any */

    protected async getAll(): Promise<AnyObject> {
        return await Developer.find();
    }

    protected async getById(id: number): Promise<any> {
        return await Developer.findOne({ id });
    }

    protected async getByParams(params: object): Promise<any> {
        return await Developer.find(params);
    }

    protected async create(developer: DeveloperModel): Promise<any> {
        return await developer.save();
    }

    protected async update(developer: DeveloperModel, id: number, params: object): Promise<any> {
       return await Developer.where({ id }).update(params); 
    }

    protected async delete(id: number): Promise<any> {
        return await Developer.deleteOne({ id });
    } 
}