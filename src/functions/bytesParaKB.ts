function bytesParaKB(bytes: number): string {
    const kb = bytes / 1024 // 1 KB = 1024 bytes
    return kb.toFixed(2).toString() + "KB"// Retorna com 2 casas decimais
}
export default bytesParaKB