import { Controller, Get, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { DeveloperService } from "../services/developer";

@Controller('developers')
export class DeveloperController {

    private service: DeveloperService = new DeveloperService();
    
    @Get('')
    public async getAll(req: Request, res: Response): Promise<Response> {
        return await this.service.getOne(req, res);
    }

    @Post('')
    public async create(req: Request, res: Response): Promise<Response> {
        return await this.service.store(req, res);
    }

}