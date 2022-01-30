import { Request, Response } from "express";
import { Developer } from "../models/developer";
import { DeveloperRepository } from "../repositories/developer";

export class DeveloperService extends DeveloperRepository {
    
    /* eslint-disable @typescript-eslint/no-explicit-any */

    public async getOne(req: Request, res: Response): Promise<Response> {
        const dev = await this.getById(parseInt(req.params.id))
        if (!dev) {
            return this.sendErrorResponse(res, { code: 404, message: 'Developer not found!'});
        }

        return res.send({ dev });
    }
    
    public async store(req: Request, res: Response): Promise<Response> {
        try {
            const dev = new Developer(req.body);
            const newDev = await this.create(dev);
            return res.status(201).send(newDev);
        } catch (error: any) {
            return this.sendCreateUpdateErrorResponse(res, error);
        }
    }

}