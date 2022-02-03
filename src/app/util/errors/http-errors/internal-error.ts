import { StatusCodes } from "@src/app/types/status-codes";

export class InternalError extends Error {

    constructor (public message: string, protected code: number = StatusCodes.InternalServerError, protected description?: string) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
    }

}