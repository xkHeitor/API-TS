import { DeveloperModel } from "../models/developer";

export interface DecodedDeveloper extends Omit<DeveloperModel, '_id'> {
    id: string;
}