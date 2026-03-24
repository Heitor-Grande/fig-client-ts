export function validarCelular(celular: string): boolean {

    if (!celular) return false

    // remove máscara
    celular = celular.replace(/\D/g, '')

    // deve ter exatamente 11 dígitos (DDD + número)
    if (celular.length !== 11) return false

    const ddd = celular.slice(0, 2)
    const numero = celular.slice(2)

    // celular precisa começar com 9
    if (numero[0] !== '9') return false

    return true
}