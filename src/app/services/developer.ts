import { Request, Response } from "express";
import { Developer } from "../models/developer";
import { DeveloperRepository } from "../repositories/developer";
import { StatusCodes } from "../types/status-codes";

export class DeveloperService extends DeveloperRepository {
    
    /* eslint-disable @typescript-eslint/no-explicit-any */

    public async getOne(req: Request, res: Response): Promise<Response> {
        const dev = await this.getById(parseInt(req.params.id))
        if (!dev) {
            return this.sendErrorResponse(res, { code: StatusCodes.NotFound, message: 'Developer not found!'});
        }

        return res.send({ dev });
    }
    
    public async store(req: Request, res: Response): Promise<Response> {
        try {
            const dev = new Developer(req.body);
            const newDev = await this.create(dev);
            return res.status(StatusCodes.Created).send(newDev);
        } catch (error: any) {
            return this.sendCreateUpdateErrorResponse(res, error);
        }
    }

}