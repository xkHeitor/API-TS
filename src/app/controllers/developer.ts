import { Controller, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { BaseController } from "../services";
import { DeveloperService } from "../services/developer";
import { StatusCodes } from "../types/status-codes";

@Controller('developers')
export class DeveloperController extends BaseController {

    /* eslint-disable @typescript-eslint/no-explicit-any */
    constructor(private service: DeveloperService) {
        super();
    }
    
    @Get('')
    public async getAll(req: Request, res: Response): Promise<Response> {
        const developerID = parseInt(req.body.id);
        try {
            const developer = await this.service.getOne(developerID);
            return res.send({ developer });
        }catch(error: any) {
            console.error(error)
            return this.sendErrorResponse(res, { code: error.code, message: error.message});
        } 
        
    }

    // @Post('')
    // public async create(req: Request, res: Response): Promise<Response> {
    //     return await this.service.store(req, res);
    // }

}