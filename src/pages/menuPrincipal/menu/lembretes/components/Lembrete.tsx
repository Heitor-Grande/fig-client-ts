import { useEffect, useState } from "react"
import InputComponente from "../../../../../components/inputComponent/inputComponente"
import { LembreteType, typeModalLoad } from "../../../../../types/globalTypes"
import { toast } from "react-toastify"
import axios from "axios"
import ModalLoad from "../../../../../components/ModalLoad"
import SelectComponente from "../../../../../components/selectComponent/selectComponent"
import ModalConfirmacao from "../../../../../components/modalConfirmacao/modalConfirmacao"

export function Lembrete({ lembretesIniciais, carregarLembretes }: { lembretesIniciais: LembreteType[], carregarLembretes: () => void }) {

    const [lembretes, setLembretes] = useState<LembreteType[]>(lembretesIniciais)

    //função para mudar os valores do Lembrete
    async function onChangeLembrete(idCampo: string, value: string | boolean, index: number) {

        try {
            setLembretes(function (lembretes) {

                return lembretes.map(function (lembrete, i) {
                    if (i === index) {

                        return {
                            ...lembrete,
                            [idCampo]: value
                        }
                    } else {

                        return lembrete
                    }
                });
            });

        } catch (error) {

            toast.error("Erro no Onchange.")
        }
    }

    const [carregando, setCarregando] = useState<typeModalLoad>({
        carregando: false,
        mensagem: "Atualizando Lembrete"
    })

    const token = (localStorage.getItem("tokenLogin") || sessionStorage.getItem("tokenLogin"))!
    const idUsuario = (localStorage.getItem("idUsuario") || sessionStorage.getItem("idUsuario"))!

    async function atualizarLembrete(lembrete: LembreteType, index: number) {

        try {

            setCarregando(function (carregando) {
                return {
                    ...carregando,
                    carregando: true
                }
            })

            const response = await axios.put(`${process.env.REACT_APP_API_URL}/lembrete/atualizar/lembrete`, lembrete, {
                headers: {
                    Authorization: token,
                    idUsuario: idUsuario
                }
            })
            onChangeLembrete("readOnly", true, index)
            setCarregando(function (carregando) {
                return {
                    ...carregando,
                    carregando: false
                }
            })

            carregarLembretes()

            toast.success(response.data.msg)

        } catch (error: any) {

            setCarregando(function (carregando) {
                return {
                    ...carregando,
                    carregando: false
                }
            })

            carregarLembretes()

            toast.error(error.response.data.message || error.message)
        }
    }

    const [showModalConfirmacao, setShowModalConfirmacao] = useState(false)

    const [lembreteRemover, setLembreteRemover] = useState<LembreteType>()
    async function removerLembrete() {

        try {

            setCarregando(function (carregando) {
                return {
                    ...carregando,
                    carregando: true
                }
            })

            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/lembrete/remover/${lembreteRemover?.id}/${lembreteRemover?.idusuario}`, {
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

            toast.success(response.data.msg)

            carregarLembretes()


        } catch (error: any) {

            setCarregando(function (carregando) {
                return {
                    ...carregando,
                    carregando: false
                }
            })

            carregarLembretes()

            toast.error(error.response.data.message || error.message)
        }
    }

    return (
        <div className="container mt-4">
            <div className="row g-3">
                {lembretes.map((item, index) => (
                    <div className="col-md-6 col-lg-4" key={index}>
                        <div className="card shadow border-0 h-100 bg-light">

                            {/* Header */}
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
                                    onchange={(e) =>
                                        onChangeLembrete(e.target.id, e.target.value, index)
                                    }
                                    value={item.titulo}
                                    readOnly={item.readOnly}
                                    maxLength={25}
                                    minLength={5}
                                />
                            </div>

                            <div className="card-body p-3 bg-white">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm col-md-6 col-lg-6">
                                            <strong className="text-primary">
                                                <i className="bi bi-card-text me-2"></i>
                                            </strong>
                                            <InputComponente
                                                label="Descrição"
                                                tipo="textarea"
                                                required
                                                className="d-block mt-1 w-100"
                                                id="descricao"
                                                placeholder="Descrição"
                                                onchange={(e) =>
                                                    onChangeLembrete(e.target.id, e.target.value, index)
                                                }
                                                value={item.descricao}
                                                readOnly={item.readOnly}
                                                maxLength={50}
                                                minLength={10}
                                            />
                                        </div>

                                        <div className="col-sm col-md-6 col-lg-6">
                                            <strong className="text-warning">
                                                <i className="bi bi-alarm me-2"></i>
                                            </strong>
                                            <InputComponente
                                                label="Data de Disparo"
                                                tipo="datetime-local"
                                                required
                                                className="d-block mt-1 w-100"
                                                id="dataDoDisparo"
                                                placeholder="Data de Disparo"
                                                onchange={(e) =>
                                                    onChangeLembrete(e.target.id, e.target.value, index)
                                                }
                                                value={item.dataDoDisparo}
                                                readOnly={item.readOnly}
                                            />
                                        </div>

                                        <div className="col-sm col-md-6 col-lg-6 mt-3">
                                            <strong className="text-info">
                                                <i className="bi bi-arrow-repeat me-2"></i>
                                            </strong>
                                            <SelectComponente
                                                label="Recorrência"
                                                required
                                                onchange={
                                                    (e) =>
                                                        onChangeLembrete(e.target.id, e.target.value, index)
                                                }
                                                options={[{
                                                    label: "Semanal", value: "Semanal",
                                                },
                                                {
                                                    label: "Diario", value: "Diario",
                                                },
                                                {
                                                    label: "Mensal", value: "Mensal",
                                                },
                                                {
                                                    label: "Anual", value: "Anual",
                                                },
                                                {
                                                    label: "Unico", value: "Unico",
                                                }
                                                ]}
                                                disabled={item.readOnly}
                                                value={item.recorrencia}
                                            />
                                        </div>

                                        <div className="col-sm col-md-6 col-lg-6 mt-3">
                                            <strong className="text-secondary">
                                                <i className="bi bi-calendar-plus me-2"></i>
                                            </strong>
                                            <InputComponente
                                                label="Criado em"
                                                tipo="date"
                                                required
                                                className="d-block mt-1 w-100"
                                                id="dataCriacao"
                                                placeholder="Criado Em"
                                                onchange={function (e) {

                                                }
                                                }
                                                value={item.dataCriacao.toString().split("T")[0]}
                                                readOnly={true}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Footer */}
                            <div className="card-footer bg-light border-0 d-flex justify-content-end gap-2">
                                {
                                    item.readOnly ? <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => onChangeLembrete("readOnly", false, index)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button> : <button
                                        className="btn btn-primary btn-sm"
                                        onClick={function () { atualizarLembrete(item, index) }}
                                    >
                                        <i className="bi bi-floppy-fill"></i>
                                    </button>
                                }

                                <button className="btn btn-danger btn-sm" onClick={function () {
                                    setLembreteRemover(item)
                                    setShowModalConfirmacao(true)
                                }}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>

                        </div>
                    </div>

                ))}
            </div>
            <ModalLoad carregando={carregando.carregando} mensagem={carregando.mensagem} />
            <ModalConfirmacao
                mostrar={showModalConfirmacao}
                mensagemPrincipal="Remover o Lembrete? Essa ação não pode ser revertida."
                labelBtnConfirmar="Remover"
                labelBtnCancelar="Cancelar"
                acaoBtnConfirmar={removerLembrete}
                acaoBtnCancelar={function () {
                    setShowModalConfirmacao(false)
                }}
            />
        </div>
    )
}
