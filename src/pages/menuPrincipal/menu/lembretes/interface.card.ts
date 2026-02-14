export interface LembreteType {
    id: string
    titulo: string
    dataCriacao: string
    descricao: string
    dataDoDisparo: string // formato: "YYYY-MM-DDTHH:mm"
    recorrencia: "Semanal" | "Diario" | "Mensal" | "Anual" | "Unico"
    readOnly: boolean
}
