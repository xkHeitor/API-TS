import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from 'config';
import { DecodedDeveloper } from '../types/auth';

export default class AuthService {

    static async hasPassword(password: string, salt = 8): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    static async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    static generateToken(payload: object): string {
        return jwt.sign(payload, config.get('App.auth.key'), {
            expiresIn: config.get('App.auth.tokenExpiresIn')
        });
    }

    static decodeToken(token:string): DecodedDeveloper {
        return jwt.verify(token, config.get('App.auth.key')) as DecodedDeveloper;
    }

}