export interface LembreteType {
    id: string
    idusuario:string
    titulo: string
    dataCriacao: string
    descricao: string
    dataDoDisparo: string // formato: "YYYY-MM-DDTHH:mm"
    recorrencia: "Semanal" | "Diario" | "Mensal" | "Anual" | "Unico"
    readOnly: boolean
}


export interface typeModalLoad {
    carregando: boolean, mensagem: string
}