import { Lembrete } from "./components/Lembrete"
import { LembreteType, typeModalLoad } from "../../../../types/globalTypes"
import InputComponente from "../../../../components/inputComponent/inputComponente"
import { useEffect, useState } from "react"
import ModalLoad from "../../../../components/ModalLoad"
import { toast } from "react-toastify"
import axios from "axios"

export function Lembretes() {

    const token = (localStorage.getItem("tokenLogin") || sessionStorage.getItem("tokenLogin"))!
    const idUsuario = (localStorage.getItem("idUsuario") || sessionStorage.getItem("idUsuario"))!


    const [listaDeLembretes, setListaDeLembretes] = useState<LembreteType[]>([])

    const lembreteInicial: LembreteType = {
        idusuario: (localStorage.getItem("idUsuario") || sessionStorage.getItem("idUsuario"))!,
        titulo: "",
        dataCriacao: "",
        descricao: "",
        dataDoDisparo: "",
        id: "",
        readOnly: false,
        recorrencia: "Diario",

    }
    const [novoLembrete, setNovoLembrete] = useState<LembreteType>(lembreteInicial)

    const [carregando, setCarregando] = useState<typeModalLoad>({
        carregando: false,
        mensagem: "Carregando Configurações de Lembrete"
    })

    async function criarLembrete(e: React.FormEvent<HTMLFormElement>) {

        try {

            e.preventDefault()
            setCarregando(function (carregando) {
                return {
                    ...carregando,
                    carregando: true
                }
            })

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/lembrete/criar`, novoLembrete, {
                headers: {
                    Authorization: token,
                    idUsuario: idUsuario
                }
            })



            setCarregando(function (carregando) {
                return {
                    ...carregando,
                    carregando: false
                }
            })

            await carregarLembretes(idUsuario, token)

            setNovoLembrete(lembreteInicial)
            toast.success(response.data.msg)
        } catch (error: any) {


            setCarregando(function (carregando) {
                return {
                    ...carregando,
                    carregando: false
                }
            })

            await carregarLembretes(idUsuario, token)

            toast.error(error.response.data.message || error.message)
        }
    }

    async function carregarLembretes(idusuario: string, token: string) {

        try {
            setCarregando(function (carregando) {
                return {
                    ...carregando,
                    carregando: true
                }
            })

            const response = await axios.get(`${process.env.REACT_APP_API_URL}/lembrete/carregar/todos/lembretes/${idusuario}`, {
                headers: {
                    Authorization: token,
                    idUsuario: idusuario
                }
            })

            setListaDeLembretes(response.data.lembretes)

            setCarregando(function (carregando) {
                return {
                    ...carregando,
                    carregando: false
                }
            })

        } catch (error: any) {

            setCarregando(function (carregando) {
                return {
                    ...carregando,
                    carregando: false
                }
            })
            toast.error(error.response.data.message || error.message)
        }
    }

    useEffect(function () {

        async function carregar() {
            await carregarLembretes(idUsuario, token)
        }

        carregar()
    }, [])
    return (
        <div className="container-fluid">
            <div className="row text-center">
                <div className="col-sm col-md-12 col-lg-12">
                    <p className="text-center">
                        Crie seus Lembretes.
                    </p>
                    <p className="text-center">
                        Os lembretes podem ser classificados em <b>"Diário", "Semanal", "Mensal" ou "Único"</b>.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="container-fluid d-flex justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <form onSubmit={criarLembrete}>
                            <div className="card shadow border-0 h-100 bg-light">
                                <div className="card-header bg-primary bg-gradient text-white border-0">
                                    <strong>
                                        <i className="bi bi-bell me-2"></i>
                                    </strong>

                                    <InputComponente
                                        label="Lembrete"
                                        tipo="text"
                                        required
                                        className="d-block mt-2 w-100"
                                        id="titulo"
                                        placeholder="Titulo"
                                        onchange={
                                            function (e) {
                                                setNovoLembrete(function (lembrete) {
                                                    return {
                                                        ...lembrete,
                                                        titulo: e.target.value
                                                    }
                                                })
                                            }
                                        }
                                        value={novoLembrete.titulo}
                                        readOnly={false}
                                        maxLength={25}
                                        minLength={5}
                                    />
                                </div>
                                {/* Footer */}
                                <div className="card-footer bg-light border-0 d-flex justify-content-end">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        type="submit"
                                    >
                                        <i className="bi bi-file-earmark-plus-fill me-1"></i>
                                        Adicionar Lembrete
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <hr className="w-75 mx-auto" />
            <div className="row mt-3">
                <div className="col-sm col-md-12 col-lg-12">
                    <h5 className="text-center fs-4">Meus Lembretes</h5>
                </div>
            </div>
            <div className="row mt-3 mb-3">
                {
                    listaDeLembretes.length > 0 && carregando.carregando != true && (
                        <Lembrete lembretesIniciais={listaDeLembretes} carregarLembretes={async function () {
                            await carregarLembretes(idUsuario, token)
                        }} />
                    )
                }
            </div>

            <ModalLoad carregando={carregando.carregando} mensagem={carregando.mensagem} />
        </div>
    )
}