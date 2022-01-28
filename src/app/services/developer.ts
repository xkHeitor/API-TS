import { Request, Response } from "express";
import { Developer } from "../models/developer";
import { DeveloperRepository } from "../repositories/developer";

export class DeveloperService extends DeveloperRepository {
    
    public async getOne(req: Request, res: Response): Promise<Response> {
        const dev = await this.getById(parseInt(req.params.id))
        if (!dev) {
            return this.sendErrorResponse(res, { code: 404, message: 'Developer not found!'});
        }

        return res.send({ dev });
    }
    
    /* eslint-disable @typescript-eslint/no-explicit-any */
    public async store(req: Request, res: Response): Promise<void> {
        try {
            const dev = new Developer(req.body);
            const newDev = await this.create(dev);
            res.status(201).send(newDev);
        } catch (error: any) {
            this.sendCreateUpdateErrorResponse(res, error);
        }
    }

}