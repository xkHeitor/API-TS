import { Request, Response } from "express";
import { Developer } from "../models/developer";
import { StatusCodes } from "../types/status-codes";
import DeveloperRepository from "../repositories/developer";
import AuthService from "./auth";
import { DeveloperBadRequest, DeveloperNotFound } from "./errors/developer";
import { AnyObject } from "mongoose";

export class DeveloperService {

    constructor(private repository: DeveloperRepository) {}
    
    /* eslint-disable @typescript-eslint/no-explicit-any */

    public async getOne(developerID: number): Promise<AnyObject> {
        if (!developerID) {
            throw new DeveloperBadRequest('developerID invalid or not found');
        }

        const developer = await this.repository.getAll()
        if (!developer) {
            throw new DeveloperNotFound('Developr not found');
        }

        return developer;

    }
    
    // public async store(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const dev = new Developer(req.body);
    //         const newDev = await this.repository.create(dev);
    //         return res.status(StatusCodes.Created).send(newDev);
    //     } catch (error: any) {
    //         return this.sendCreateUpdateErrorResponse(res, error);
    //     }
    // }

    // public async auhtenticate(req: Request, res: Response): Promise<Response> {
    //     const { nome, senha, datanascimento } = req.body;
    //     const developer = await this.repository.getByFilter({nome, datanascimento});

    //     if (!developer) {
    //         return this.sendErrorResponse(res, { code: StatusCodes.Unauthorized, message: 'Developer not found!' });
    //     }

    //     if (!(await AuthService.comparePasswords(senha, developer.password))) {
    //         return this.sendErrorResponse(res, { code: StatusCodes.Unauthorized, message: 'Password does not match!'});
    //     }

    //     const token = AuthService.generateToken(developer.toJSON());
    //     return res.status(StatusCodes.OK).send({ token: token });
    // }

}