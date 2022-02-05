import { Controller, Get, Post, Middleware } from "@overnightjs/core";
import { Request, Response } from "express";
import { authMiddleware } from "../middlewares/auth";
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
	@Middleware(authMiddleware)
    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const developer = await this.service.getOne(req.body.id);
            return res.send({ developer });
        } catch(error: any) {
            console.error(error)
            return this.sendErrorResponse(res, { code: error.code, message: error.message});
        } 
        
    }

    @Post('')
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const developer = await this.service.store(req.body);
            return res.status(StatusCodes.Created).send(developer);
        } catch(error: any) {
            console.error(error);
            return this.sendErrorResponse(res, { code: StatusCodes.InternalServerError, message: error.message});
        }
    }

    @Post('auth')
    public async authenticate(req: Request, res: Response): Promise<Response> {
        try {
            const token = await this.service.auhtenticate(req.body);
            return res.status(StatusCodes.OK).send({ token });
        } catch (error: any) {
            console.error(error);
            return this.sendErrorResponse(res, { code: error.code, message: error.message});
        }
    }

}