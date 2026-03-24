import { useEffect, useState } from "react"
import "./css/minhaAgenda.css"
import FormAgenda from "./components/modalFormAgenda"
import axios from "axios"
import { toast } from "react-toastify"
import ModalLoad from "../../../../components/ModalLoad"

export default function MinhaAgenda() {

    const hoje = new Date()

    const formAgendaInicial = {
        show: false,
        dia: "",
        mes: "",
        ano: ""
    }

    const [formAgenda, setFormAgenda] = useState(formAgendaInicial)

    const [mesSelecionado, setMesSelecionado] = useState(
        `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`
    )

    function gerarDias() {

        const [ano, mes] = mesSelecionado.split("-").map(Number)

        const primeiroDia = new Date(ano, mes - 1, 1).getDay()
        const totalDias = new Date(ano, mes, 0).getDate()

        const dias = []

        for (let i = 0; i < primeiroDia; i++) {
            dias.push(null)
        }

        for (let dia = 1; dia <= totalDias; dia++) {
            dias.push(dia)
        }


        return dias
    }

    const dias: any = []

    //modal carregando
    const [carregando, setCarregando] = useState(false)
    const [mensagem, setMensagem] = useState("")

    const token = (localStorage.getItem("tokenLogin") || sessionStorage.getItem("tokenLogin"))!
    const idUsuario = (localStorage.getItem("idUsuario") || sessionStorage.getItem("idUsuario"))!

    //carrega agendamento do mes selecionado
    const [listaAgendamentosTotalDia, setListaAgendamentosTotalDia] = useState([])
    async function carregarTotalDeAgendamentosPorDia(mes: string, ano: string) {

        try {

            setCarregando(true)
            setMensagem("Carregando total de Agendamentos por Dia do mês.")

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/agenda/carregar/total/agendamentos/dia/mes/${mes}/${ano}`, {
                headers: {
                    Authorization: token,
                    idUsuario: idUsuario
                }
            })

            setListaAgendamentosTotalDia(response.data.dados)
        } catch (error: any) {

            toast.error(error.response.data.message || error.message)
        } finally {

            setCarregando(false)
            setMensagem("")
        }
    }

    const [diasCalendario, setDiasCalendario] = useState([])
    useEffect(function () {

        const dias = gerarDias()

        const diasFormatados: any = dias.map((dia) => {

            const agendamentoDoDia: any = listaAgendamentosTotalDia.find(
                (item: any) => {
                
                    return Number(item.dia) === dia
                }
            )

            return {
                dia: dia,
                totalDeAgendamentos: agendamentoDoDia
                    ? Number(agendamentoDoDia.qtd_total)
                    : 0
            }
        })

        setDiasCalendario(diasFormatados)
    }, [listaAgendamentosTotalDia])

    useEffect(function () {
        async function carregar() {

            const mes = mesSelecionado.split("-")[1]
            const ano = mesSelecionado.split("-")[0]
            if (mes) {

                await carregarTotalDeAgendamentosPorDia(mes, ano)
            }
        }

        carregar()
    }, [mesSelecionado])
    return (
        <div className="agenda-container p-2">

            <h4>Minha Agenda</h4>

            <div className="mb-3">
                <input
                    type="month"
                    value={mesSelecionado}
                    onChange={(e) => setMesSelecionado(e.target.value)}
                    className="form-control"
                />
            </div>

            <div className="dias-semana">
                <div>Dom</div>
                <div>Seg</div>
                <div>Ter</div>
                <div>Qua</div>
                <div>Qui</div>
                <div>Sex</div>
                <div>Sab</div>
            </div>

            <div className="grid-calendario">

                {diasCalendario.map((dia: any, index: number) => {


                    return (
                        <div
                            key={index}
                            className="dia"
                            onClick={function () {

                                if (dia.dia !== null) {
                                    setFormAgenda(function (form) {

                                        const mes = mesSelecionado.split("-")[1]
                                        const ano = mesSelecionado.split("-")[0]

                                        return {
                                            ...form,
                                            show: true,
                                            dia: String(dia.dia).padStart(2, "0"),
                                            mes: mes,
                                            ano: ano
                                        }
                                    })
                                }
                            }}
                        >
                            <label className="text-color-icon fw-bold">
                                {dia.dia}
                            </label>
                            <div className="text-center">
                                {
                                    dia.totalDeAgendamentos > 0 ? <span className="badge bg-primary">{dia.totalDeAgendamentos}</span> : <span className="badge bg-secondary">{dia.totalDeAgendamentos}</span>
                                }
                            </div>
                        </div>
                    )
                })}

            </div>

            <FormAgenda
                show={formAgenda.show}
                dia={formAgenda.dia}
                mes={formAgenda.mes}
                ano={formAgenda.ano}
                onClose={async function () {

                    const mes = mesSelecionado.split("-")[1]
                    const ano = mesSelecionado.split("-")[0]
                    await carregarTotalDeAgendamentosPorDia(mes, ano)
                    setFormAgenda(formAgendaInicial)
                }}
            />
            <ModalLoad
                carregando={carregando}
                mensagem={mensagem}
            />
        </div>
    )
}