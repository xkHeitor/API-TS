import { Date } from "mongoose";

export interface Developer {
	_id?: string;
	nome: string;
	sexo: Sexo;
	idade: number;
	hobby: string;
	datanascimento: Date;
}

export enum Sexo {
	Male = 'M',
    Female = 'F',
} 