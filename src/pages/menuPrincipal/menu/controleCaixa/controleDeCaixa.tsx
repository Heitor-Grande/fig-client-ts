import { useEffect, useState } from "react"
import Table from "../../../../components/table/table"
import axios from "axios"
import ModalLoad from "../../../../components/ModalLoad";
import { toast } from "react-toastify"
import formatarDinheiro from "../../../../functions/formatarDinheiro";
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ButtonComponente from "../../../../components/buttonComponent/buttonComponent";
function ControleDeCaixa() {
    const [rows, setRows] = useState([])
    const columns = [
        {
            field: "titulo",
            headerName: "Título",
            width: 400,
            type: "string",
            cellClassName: function () {
                return 'text-capitalize '
            }
        },
        {
            field: "valor",
            headerName: "Valor",
            width: 150,
            type: "string",
            cellClassName: function (objColuna: any) {
                objColuna.formattedValue = formatarDinheiro.formatarValorFixo(objColuna.formattedValue)
            }
        },
        {
            field: "datamovimento",
            headerName: "Data do Movimento",
            width: 150,
            type: "Date"
        },
        {
            field: "tipo",
            headerName: "Tipo",
            width: 100,
            type: "string",
            cellClassName: function (objColuna: any) {
                if (objColuna.formattedValue == "S") {
                    return 'bg-danger text-white text-center'
                }
                else if (objColuna.formattedValue == "E") {
                    return 'bg-success text-white text-center'
                }
            }
        }
    ]
    const [showModalLoading, setShowModalLoading] = useState(false)
    const token = sessionStorage.getItem("tokenLogin") || localStorage.getItem("tokenLogin")

    function carregarMovimentos() {
        setShowModalLoading(true)
        axios.get(`${process.env.REACT_APP_API_URL}/controle-caixa/carregar/movimentos/caixa`, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            setRows(resposta.data.movimentos)
            setShowModalLoading(false)
        }).catch(function (erro) {
            toast.error(erro.response.data.message || erro.message)
            setShowModalLoading(false)
        })
    }
    useEffect(function () {
        carregarMovimentos()
    }, [])
    function onRowClick(dados: any) {
        window.location.href = `/home/controle/caixa/formulario/${dados.id}/editar`
    }
    function CriarNovo() {
        window.location.href = '/home/controle/caixa/formulario/0/novo'
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm col-md-12 col-12">
                    <h4>Controle de caixa</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-sm col-md-12 col-lg-12">
                    <div className="card">
                        <div className="card-body text-end">
                            <ButtonComponente
                                type="button"
                                className="btn-outline-primary w-100"
                                label="Criar Novo Movimento"
                                onClick={CriarNovo}
                                icon="bi bi-plus-lg"
                            />
                            <Table
                                rows={rows}
                                columns={columns}
                                checkboxSelection={false}
                                pageSize={15}
                                pageSizeOptions={[15, 20, 25]}
                                onRowClick={onRowClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ModalLoad
                carregando={showModalLoading}
                mensagem={"Carregando..."}
            />
        </div>
    )
}

export default ControleDeCaixa