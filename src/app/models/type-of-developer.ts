import { Date } from "mongoose";

export interface Developer {
	_id?: string;
	nome: string;
	senha: string;
	sexo: Sexo;
	idade: number;
	hobby: string;
	datanascimento: Date;
}

export enum Sexo {
	Male = 'M',
    Female = 'F',
} 