export interface GameModel {
    partidaId: number;
    mandanteId: number;
    mandanteNome: string;
    mandanteUrl: string;
    mandanteGols: number;
    mandanteVencedorPenaltis: boolean;
    visitanteId: number;
    visitanteNome: string;
    visitanteUrl: string;
    visitanteGols: number;
    visitanteVencedorPenaltis: boolean;
    tipo: string;
    enabledPenaltis: boolean;
    endGame: boolean;
}