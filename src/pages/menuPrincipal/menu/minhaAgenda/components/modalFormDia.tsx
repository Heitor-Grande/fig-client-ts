import InputComponente from "../../../../../components/inputComponent/inputComponente"
import ModalLoad from "../../../../../components/ModalLoad"
import TextAreaComponent from "../../../../../components/textarea/textareaComponent"
import axios from "axios"
import { toast } from "react-toastify"
import ButtonComponente from "../../../../../components/buttonComponent/buttonComponent"
import { Modal } from "react-bootstrap"
import validarCPF from "../../../../../functions/validarCpf"
import { useEffect, useState } from "react"
import { diaAgendaType } from "../../../../../types/globalTypes"
import { validarCelular } from "../../../../../functions/validaCelular"


interface ModalFormDia {
    show: boolean
    horaInicio: string
    horaFim: string
    dia: string
    mes: string
    ano: string
    onClose: () => void
}
export default function ModalFormDia({ show, horaInicio, horaFim, dia, mes, ano, onClose }: ModalFormDia) {

    //modal carregando
    const [carregando, setCarregando] = useState(false)
    const [mensagem, setMensagem] = useState("")
    const diaAgendaInicial = {
        id: "novo",
        horaInicio: horaInicio,
        horaFim: horaFim,
        dia: dia,
        mes: mes,
        ano: ano,
        nomeCompleto: "",
        celular: "",
        email: "",
        cpf: "",
        observacao: "",
        status: "PENDENTE"
    }

    useEffect(function () {

        const diaAgendaInicial = {
            id: "novo",
            horaInicio: horaInicio,
            horaFim: horaFim,
            dia: dia,
            mes: mes,
            ano: ano,
            nomeCompleto: "",
            celular: "",
            email: "",
            cpf: "",
            observacao: "",
            status: "PENDENTE"
        }

        setDiaAgenda(diaAgendaInicial)
    }, [show])

    const [diaAgenda, setDiaAgenda] = useState<diaAgendaType>(diaAgendaInicial)

    //função para alterar valores do formulario
    function handleValue(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {

        const id = e.target.id
        setDiaAgenda(function (dia) {

            return {
                ...dia,
                [id]: e.target.value
            }
        })
    }

    const token = (localStorage.getItem("tokenLogin") || sessionStorage.getItem("tokenLogin"))!
    const idUsuario = (localStorage.getItem("idUsuario") || sessionStorage.getItem("idUsuario"))!

    async function submit(e: React.FormEvent<HTMLFormElement>) {

        try {
            setCarregando(true)
            setMensagem("Executando Agendamento...")
            e.preventDefault()


            const celularValido = validarCelular(diaAgenda.celular)
            if (celularValido == false) {

                toast.info("Número de Celular Inválido.")
                return
            }

            const cpfValido = validarCPF(diaAgenda.cpf)
            if (cpfValido == false) {

                toast.info("CPF Inválido.")
                return
            }

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/agenda/criar/novo/agendamento`, diaAgenda, {
                headers: {
                    Authorization: token,
                    idUsuario: idUsuario
                }
            })

            toast.success(response.data.msg)
            onClose()
        } catch (error: any) {

            toast.error(error.response.data.message || error.message)
        }
        finally {

            setCarregando(false)
            setMensagem("")
        }
    }

    return (
        <Modal show={show} onHide={onClose} size="lg">
            <Modal.Header closeButton>
                {diaAgenda.dia}/{diaAgenda.mes}/{diaAgenda.ano} {diaAgenda.horaInicio} às {diaAgenda.horaFim}
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <form onSubmit={submit}>
                        <div className="row">
                            <div className="col-sm col-md-12 col-lg-12">
                                <p className="text-center">Para realizar o agendamento neste horário, preencha as informações.</p>
                            </div>
                            <div className="col-sm col-md-12 col-lg-12">
                                <InputComponente
                                    label="Nome Completo"
                                    tipo="text"
                                    required
                                    className=""
                                    id="nomeCompleto"
                                    placeholder="Seu nome completo"
                                    value={diaAgenda.nomeCompleto}
                                    onchange={handleValue}
                                    readOnly={false}
                                    minLength={3}
                                    maxLength={30}

                                />
                            </div>
                            <div className="col-sm col-md-12 col-lg-12 mt-1">
                                <InputComponente
                                    label="Número de Celular para Contato (DD + numero)"
                                    tipo="text"
                                    required
                                    className=""
                                    id="celular"
                                    placeholder="Número para contato"
                                    value={diaAgenda.celular}
                                    onchange={handleValue}
                                    readOnly={false}
                                    minLength={3}
                                    maxLength={30}

                                />
                            </div>
                            <div className="col-sm col-md-12 col-lg-12 mt-1">
                                <InputComponente
                                    label="E-mail para Contato"
                                    tipo="email"
                                    required={false}
                                    className=""
                                    id="email"
                                    placeholder="E-mail para contato"
                                    value={diaAgenda.email}
                                    onchange={handleValue}
                                    readOnly={false}
                                    minLength={3}
                                    maxLength={30}

                                />
                            </div>
                            <div className="col-sm col-md-12 col-lg-12 mt-1">
                                <InputComponente
                                    label="CPF"
                                    tipo="text"
                                    required
                                    className=""
                                    id="cpf"
                                    placeholder="Documento"
                                    value={diaAgenda.cpf}
                                    onchange={handleValue}
                                    readOnly={false}
                                    minLength={3}
                                    maxLength={30}
                                />
                            </div>
                            <div className="col-sm col-md-12 col-lg-12 mt-1">
                                <TextAreaComponent
                                    label="Observação - Opcional"
                                    required={false}
                                    className=""
                                    id="observacao"
                                    value={diaAgenda.observacao}
                                    onchange={handleValue}
                                    disabled={false}
                                    rows={5}
                                    maxLength={50}
                                    minLength={0}
                                />
                            </div>
                            <div className="col-sm col-md-12 col-lg-12 mt-1 text-end">
                                <ButtonComponente
                                    type="submit"
                                    label="Solicitar Agendamento"
                                    onClick={function () {

                                    }}
                                    className="btn-primary w-100"
                                    icon="bi bi-send"
                                    disabled={false}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <ModalLoad
                carregando={carregando}
                mensagem={mensagem}
            />
        </Modal>

    )
}