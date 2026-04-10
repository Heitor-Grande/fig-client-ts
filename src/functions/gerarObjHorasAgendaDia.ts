import { Agenda, horaAgenda } from "../types/globalTypes";


export default function gerarAgendaHorasDoDia(horas: number[], agendamentos: Agenda[]): horaAgenda[] {
    const resultado: horaAgenda[] = [];

    for (let i = 0; i < horas.length; i++) {
        const horaAtual = horas[i];

        let ocupado = false;
        let idAgendamento: number | null = null;
        let status = ""

        for (let j = 0; j < agendamentos.length; j++) {
            const ag = agendamentos[j];

            status = ag.status
            const inicio = new Date(ag.data_inicio).getHours();
            const fim = new Date(ag.data_fim).getHours();

            if (inicio < fim) {
                if (horaAtual >= inicio && horaAtual < fim) {
                    ocupado = true;
                    idAgendamento = ag.idagendamento;
                    break;
                }
            } else {
                // atravessa meia-noite
                if (horaAtual >= inicio || horaAtual < fim) {
                    ocupado = true;
                    idAgendamento = ag.idagendamento;
                    break;
                }
            }
        }

        resultado.push({
            hora: horaAtual,
            ocupado: ocupado,
            idAgendamento: idAgendamento,
            status: status
        });
    }

    return resultado;
}