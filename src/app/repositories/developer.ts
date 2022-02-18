import { AnyObject } from "mongoose";
import { Developer, DeveloperModel } from "../models/developer";

export default class DeveloperRepository {

    /* eslint-disable @typescript-eslint/no-explicit-any */

    public async getAll(): Promise<AnyObject> {
        return await Developer.find();
    }

    public async getById(id: string): Promise<AnyObject|null> {
        return await Developer.findById(id).exec();
    }

    public async getByFilter(filter: object): Promise<AnyObject> {
        return await Developer.find(filter);
    }

    public async getOneByFilter(filter: object): Promise<any> {
        return await Developer.findOne(filter);
    }

    public async create(developer: DeveloperModel): Promise<AnyObject> {
        return await developer.save();
    }

    public async update(id: number, params: object): Promise<AnyObject> {
       return await Developer.where({ id }).update(params); 
    }

    public async delete(id: number): Promise<AnyObject> {
        return await Developer.deleteOne({ id });
    } 
}