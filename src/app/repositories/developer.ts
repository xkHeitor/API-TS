import { AnyObject } from "mongoose";
import { Developer, DeveloperModel } from "../models/developer";

export default class DeveloperRepository {

    /* eslint-disable @typescript-eslint/no-explicit-any */

    public async getAll(): Promise<AnyObject> {
        return await Developer.find();
    }

    public async getById(id: number): Promise<any> {
        console.log(Developer, id)
        return await Developer.findOne({ id });
    }

    public async getByFilter(filter: object): Promise<any> {
        return await Developer.findOne(filter);
    }

    public async getByParams(params: object): Promise<any> {
        return await Developer.find(params);
    }

    public async create(developer: DeveloperModel): Promise<any> {
        return await developer.save();
    }

    public async update(id: number, params: object): Promise<any> {
       return await Developer.where({ id }).update(params); 
    }

    public async delete(id: number): Promise<any> {
        return await Developer.deleteOne({ id });
    } 
}