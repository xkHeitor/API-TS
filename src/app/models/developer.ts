import mongoose , { Document, Model } from "mongoose";
import { CUSTOM } from "../types/validation";
import { DateUtil } from "../util/date";
import { Developer as Dev, Sexo } from "./type-of-developer";

interface DeveloperModel extends Omit<Dev, '_id'>, Document {}
const schema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        sexo: { type: Sexo, required: true },
        idade: { type: Number, required: true },
        hobby: { type: String, required: false },
        datanascimento: { type: Date, required: true },
    }, {
        toJSON: {
            transform: (_, ret): void => {
                ret.id = ret._id;
                delete ret._id;
                delete ret._v;
            }
        }
    }
);

schema.path('datanascimento').validate(async (datanascimento: string) => {
    return DateUtil.validateDate(datanascimento, 'DD/MM/YYYY');
}, 'The date is invalid.', CUSTOM.INVALID);

export const Developer: Model<DeveloperModel> = mongoose.model('Developer', schema);