import { ResultadoPartidas } from '../models/resultadoPartidas';

export interface GameModel {
    mandanteId: number;
    mandanteNome: string;
    mandanteUrl: string;
    mandanteGols: number;
    mandanteVencedorPenaltis: boolean;
    visitanteId: number;
    visitanteNome: string;
    visitanteUrl: string;
    VisitanteGols: number;
    visitanteVencedorPenaltis: boolean;
    tipo: string;
}