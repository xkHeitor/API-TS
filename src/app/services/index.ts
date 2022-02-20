import { Response } from "express";
import mongoose from "mongoose";
import { CUSTOM } from "../types/validation";
import APIError from "../util/errors/api-error";
import { TypeAPIError } from "../util/errors/type-of-error";
import { StatusCodes } from "@src/app/types/status-codes";

export abstract class BaseController {
    
    protected sendCreateUpdateErrorResponse(res: Response, error: mongoose.Error.ValidationError|Error): Response {
        if (error instanceof mongoose.Error.ValidationError) {
            const clientErrors = this.handleClientErrors(error);
            return res.status(clientErrors.code).send(APIError.format({ code: clientErrors.code, message: clientErrors.error}));
        } else {
            return res.status(StatusCodes.InternalServerError).send(APIError.format({ code: StatusCodes.InternalServerError, message: 'Something went wrong' }));
        }
    }
    
    private handleClientErrors(error: mongoose.Error.ValidationError): { code: number, error: string } {
        const invalidKindErrors = Object.values(error.errors)
            .filter(err => JSON.parse(JSON.stringify(err)).kind === CUSTOM.INVALID);
        return { code: (invalidKindErrors.length ? StatusCodes.PreconditionFailed : StatusCodes.UnprocessableEntity), error: error.message };
    }

    protected sendErrorResponse(res: Response, apiError: TypeAPIError): Response {
        return res.status(apiError.code).send(APIError.format(apiError));
    }

}