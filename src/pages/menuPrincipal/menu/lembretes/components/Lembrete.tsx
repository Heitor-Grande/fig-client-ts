import { useState } from "react"
import InputComponente from "../../../../../components/inputComponent/inputComponente"
import { LembreteType } from "../interface.card"
import { toast } from "react-toastify"

interface LembreteProps {
    lembretesIniciais: LembreteType[]
}

export function Lembrete({ lembretesIniciais }: LembreteProps) {

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
                                <div className="col-sm col-md-12 col-lg-12">
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

                                <div className="col-sm col-md-12 col-lg-12 mt-3">
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

                                <div className="col-sm col-md-12 col-lg-12 mt-3">
                                    <strong className="text-info">
                                        <i className="bi bi-arrow-repeat me-2"></i>
                                    </strong>
                                    <InputComponente
                                        label="Recorrência"
                                        tipo="datetime-local"
                                        required
                                        className="d-block mt-1 w-100"
                                        id="recorrencia"
                                        placeholder="Recorrência"
                                        onchange={(e) =>
                                            onChangeLembrete(e.target.id, e.target.value, index)
                                        }
                                        value={item.recorrencia}
                                        readOnly={item.readOnly}
                                    />
                                </div>

                                <div className="col-sm col-md-12 col-lg-12 mt-3">
                                    <strong className="text-secondary">
                                        <i className="bi bi-calendar-plus me-2"></i>
                                    </strong>
                                    <InputComponente
                                        label="Criado em"
                                        tipo="datetime-local"
                                        required
                                        className="d-block mt-1 w-100"
                                        id="dataCriacao"
                                        placeholder="Criado Em"
                                        onchange={(e) =>
                                            onChangeLembrete(e.target.id, e.target.value, index)
                                        }
                                        value={item.dataCriacao}
                                        readOnly={true}
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="card-footer bg-light border-0 d-flex justify-content-end gap-2">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => onChangeLembrete("readOnly", false, index)}
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>

                                <button className="btn btn-danger btn-sm">
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>

                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}
