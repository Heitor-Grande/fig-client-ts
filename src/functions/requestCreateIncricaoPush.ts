import axios from "axios";

export default async function createIncricaoPushUser(inscricaoUsuario: PushSubscription) {

    try {

        await axios.post(`${process.env.REACT_APP_API_URL}/inscricaopush/criar`, {
            idusuario: sessionStorage.getItem("idUsuario") || localStorage.getItem("idUsuario"),
            inscricao: inscricaoUsuario
        })

    } catch (error) {

        console.log(error)
    }
}