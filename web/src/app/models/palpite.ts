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
    resultadoPartida: ResultadoPartidas;
}

export interface PalpiteUpsertDTO {
    partidaId: number,
    bolaoId: number,
    resultadoPartida: {
        golsMandante: number,
        golsVisitante: number,
        isMandanteVencedorPenaltis: boolean,
        isVisitanteVencedorPenaltis: boolean
    },
    id: number | undefined
}