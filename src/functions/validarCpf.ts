export default function validarCPF(cpf: string): boolean {

    if (!cpf) return false

    // remove tudo que não for número
    cpf = cpf.replace(/\D/g, '')

    // precisa ter 11 dígitos
    if (cpf.length !== 11) return false

    // elimina CPFs inválidos tipo 11111111111
    if (/^(\d)\1+$/.test(cpf)) return false

    // validação do primeiro dígito
    let soma = 0
    for (let i = 0; i < 9; i++) {
        soma += Number(cpf[i]) * (10 - i)
    }

    let resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0

    if (resto !== Number(cpf[9])) return false

    // validação do segundo dígito
    soma = 0
    for (let i = 0; i < 10; i++) {
        soma += Number(cpf[i]) * (11 - i)
    }

    resto = (soma * 10) % 11
    if (resto === 10 || resto === 11) resto = 0

    if (resto !== Number(cpf[10])) return false

    return true
}