import mongoose , { Document, Model } from "mongoose";
import AuthService from "../services/auth";
import { CUSTOM } from "../types/validation";
import { DateUtil } from "../util/date";
import { Developer as Dev, Sexo } from "./type-of-developer";

export interface DeveloperModel extends Omit<Dev, '_id'>, Document {}
const schema = new mongoose.Schema(
    {
        nome: { type: String, required: true },
        senha: { type: String, required: true },
        sexo: { type: String, default: Sexo.Male, enum: Object.values(Sexo), required: true },
        idade: { type: Number, required: true },
        hobby: { type: String, required: false },
        datanascimento: { type: Date, required: true },
    }, {
        toJSON: {
            transform: (_, ret): void => {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            }
        }
    }
);

schema.path('datanascimento').validate(async (datanascimento: string) => {
    return DateUtil.validateDate(datanascimento, 'DD/MM/YYYY');
}, 'The date is invalid.', CUSTOM.INVALID);

/* eslint-disable @typescript-eslint/no-explicit-any */
schema.pre<DeveloperModel>('save', async function(): Promise<void> {
    if (!this.senha || !this.isModified('senha')) {
        return;
    }

    try {
        const hashedPassword = await AuthService.hashPassword(this.senha);
        this.senha = hashedPassword;
    } catch(error: any) {
        console.error(`Error hashing the password for the developr ${this.nome}`);
    }
});
export const Developer: Model<DeveloperModel> = mongoose.model('Developer', schema);