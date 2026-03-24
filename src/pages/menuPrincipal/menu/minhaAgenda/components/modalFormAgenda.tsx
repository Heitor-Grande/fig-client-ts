import axios from "axios"
import { toast } from "react-toastify"
import { Modal } from "react-bootstrap"
import ModalFormDia from "./modalFormDia"
import { useEffect, useState } from "react"


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
}

export default function FormAgenda({ show, onClose, dia, mes, ano }: FormAgendaProps) {

    //horas do dia
    const horas = Array.from({ length: 24 }, (_, i) => i)


    useEffect(function () {
        const formDiaInicial = {
            show: false,
            horaInicio: "",
            horaFim: "",
            dia: dia,
            mes: mes,
            ano: ano
        }

        setFormDiaProps(formDiaInicial)
    }, [show])

    const formDiaInicial = {
        show: false,
        horaInicio: "",
        horaFim: "",
        dia: dia,
        mes: mes,
        ano: ano
    }

    const [formDiaProps, setFormDiaProps] = useState<FormDiaProps>(formDiaInicial)

    return (
        <Modal show={show} onHide={onClose} size="xl">
            <Modal.Header closeButton>
                Agenda - {formDiaProps.dia}/{formDiaProps.mes}/{formDiaProps.ano}
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        {horas.map((hora) => (
                            <div className="px-1 col-lg-2 col-md-3 col-sm">
                                <div
                                    key={hora}
                                    className={`border-bottom mb-1 py-1 text-center border-3 rounded 
                                        ${new Date(
                                        Number(ano),
                                        Number(mes) - 1, // mês começa do 0
                                        Number(dia),
                                        Number(hora),
                                        0, // minutos
                                        0  // segundos
                                    ) <= new Date() ?
                                            ' bg-secondary ' : ' bg-primary '} text-white`}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                    onClick={function () {

                                        const dataSelecionada = new Date(
                                            Number(ano),
                                            Number(mes) - 1, // mês começa do 0
                                            Number(dia),
                                            Number(hora),
                                            0, // minutos
                                            0  // segundos
                                        )

                                        const agora = new Date()

                                        const indisponivel = dataSelecionada <= agora
                                        if (indisponivel) {

                                            toast.info("Horário não Disponível.")
                                            return
                                        }

                                        setFormDiaProps(function (form) {
                                            return {
                                                ...form,
                                                horaInicio: String(hora).padStart(2, "0") + ":00",
                                                horaFim: String((hora < 23 ? hora + 1 : '0')).padStart(2, "0") + ":00",
                                                show: true
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
                                                {String(hora).padStart(2, '0')}:00 {
                                                    new Date(
                                                        Number(ano),
                                                        Number(mes) - 1, // mês começa do 0
                                                        Number(dia),
                                                        Number(hora),
                                                        0, // minutos
                                                        0  // segundos
                                                    ) <= new Date() ? ' Indisponível' : ' Disponível'
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
                onClose={function () {
                    setFormDiaProps(formDiaInicial)
                }}
            />
        </Modal >
    )
}