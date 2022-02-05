import { Developer } from "../models/developer";
import { StatusCodes } from "../types/status-codes";
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
    
    public async store(body: object): Promise<AnyObject> {
        const dev = new Developer(body);
        const newDev = await this.repository.create(dev);
        return newDev;
    }

    public async auhtenticate(body: DeveloperType): Promise<string> {
        const { nome, senha, datanascimento } = body;
        const developer = await this.repository.getByFilter({nome, datanascimento});

        if (!developer) {
            throw new DeveloperNotFound('Developer not found');
        }

        if (!(await AuthService.comparePasswords(senha, developer.password))) {
            throw new DeveloperUnauthorized('The password does not match');
        }

        const token = AuthService.generateToken(developer.toJSON());
        return token;
    }

}