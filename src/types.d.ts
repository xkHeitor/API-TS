import * as http from 'http';
import { DecodedDeveloper } from './app/types/auth';

declare module 'express-serve-static-core' {
    export interface Request extends http.IncomingMessage, Express.Request {
        decoded?: DecodedDeveloper;
    }
}