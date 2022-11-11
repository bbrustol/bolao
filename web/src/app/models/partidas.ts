import { ResultadoPartidas } from '../models/resultadoPartidas';

export interface Partidas {
    ligaId: number;
    mandantedId: number;
    visitanteId: number;
    data: string;
    tipo: string;
    id: number;
    resultado: ResultadoPartidas;
}