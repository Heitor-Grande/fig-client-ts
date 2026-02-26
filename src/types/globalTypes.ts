export interface LembreteType {

    id: string
    idusuario: string
    titulo: string
    dataCriacao: string
    descricao: string
    dataDoDisparo: string // formato: "YYYY-MM-DDTHH:mm"
    recorrencia: "Semanal" | "Diario" | "Mensal" | "Anual" | "Unico"
    readOnly: boolean
}

export interface ButtonComponentType {

    type: "submit" | "button" | "reset"
    label: string
    className: string
    onClick?: () => void
    icon?: string
}

export interface typeModalLoad {

    carregando: boolean, mensagem: string
}