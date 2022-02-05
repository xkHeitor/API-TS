import { StatusCodes } from "@src/app/types/status-codes";
import { HttpError } from "@src/app/util/errors/http-error";

export class DeveloperInternalError extends HttpError {
    constructor(message: string) {
        super(`The server has encountered a situation that it does not know how to handle: ${message}`, StatusCodes.InternalServerError);
    }
}

export class DeveloperBadRequest extends HttpError {
    constructor(message: string) {
        super(`This response means that the server did not understand the request because it has an invalid syntax: ${message}`, StatusCodes.BadRequest);
    }
} 

export class DeveloperNotFound extends HttpError {
    constructor(message: string) {
        super(`The server cannot find the requested resource: ${message}`, StatusCodes.NotFound);
    }
} 

export class DeveloperUnauthorized extends HttpError {
    constructor(message: string) {
        super(`Not authorized: ${message}`, StatusCodes.Unauthorized);
    }
}