export interface Boloes {
    nome: string;
    ligaId: number;
    classificacao: Classificacao[];
    administradorId: number;
    id: number;
}

export interface Bolao {
    nome: string;
    liga: Liga;
    administrador: Administrador;
    id: number;
}

export interface Administrador {
    nome: string;
    senha: string;
    email: string;
    ultimoLogin: Date;
    autorizacoes: string[];
    id: number;
    ativo: boolean;
}

export interface Liga {
    nome: string;
    descricao: string;
    inicio: Date;
    fim: Date;
    id: number;
}

export interface Usuario {
    nome: string;
    senha: string;
    email: string;
    ultimoLogin: Date;
    autorizacoes: string[];
    id: number;
    ativo: boolean;
}

export interface Classificacao {
    pontuacao: number;
    nome: string;
    classificacao: number;
    act: number;
    atp: number;
    asg: number;
    ac: number;
    acp: number;
}
