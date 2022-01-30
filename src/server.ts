import './app/util/module-alias';
import { Server } from '@overnightjs/core';
import { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as database from "@src/database";
import { DeveloperController } from './app/controllers/developer';

export class SetupServer extends Server {

    constructor (private port = 3000) {
        super();
    }

    public async init(): Promise<void> {
        this.setupExpress();
        this.setupDB();
        this.setupController();
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.info(`Server listening of port: ${this.port}`);
        });
    }

    public async close(): Promise<void> {
        await database.close();
        console.log('Exit APP');
    }

    public getApp(): Application {
        return this.app;
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
        this.app.use(cors({ origin: '*' }));
    }

    private async setupDB(): Promise<void> {
        await database.connect();
    }

    private setupController(): void {
        const developer = new DeveloperController();
        this.addControllers([ developer ]);
    }
}