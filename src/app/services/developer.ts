import { Developer } from "../models/developer";
import DeveloperRepository from "../repositories/developer";
import AuthService from "./auth";
import { DeveloperBadRequest, DeveloperNotFound, DeveloperUnauthorized } from "./errors/developer";
import { AnyObject } from "mongoose";
import { Developer as DeveloperType } from "../models/type-of-developer";

export class DeveloperService {

    constructor(private repository: DeveloperRepository) {}
    
    /* eslint-disable @typescript-eslint/no-explicit-any */

    public async getOne(developerID: string): Promise<AnyObject> {
        if (!developerID) {
            throw new DeveloperBadRequest('developerID not found');
        }

        const developer = await this.repository.getById(developerID);
        if (!developer) {
            throw new DeveloperNotFound('Developer not found');
        }

        return developer;
    }
    
    public async store(body: DeveloperType): Promise<AnyObject> {
        const dev = new Developer(body);
        const { nome, datanascimento } = body;
        const developer = await this.repository.getOneByFilter({ nome, datanascimento });
        if (developer) throw new DeveloperBadRequest('Developer already registered');
        const newDev = await this.repository.create(dev);
        return newDev;
    }

    public async delete(developerID: string): Promise<void> {
        if (!developerID){
            throw new DeveloperBadRequest('developerID not found');
        }

        const res = await this.repository.delete(developerID);
        if (!res.deletedCount || res?.deletedCount == 0)
            throw new DeveloperBadRequest('Could not delete this developer');

    }

    public async auhtenticate(body: DeveloperType): Promise<string> {
        if (!body) throw new DeveloperBadRequest('developerID not found');
        const { nome, senha, datanascimento } = body;
        const developer = await this.repository.getOneByFilter({ nome, datanascimento });

        if (!developer || developer?.length < 1) {
            throw new DeveloperNotFound('Developer not found');
        }

        if (!(await AuthService.comparePasswords(senha, developer.senha))) {
            throw new DeveloperUnauthorized('The password does not match');
        }

        const token = AuthService.generateToken(developer.toJSON());
        return token;
    }

}