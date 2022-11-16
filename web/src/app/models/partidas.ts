import { ResultadoPartidas } from '../models/resultadoPartidas';

export interface Partidas {
    ligaId: number;
    mandanteId: number;
    visitanteId: number;
    data: string;
    tipo: string;
    id: number;
    resultado: ResultadoPartidas | undefined;
}