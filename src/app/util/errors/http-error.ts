import { StatusCodes } from "@src/app/types/status-codes";

export class HttpError extends Error {

    constructor (public message: string, public code: StatusCodes, protected description?: string) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
    }

}