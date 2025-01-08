import axios from "axios"
//função responsavel por gerar o token publico e enviar para o back end 
//estou usando na parte de criar novo usuario
function TokenPublic() {
    return new Promise(function (resolve, reject) {
        try {
            if (!sessionStorage.getItem("tokenPublic")) {
                axios.get(process.env.REACT_APP_API_URL + `/criar/novo/jwt/public`, {
                    headers: {
                        Authorization: `${process.env.REACT_APP_API_KEYPUBLIC}`
                    }
                }).then(function (resposta) {
                    sessionStorage.setItem("tokenPublic", resposta.data)
                    resolve({
                        msg: "token publico criado com sucesso"
                    })
                }).catch(function (error) {

                    reject(error)
                })
            }
        } catch (error) {
            reject({
                message: "Erro ao detectar public Token."
            })
        }
    })
}


export default TokenPublic