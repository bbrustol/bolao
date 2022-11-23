import { ResultadoPartidas } from './resultadoPartidas';

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

export interface PalpiteUsuarioDTO extends Palpite {
    nomeUsuario : string | undefined
}

export interface CompararPalpitesDTO {
    nomeMandante: string,
    nomeVisitante: string,
    urlMandante: string | undefined,
    urlVisitante: string | undefined,
    palpites: PalpiteUsuarioDTO[]
}