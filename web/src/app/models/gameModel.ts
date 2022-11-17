export interface GameModel {
    partidaId: number;
    palpiteId: number | undefined;
    mandanteId: number;
    mandanteNome: string;
    mandanteUrl: string;
    mandanteGols: number | undefined;
    mandanteVencedorPenaltis: boolean;
    visitanteId: number;
    visitanteNome: string;
    visitanteUrl: string;
    visitanteGols: number | undefined;
    visitanteVencedorPenaltis: boolean;
    tipo: string;
    enabledPenaltis: boolean;
    endGame: boolean;
    data: Date;
}