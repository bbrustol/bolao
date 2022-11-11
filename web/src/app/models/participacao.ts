import { ParticipacaoKey } from '../models/participacaoKey';

export interface Participacao {
    pontuacaoTotal: number;
    key: ParticipacaoKey;
    ativo: boolean;
}