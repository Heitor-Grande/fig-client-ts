import { useEffect, useRef, useState } from "react"
import InputComponente from "../../../src/components/inputComponent/inputComponente"
import Button from '@mui/material/Button';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import formatarDinheiro from "../../functions/formatarDinheiro"
import ModalLoad from '../../components/ModalLoad';
import axios from "axios"
import { toast } from 'react-toastify';
import { PieChart } from '@mui/x-charts/PieChart';
function Principal() {
    const token = sessionStorage.getItem("tokenLogin") || localStorage.getItem("tokenLogin")
    const idUsuario = sessionStorage.getItem("idUsuario") || localStorage.getItem("idUsuario")
    const [showModalLoading, setShowModalLoading] = useState(false)
    const [dataInicio, setDataInicio] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0])//seta no primeiro dia do mes corrente
    function SetValorDataInico(e: React.ChangeEvent<HTMLInputElement>) {
        setDataInicio(e.target.value)
    }
    const [dataFim, setDataFim] = useState(new Date().toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).split('/').reverse().join('-'))//fica no dia da data corrente -> usando apenas toISOSString da ruim por causa do fuso
    function SetValorDataFim(e: React.ChangeEvent<HTMLInputElement>) {
        setDataFim(e.target.value)
    }
    //carrega informações para alimentar os gráficos
    function CarregarGraficos() {
        setShowModalLoading(true)
        const dados = {
            dataInicio: dataInicio,
            dataFim: dataFim
        }
        axios.post(`${process.env.REACT_APP_API_URL}/carregar/dashboard/principal/${idUsuario}`, dados, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            const dados = resposta.data.dados
            setShowModalLoading(false)
        }).catch(function (erro) {
            toast.error(erro.response.data.message || erro.message)
            setShowModalLoading(false)
        })
    }
    useEffect(function () {
        CarregarGraficos()
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm col-md-12 col-lg-12  ">
                    <div className="col-sm col-md-12 col-12">
                        <h4>Dashboard</h4>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm col-md-12 col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <form onSubmit={function (e) {
                                    e.preventDefault()
                                    CarregarGraficos()
                                }}>
                                    <div className='row'>
                                        <div className='col-sm col-md-12 pe-1 col-lg-2 p-0'>
                                            <InputComponente
                                                label={"Data de Início"}
                                                tipo={"date"}
                                                required={false}
                                                className={'form-control form-control-sm'}
                                                id={"DataInicio"}
                                                placeholder={"Data de filtro inicial"}
                                                value={dataInicio}
                                                onchange={SetValorDataInico}
                                                readOnly={false}
                                            />
                                        </div>
                                        <div className='col-sm col-md-12 col-lg-2 p-0 pe-1'>
                                            <InputComponente
                                                label={"Data Fim"}
                                                tipo={"date"}
                                                required={false}
                                                className={'form-control form-control-sm'}
                                                id={"DataInicio"}
                                                placeholder={"Data de filtro inicial"}
                                                value={dataFim}
                                                onchange={SetValorDataFim}
                                                readOnly={false}
                                            />
                                        </div>
                                        <div className='col-sm col-md-12 col-lg-1 p-0 pt-4 text-center'>
                                            <Button type="submit" sx={{ width: "50%" }} variant="contained" color="primary" size="small" startIcon={<RestartAltIcon />}></Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <br />
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-sm col-md-12 col-lg-12">
                                            <PieChart
                                                colors={["red", "blue"]}
                                                series={[
                                                    {
                                                        data: [
                                                            { id: 0, value: 10, label: 'M. Saída' },
                                                            { id: 1, value: 15, label: 'M. Entrada' },
                                                        ],
                                                    },
                                                ]}
                                                width={250}
                                                height={100}
                                            />
                                    </div>
                                </div>
                            </div>
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
export default Principal