import { Date } from "mongoose";

export interface Developer {
	_id?: string;
	nome: string;
	password: string;
	sexo: Sexo;
	idade: number;
	hobby: string;
	datanascimento: Date;
}

export enum Sexo {
	Male = 'M',
    Female = 'F',
} 