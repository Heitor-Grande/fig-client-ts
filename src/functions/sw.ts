import createIncricaoPushUser from "./requestCreateIncricaoPush";

//instala o servicework
export async function swInstall() {
    try {
        //cria o serviceWorker no navegador
        if ('serviceWorker' in navigator) {

            await navigator.serviceWorker.register("/swV4.js")
        }
    } catch (error) {

        console.error("Erro ao registrar/consultar ServiceWorker:", error)
    }
}

//pede permissão de notificação E cria a "Inscrição" do usuario
export async function pedirPermissaoNotificacao() {
    try {

        //pede a permissão para notificações e pode retornar os status: granted, denied, default
        await Notification.requestPermission();
        //granted -> ja ativada
        //denied -> notificações bloqueadas, necessario ação do usuario para ativar.
        //default -> a aplicação pode solicitar a permissão

        //consulta se ja existe o ServiceWorker
        const sw = await navigator.serviceWorker.ready

        if (sw) {

            //cria uma "Inscrição" do usuario (pega do dispositivo atual)
            const novaInscricao = await sw.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: process.env.REACT_APP_VAPID_PUBLIC_KEY!
            })

            //envia a inscrição de push do usuario para a API
            await createIncricaoPushUser(novaInscricao)

        }
    } catch (error) {

        console.log("Erro ao solicitar permissão de Push: " + error)
    }
}