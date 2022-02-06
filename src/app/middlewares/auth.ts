import AuthService from "@src/app/services/auth";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "../types/status-codes";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function authMiddleware(req: Partial<Request>, res: Partial<Response>, next: NextFunction): void {
    const token = req.headers?.['token'];
    try {
        if (!token) {
            throw { message: 'hash not found' };
        }
        const decoded = AuthService.decodeToken(token as string);
        req.decoded = decoded;
        next();
    } catch(error: any) {
        res.status?.(StatusCodes.Unauthorized).send({ code: StatusCodes.Unauthorized, error: error.message });
    }
}