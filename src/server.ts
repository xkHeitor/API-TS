import './util/module-alias';
import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Application } from 'express';

export class SetupServer extends Server {

    constructor (private port = 3000) {
        super();
    }

    public async init(): Promise<void> {
        this.setupExpress();
        // this.setupController();
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.info(`Server listening of port: ${this.port}`);
        });
    }

    public async close(): Promise<void> {
        console.log('Exit APP');
    }

    public getApp(): Application {
        return this.app;
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
        this.app.use(cors({ origin: '*' }));
    }

    // private setupController(): void {
    // }
}