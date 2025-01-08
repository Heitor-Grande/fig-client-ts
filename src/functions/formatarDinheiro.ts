//função usada para formatar enquanto digita o valor
function formatarDinheiro(valor: string) {
    // Remove tudo que não for número
    valor = valor.replace(/\D/g, "")
    // Adiciona as casas decimais
    valor = (parseFloat(valor) / 100).toFixed(2).replace(".", ",")
    // Adiciona o ponto como separador de milhar
    valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    return valor
}
//mascara para mostrar o valor
function formatarValorFixo(valor: number | string): string {
    // Converte o valor para número, caso seja uma string
    valor = valor.toString()
    if (!valor.includes(",")) {
        valor = Number(valor)
        // Adiciona as casas decimais e substitui o ponto por vírgula
        valor = valor.toFixed(2).replace(".", ",")
        // Adiciona o ponto como separador de milhar
        valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        return valor
    }
    else {
        return valor
    }
}
export default {
    formatarDinheiro,
    formatarValorFixo
}