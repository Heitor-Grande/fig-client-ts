//função para gerar base64 de arquivos
interface file {
    id: number,
    fileBase64: string | ArrayBuffer | null,
    size: number,
    name: string,
    type: string
}
function GerarBase64(array: FileList) {
    return new Promise(function (resolve, reject) {
        try {
            const ListaFilesBase64: file[] = []
            for (let i = 0; i < array.length; i = i + 1) {
                const reader = new FileReader()
                const file = array[i]
                reader.addEventListener("load", function () {
                    const filebase64 = reader.result //arquivo convertido em base64
                    ListaFilesBase64.push({
                        id: i,
                        fileBase64: filebase64,
                        name: file.name,
                        type: file.type,
                        size: file.size
                    })
                    //verifica se o arquivo tem mais de 4mb
                    if (file.size > 4000000) {
                        reject({
                            message: `${file.name} é maior que 4MB, não é possível importar`
                        })
                    } else if (ListaFilesBase64.length == array.length) {
                        resolve(ListaFilesBase64) //retona array de arquivos convertidos
                    }
                })
                reader.readAsDataURL(file)//lê o arquivo e dispara o evento de load
            }
        } catch (error) {
            reject(error)
        }
    })
}

export default GerarBase64