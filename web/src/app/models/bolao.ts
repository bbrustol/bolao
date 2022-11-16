import { Participacao } from '../models/participacao';

export interface Bolao {
    nome: string;
    ligaId: number;
    classificacao: Participacao[];
    id: number;
}