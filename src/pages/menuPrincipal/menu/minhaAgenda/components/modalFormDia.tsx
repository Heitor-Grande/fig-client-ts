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
import ModalConfirmacao from "../../../../../components/modalConfirmacao/modalConfirmacao"


interface ModalFormDia {
    show: boolean
    horaInicio: string
    horaFim: string
    dia: string
    mes: string
    ano: string
    idAgendamento: null | number | undefined
    onClose: () => void
}
export default function ModalFormDia({ show, horaInicio, horaFim, dia, mes, ano, idAgendamento, onClose }: ModalFormDia) {

    //modal carregando
    const [carregando, setCarregando] = useState(false)
    const [mensagem, setMensagem] = useState("")
    const diaAgendaInicial = {
        id: idAgendamento,
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
            id: idAgendamento,
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

            if (diaAgenda.id !== undefined && diaAgenda.id !== null) {

                toast.info("Ops! Algo estranho ocorreu ao tentar Enviar.")
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

    async function carregarAgendamento() {

        try {
            setCarregando(true)
            setMensagem("Carregando agendamento...")

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/agenda/carregar/agendamento/dia/unico/detalhado/${diaAgenda.id}`, {
                headers: {
                    Authorization: token,
                    idUsuario: idUsuario
                }
            })

            const info = response.data.dado
            const agendamento = {
                id: info.idagendamento,
                horaInicio: horaInicio,
                horaFim: horaFim,
                dia: dia,
                mes: mes,
                ano: ano,
                nomeCompleto: info.nome_completo,
                celular: info.celular,
                email: info.email,
                cpf: info.cpf,
                observacao: info.observacao,
                status: info.status
            }

            setDiaAgenda(agendamento)
        } catch (error: any) {

            toast.error(error.response.data.message || error.message)
        } finally {

            setMensagem("")
            setCarregando(false)
        }
    }

    //modal de confirmar recusa
    const [showModalConfirmarRecusa, setShowModalConfirmarRecusa] = useState(false)
    async function recusarOUcancelarAgendamento() {

        try {
            setShowModalConfirmarRecusa(false)
            setCarregando(true)
            setMensagem("Excluindo agendamento...")

            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/agenda/deletar/agendamento/recusado/cancelado/${diaAgenda.id}`, {
                headers: {
                    Authorization: token,
                    idUsuario: idUsuario
                }
            })

            toast.success(response.data.msg)
            onClose()
            setDiaAgenda(diaAgendaInicial)
        } catch (error: any) {

            toast.error(error.response.data.message || error.message)
        } finally {

            setMensagem("")
            setCarregando(false)
        }
    }

    //modal aprovar agendamento
    const [showModalConfirmarAgendamento, setShowModalConfirmarAgendamento] = useState(false)
    async function confirmarAgendamento() {

        try {
            setShowModalConfirmarAgendamento(false)
            setCarregando(true)
            setMensagem("Confirmando Agendamento...")

            const response = await axios.put(`${process.env.REACT_APP_API_URL}/agenda/aprovar/agendamento/${diaAgenda.id}`, null, {
                headers: {
                    Authorization: token,
                    idUsuario: idUsuario
                }
            })

            toast.success(response.data.msg)
            onClose()
            setDiaAgenda(diaAgendaInicial)
        } catch (error: any) {

            toast.error(error.response.data.message || error.message)
        } finally {

            setMensagem("")
            setCarregando(false)
        }
    }

    //modal finalizar agendamento
    const [showModalFinalizarAgendamento, setShowModalFinalizarAgendamento] = useState(false)
    async function FinalizarAgendamento() {

        try {
            setShowModalFinalizarAgendamento(false)
            setCarregando(true)
            setMensagem("Confirmando Agendamento...")

            const response = await axios.put(`${process.env.REACT_APP_API_URL}/agenda/finalizar/agendamento/${diaAgenda.id}`, null, {
                headers: {
                    Authorization: token,
                    idUsuario: idUsuario
                }
            })

            toast.success(response.data.msg)
            onClose()
            setDiaAgenda(diaAgendaInicial)
        } catch (error: any) {

            toast.error(error.response.data.message || error.message)
        } finally {

            setMensagem("")
            setCarregando(false)
        }
    }


    useEffect(function () {

        if (show && diaAgenda.id) {

            carregarAgendamento()
        }
    }, [diaAgenda.id])

    return (
        <Modal show={show} onHide={function () {
            onClose()
            setDiaAgenda(diaAgendaInicial)
        }} size="lg" centered>
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
                            <div className="col-sm col-md-12 col-lg-5">
                                <InputComponente
                                    label="Nome Completo"
                                    tipo="text"
                                    required
                                    className=""
                                    id="nomeCompleto"
                                    placeholder="Seu nome completo"
                                    value={diaAgenda.nomeCompleto}
                                    onchange={handleValue}
                                    readOnly={diaAgenda.id ? true : false}
                                    minLength={3}
                                    maxLength={30}

                                />
                            </div>
                            <div className="col-sm col-md-12 col-lg-5">
                                <InputComponente
                                    label="Número de Celular (DD + numero)"
                                    tipo="text"
                                    required
                                    className=""
                                    id="celular"
                                    placeholder="Número para contato"
                                    value={diaAgenda.celular}
                                    onchange={handleValue}
                                    readOnly={diaAgenda.id ? true : false}
                                    minLength={3}
                                    maxLength={30}

                                />
                            </div>
                            <div className="col-sm col-md-12 col-lg-2">
                                <InputComponente
                                    label="Status"
                                    tipo="text"
                                    required
                                    className="text-center"
                                    id="status"
                                    placeholder="status"
                                    value={diaAgenda.status}
                                    onchange={handleValue}
                                    readOnly={true}
                                    minLength={3}
                                    maxLength={30}
                                />
                            </div>
                            <div className="col-sm col-md-12 col-lg-6 mt-1">
                                <InputComponente
                                    label="E-mail para Contato"
                                    tipo="email"
                                    required={true}
                                    className=""
                                    id="email"
                                    placeholder="E-mail para contato"
                                    value={diaAgenda.email}
                                    onchange={handleValue}
                                    readOnly={diaAgenda.id ? true : false}
                                    minLength={3}
                                    maxLength={30}

                                />
                            </div>
                            <div className="col-sm col-md-12 col-lg-6 mt-1">
                                <InputComponente
                                    label="CPF"
                                    tipo="text"
                                    required
                                    className=""
                                    id="cpf"
                                    placeholder="Documento"
                                    value={diaAgenda.cpf}
                                    onchange={handleValue}
                                    readOnly={diaAgenda.id ? true : false}
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
                                    disabled={diaAgenda.id ? true : false}
                                    rows={5}
                                    maxLength={50}
                                    minLength={0}
                                />
                            </div>
                            <hr className="mt-2" />
                            {
                                (diaAgenda.id == null || diaAgenda == undefined) && (
                                    <div className="col-sm col-md-12 col-lg-12 mt-1 text-end">
                                        <ButtonComponente
                                            type="submit"
                                            label="Solicitar Agendamento"
                                            onClick={function () {

                                            }}
                                            className="btn-primary w-100"
                                            icon="bi bi-send"
                                            disabled={diaAgenda.id ? true : false}
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </form>
                    <div className="row">
                        <div className="col-sm col-md col-lg-6 mt-1">
                            {
                                diaAgenda.id && (
                                    <ButtonComponente
                                        type="button"
                                        label="Recusar/Cancelar Agendamento"
                                        onClick={function () {
                                            setShowModalConfirmarRecusa(true)
                                        }}
                                        className="btn btn-outline-danger w-100"
                                        icon="bi bi-hand-thumbs-down-fill"
                                    />
                                )
                            }
                        </div>
                        <div className="col-sm col-md col-lg-6 mt-1">
                            {
                                (diaAgenda.id && diaAgenda.status == "PENDENTE") && (
                                    <ButtonComponente
                                        type="button"
                                        label="Aceitar Agendamento"
                                        onClick={function () {
                                            setShowModalConfirmarAgendamento(true)
                                        }}
                                        className="btn btn-outline-primary w-100"
                                        icon="bi bi-hand-thumbs-up-fill"
                                    />
                                )
                            }
                            {
                                (diaAgenda.id && diaAgenda.status == "APROVADO") && (
                                    <ButtonComponente
                                        type="button"
                                        label="Finalizar Agendamento"
                                        onClick={function () {
                                            setShowModalFinalizarAgendamento(true)
                                        }}
                                        className="btn btn-outline-primary w-100"
                                        icon="bi bi-check-all"
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <ModalLoad
                carregando={carregando}
                mensagem={mensagem}
            />

            <ModalConfirmacao
                mostrar={showModalConfirmarAgendamento}
                mensagemPrincipal="Confirmar Agendamento?"
                labelBtnConfirmar="Confirmar"
                acaoBtnConfirmar={confirmarAgendamento}
                labelBtnCancelar="Cancelar"
                acaoBtnCancelar={function () {

                    setShowModalConfirmarAgendamento(false)
                }}
            />

            <ModalConfirmacao
                mostrar={showModalConfirmarRecusa}
                mensagemPrincipal="Confirma que deseja recusar/remover o Agendamento?"
                labelBtnConfirmar="Confirmar"
                acaoBtnConfirmar={recusarOUcancelarAgendamento}
                labelBtnCancelar="Cancelar"
                acaoBtnCancelar={function () {

                    setShowModalConfirmarRecusa(false)
                }}
            />

            <ModalConfirmacao
                mostrar={showModalFinalizarAgendamento}
                mensagemPrincipal="Ao finalizar o agendamento, será gerado uma entrada de caixa para maior controle do seu negócio. Confirmar essa ação?"
                labelBtnConfirmar="Confirmar"
                acaoBtnConfirmar={FinalizarAgendamento}
                labelBtnCancelar="Cancelar"
                acaoBtnCancelar={function () {

                    setShowModalFinalizarAgendamento(false)
                }}
            />
        </Modal>

    )
}