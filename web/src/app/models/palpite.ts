import { ResultadoPartidas } from '../models/resultadoPartidas';

export interface Palpite {
    partidaId: number;
    bolaoId: number;
    usuarioId: number;
    mandantedId: number;
    visitanteId: number;
    data: string;
    tipoResultadoPalpite: string;
    id: number;
    resultado: ResultadoPartidas;
}