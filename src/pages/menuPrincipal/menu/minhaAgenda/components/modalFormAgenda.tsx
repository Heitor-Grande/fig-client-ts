import axios from "axios"
import { toast } from "react-toastify"
import { Modal } from "react-bootstrap"
import ModalFormDia from "./modalFormDia"
import { useEffect, useState } from "react"
import ModalLoad from "../../../../../components/ModalLoad"
import gerarAgendaHorasDoDia from "../../../../../functions/gerarObjHorasAgendaDia"
import { horaAgenda } from "../../../../../types/globalTypes"


interface FormAgendaProps {

    show: boolean
    onClose: () => void
    dia: string
    mes: string
    ano: string
}

interface FormDiaProps {
    show: boolean
    horaInicio: string
    horaFim: string
    dia: string
    mes: string
    ano: string
    idAgendamento: number | null | undefined
}

export default function FormAgenda({ show, onClose, dia, mes, ano }: FormAgendaProps) {

    const [horasAgenda, setHorasAgenda] = useState<horaAgenda[]>([])

    const formDiaInicial: FormDiaProps = {
        show: false,
        horaInicio: "",
        horaFim: "",
        dia: dia,
        mes: mes,
        ano: ano,
        idAgendamento: null
    }

    const [formDiaProps, setFormDiaProps] = useState<FormDiaProps>(formDiaInicial)

    const [carregando, setCarregando] = useState(false)
    const [mensagem, setMensagem] = useState("Carregando...")

    async function carregarHorasAgendadas() {

        try {
            setMensagem("Carregando horas da Agenda...")
            const token = (localStorage.getItem("tokenLogin") || sessionStorage.getItem("tokenLogin"))!
            const idUsuario = (localStorage.getItem("idUsuario") || sessionStorage.getItem("idUsuario"))!

            const dados = {
                dia: formDiaInicial.dia,
                mes: formDiaInicial.mes,
                ano: formDiaInicial.ano
            }

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/agenda/carregar/agendamentos/intervalo/dia`, dados, {
                headers: {
                    Authorization: token,
                    idUsuario: idUsuario
                }
            })

            //horas do dia
            const horas = Array.from({ length: 24 }, (_, i) => i);
            const horasAgendaFormatadas = gerarAgendaHorasDoDia(horas, response.data.dados)

            setHorasAgenda(horasAgendaFormatadas)
            setMensagem("Carregando...")
        } catch (error: any) {

            toast.error(error.response.data.message || error.message)
            setMensagem("Carregando...")
        }
    }

    useEffect(function () {

        async function carregar() {

            setCarregando(true)
            await carregarHorasAgendadas()
            setCarregando(false)
        }

        if (show) {

            setFormDiaProps(formDiaInicial)
            carregar()
        }
    }, [show])
    return (
        <Modal show={show} onHide={function () {
            onClose()
            setHorasAgenda([])
        }} size="xl">
            <Modal.Header closeButton>
                Agenda - {formDiaProps.dia}/{formDiaProps.mes}/{formDiaProps.ano}
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        {horasAgenda.map((hora) => (
                            <div className="px-1 col-lg-2 col-md-3 col-sm">
                                <div
                                    key={hora.hora}
                                    className={`border-bottom mb-1 py-1 text-center border-3 rounded 
                                        ${new Date(
                                        Number(ano),
                                        Number(mes) - 1, // mês começa do 0
                                        Number(dia),
                                        Number(hora.hora),
                                        0, // minutos
                                        0  // segundos
                                    ) <= new Date() || hora.ocupado == true ?
                                            hora.ocupado ? hora.status === "APROVADO" ? ' bg-success ' : " bg-warning " : ' bg-secondary ' : ' bg-primary '} text-white`}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={function () {

                                        const dataSelecionada = new Date(
                                            Number(ano),
                                            Number(mes) - 1, // mês começa do 0
                                            Number(dia),
                                            Number(hora.hora),
                                            0, // minutos
                                            0  // segundos
                                        )

                                        const agora = new Date()

                                        const indisponivel = dataSelecionada <= agora
                                        if (indisponivel && hora.ocupado == false) {

                                            toast.info("Horário não Disponível.")
                                            return
                                        }

                                        setFormDiaProps(function (form) {
                                            return {
                                                ...form,
                                                horaInicio: String(hora.hora).padStart(2, "0") + ":00",
                                                horaFim: String((hora.hora < 23 ? hora.hora + 1 : '0')).padStart(2, "0") + ":00",
                                                show: true,
                                                idAgendamento: hora.idAgendamento
                                            }
                                        })
                                    }}
                                >
                                    {/* Área clicável / eventos */}
                                    <div className="col-sm col-md-12 col-lg-12">
                                        <div
                                            className="w-100"
                                        >
                                            <small>
                                                {String(hora.hora).padStart(2, '0')}:00 {
                                                    new Date(
                                                        Number(ano),
                                                        Number(mes) - 1, // mês começa do 0
                                                        Number(dia),
                                                        Number(hora.hora),
                                                        0, // minutos
                                                        0  // segundos
                                                    ) <= new Date() || hora.ocupado == true ? hora.ocupado ? hora.status === "APROVADO" ? ' Aprovado' : " Pendente" : ' Indisponível' : ' Disponível'
                                                }
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal.Body>
            <ModalFormDia
                show={formDiaProps.show}
                horaInicio={formDiaProps.horaInicio}
                horaFim={formDiaProps.horaFim}
                dia={formDiaProps.dia}
                mes={formDiaProps.mes}
                ano={formDiaProps.ano}
                idAgendamento={formDiaProps.idAgendamento}
                onClose={function () {
                    setFormDiaProps(formDiaInicial)
                    carregarHorasAgendadas()
                }}
            />

            <ModalLoad carregando={carregando} mensagem={mensagem} />
        </Modal >
    )
}