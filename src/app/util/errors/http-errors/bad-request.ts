import { StatusCodes } from "@src/app/types/status-codes";

export class BadRequest extends Error {

    constructor(public message: string, protected code: number = StatusCodes.BadRequest, protected description?: string) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
    }

}