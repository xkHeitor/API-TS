import { Response } from "express";
import mongoose from "mongoose";
import { CUSTOM } from "../types/validation";
import APIError from "../util/errors/api-error";
import { TypeAPIError } from "../util/errors/type-of-error";

export abstract class BaseService {
    
    protected sendCreateUpdateErrorResponse(res: Response, error: mongoose.Error.ValidationError|Error): void {
        if (error instanceof mongoose.Error.ValidationError) {
            const clientErrors = this.handleClientErrors(error);
            res.status(clientErrors.code).send(APIError.format({ code: clientErrors.code, message: clientErrors.error}));
        } else {
            console.error(error);
            res.status(500).send(APIError.format({ code: 500, message: 'Something went wrong' }));
        }
    }
    
    private handleClientErrors(error: mongoose.Error.ValidationError): { code: number, error: string } {
        const invalidKindErrors = Object.values(error.errors)
            .filter(err => JSON.parse(JSON.stringify(err)).kind === CUSTOM.INVALID);
        return { code: (invalidKindErrors.length ? 412 : 422), error: error.message };
    }

    protected sendErrorResponse(res: Response, apiError: TypeAPIError): Response {
        return res.status(apiError.code).send(APIError.format(apiError));
    }

}