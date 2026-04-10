import axios from "axios";

export default async function createIncricaoPushUser(inscricaoUsuario: PushSubscription) {

    try {

        await axios.post(`${process.env.REACT_APP_API_URL}/inscricaopush/criar`, {
            inscricao: inscricaoUsuario
        }, {
            headers: {
                Authorization: sessionStorage.getItem("tokenLogin") || localStorage.getItem("tokenLogin")
            }
        })

    } catch (error) {

        console.log(error)
    }
}