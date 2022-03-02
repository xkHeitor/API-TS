import { Controller, Get, Post, Middleware, Delete, Put } from "@overnightjs/core";
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
    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const filters = req.body.filters;
            const developer = await this.service.getAll(filters);
            return res.send({ developer });
        } catch(error: any) {
            return this.sendErrorResponse(res, { code: error.code, message: error.message});
        } 
        
    }

    @Get(':id')
	@Middleware(authMiddleware)
    public async getOne(req: Request, res: Response): Promise<Response> {
        try {
            const idDeveloper = req.params.id;
            const developer = await this.service.getOne(idDeveloper);
            return res.send({ developer });
        } catch(error: any) {
            return this.sendErrorResponse(res, { code: error.code, message: error.message});
        } 
        
    }

    @Post('')
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const developer = await this.service.store(req.body);
            return res.status(StatusCodes.Created).send(developer);
        } catch(error: any) {
            return this.sendErrorResponse(res, { code: StatusCodes.InternalServerError, message: error.message});
        }
    }

    @Post('auth')
    public async authenticate(req: Request, res: Response): Promise<Response> {
        try {
            const token = await this.service.auhtenticate(req.body);
            return res.status(StatusCodes.OK).send({ token });
        } catch (error: any) {
            return this.sendErrorResponse(res, { code: error.code, message: error.message });
        }
    }

    @Put(':id')
    public async change(req: Request, res: Response): Promise<Response> {
        try {
            const idDeveloper = req.params.id;
            const developer = await this.service.changeData(idDeveloper, req.body);
            return res.status(StatusCodes.OK).send(developer);
        } catch (error: any) {
            return this.sendErrorResponse(res, { code: error.code, message: error.message });
        }
    }

    @Delete('')
	@Middleware(authMiddleware)
    public async delete(req: Request, res: Response): Promise<Response> {
        try {
            await this.service.delete(req.body.id);
            return res.status(StatusCodes.NoContent).send();
        } catch(error: any) {
            return this.sendErrorResponse(res, { code: StatusCodes.InternalServerError, message: error.message});
        } 
    }

}