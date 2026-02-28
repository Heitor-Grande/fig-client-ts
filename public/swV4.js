//dispara quando o navegador recebe um push(notificação) do servidor(API)
self.addEventListener('push', function (event) {

    //dados enviados pelo servidor(API)
    const data = event.data.json()

    //dispara a notificação para o usuario
    event.waitUntil(self.registration.showNotification(data.title, data))
})

//Ele dispara quando o usuário clica na notificação exibida
self.addEventListener('notificationclick', function (event) {

    event.notification.close()

    const { title, body, data } = event.notification

    event.waitUntil(
        clients.openWindow(data.url)
    )
})