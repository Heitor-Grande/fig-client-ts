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