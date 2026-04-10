export interface LembreteType {

    id: string
    idusuario: string
    titulo: string
    dataCriacao: string
    descricao: string
    dataDoDisparo: string // formato: "YYYY-MM-DD"
    recorrencia: "Diario" | "Unico"
    readOnly: boolean
    disparado: boolean
}

export interface ButtonComponentType {

    type: "submit" | "button" | "reset"
    label: string
    className: string
    onClick?: () => void
    icon?: string
    disabled?: boolean
}

export interface typeModalLoad {

    carregando: boolean, mensagem: string
}

export interface diaAgendaType {
    id: number | null | undefined;
    horaInicio: string;
    horaFim: string;
    dia: string;
    mes: string;
    ano: string;
    nomeCompleto: string;
    celular: string;
    email: string
    cpf: string
    observacao: string
    status: string
}

export interface Agenda {
    idagendamento: number;
    data_inicio: string;
    data_fim: string;
    status: string
}

export interface horaAgenda {
    hora: number;
    ocupado: boolean;
    status: string
    idAgendamento: number | null;
}