import config, { IConfig } from 'config';
import mongoose, { Mongoose } from 'mongoose';

const databaseConfigs: IConfig = config.get('App.database');
export const connect = async (): Promise<Mongoose> => 
    await mongoose.connect(databaseConfigs.get('mongoURL'), {});

export const close = (): Promise<void> => mongoose.connection.close();