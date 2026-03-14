import { useEffect, useState } from "react"
import InputComponente from "../../../../../components/inputComponent/inputComponente"
import { LembreteType, typeModalLoad } from "../../../../../types/globalTypes"
import { toast } from "react-toastify"
import axios from "axios"
import ModalLoad from "../../../../../components/ModalLoad"
import SelectComponente from "../../../../../components/selectComponent/selectComponent"
import ModalConfirmacao from "../../../../../components/modalConfirmacao/modalConfirmacao"
import TextAreaComponent from "../../../../../components/textarea/textareaComponent"
import ButtonComponente from "../../../../../components/buttonComponent/buttonComponent"

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
        <div className="col-sm col-md-12 col-lg-12">
            <div className="row">
                {lembretes.map((item, index) => (
                    <div className="col-sm-6 col-md-4 col-lg-4 mt-2" key={index}>
                        <form onSubmit={function (e) {
                            e.preventDefault()
                            atualizarLembrete(item, index)
                        }}>
                            <div className="col-md-12 col-lg-12">
                                <div className="card shadow border-0 h-100 bg-light">

                                    {/* Header */}
                                    <div className="card-header bg-primary text-white border-0">
                                        <strong>
                                            <i className="bi bi-bell me-2"></i>
                                        </strong>

                                        {
                                            item.disparado ? <span className="badge bg-success">Enviado</span> : <span className="badge bg-secondary">Pendente</span>
                                        }

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
                                                <div className="col-sm col-md-12 col-lg-12">
                                                    <strong className="text-primary">
                                                        <i className="bi bi-card-text me-2"></i>
                                                    </strong>

                                                    <TextAreaComponent
                                                        label="Descrição"
                                                        className=""
                                                        id="descricao"
                                                        onchange={(e) =>
                                                            onChangeLembrete(e.target.id, e.target.value, index)
                                                        }
                                                        rows={2}
                                                        value={item.descricao}
                                                        disabled={item.readOnly}
                                                        maxLength={50}
                                                        minLength={10}
                                                        required
                                                    />
                                                </div>

                                                <div className="col-sm col-md-6 col-lg-12 mt-1">
                                                    <strong className="text-info">
                                                        <i className="bi bi-arrow-repeat me-2"></i>
                                                    </strong>
                                                    <SelectComponente
                                                        label="Recorrência"
                                                        id="recorrencia"
                                                        required
                                                        onchange={
                                                            (e) =>
                                                                onChangeLembrete(e.target.id, e.target.value, index)
                                                        }
                                                        options={[
                                                            {
                                                                label: "Unico", value: "Unico",
                                                            },
                                                            {
                                                                label: "Diario", value: "Diario",
                                                            }
                                                        ]}
                                                        disabled={item.readOnly}
                                                        value={item.recorrencia}
                                                    />
                                                    <small className="d-block text-center text-color-icon">{item.recorrencia == "Diario" ? "O lembrete será Disparado todos os dias na Data Programada." : ""}</small>
                                                </div>

                                                <div className="col-sm col-md-6 col-lg-6 mt-1">
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


                                                <div className="col-sm col-md-6 col-lg-6 mt-1">
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
                                            item.readOnly && <ButtonComponente
                                                type="button"
                                                className="btn-primary"
                                                label=""
                                                onClick={() => onChangeLembrete("readOnly", false, index)}
                                                icon="bi bi-pencil-square"
                                            />

                                        }

                                        {
                                            !item.readOnly && (
                                                <ButtonComponente
                                                    type="submit"
                                                    className="btn-primary"
                                                    label=""
                                                    icon="bi bi-floppy-fill"
                                                />
                                            )
                                        }


                                        <ButtonComponente
                                            type="button"
                                            className="btn-danger"
                                            label=""
                                            onClick={function () {

                                                setLembreteRemover(item)
                                                setShowModalConfirmacao(true)
                                            }}
                                            icon="bi bi-trash"
                                        />

                                    </div>

                                </div>
                            </div>
                        </form>
                    </div>
                ))
                }
            </div >
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
        </div >
    )
}
