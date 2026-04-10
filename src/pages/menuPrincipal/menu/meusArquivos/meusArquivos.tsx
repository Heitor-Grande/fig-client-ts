
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState, useEffect } from 'react';
import VisualizarAnexos from '../../../../components/visualizarAnexoComponente/visualizarAnexos';
import ModalLoad from '../../../../components/ModalLoad';
import GerarBase64 from '../../../../functions/gerarBase64';
import { toast } from "react-toastify"
import axios from 'axios';
import ModalOpcoes from '../../../../components/modalOpcoes/modalOpcoes';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ButtonComponente from '../../../../components/buttonComponent/buttonComponent';
function MeusArquivos() {
    const [rows, setRows] = useState([])

    const [showModalLoading, setShowModalLoading] = useState(false)
    const token = sessionStorage.getItem("tokenLogin") || localStorage.getItem("tokenLogin")
  
    function AbrirInputFile() {
        const inputAnexar = document.querySelector("#anexarArquivo") as HTMLInputElement
        inputAnexar.click()
    }
    function fazerUpload(uploads: any) {
        setShowModalLoading(true)
        const arrayDeFiles = uploads.target.files
        GerarBase64(arrayDeFiles).then(function (arrayDeFilesEmBase64) {
            const dados = {
                arquivosImportados: arrayDeFilesEmBase64
            }
            axios.post(`${process.env.REACT_APP_API_URL}/meus-arquivos/novo/upload/arquivos`, dados, {
                headers: {
                    Authorization: token
                }
            }).then(function (resposta) {
                toast.success(resposta.data)
                carregarArquivos()
            }).catch(function (erro) {
                toast.error(erro.response.data.message || erro.message)
                setShowModalLoading(false)
            })
        }).catch(function (erro) {
            toast.error(erro.message || erro)
            setShowModalLoading(false)
        })
    }
    function carregarArquivos() {
        setShowModalLoading(true)
        axios.get(`${process.env.REACT_APP_API_URL}/meus-arquivos/carregar/meus/uploads`, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            setRows(resposta.data)
            setShowModalLoading(false)
        }).catch(function (erro) {
            toast.error(erro.response.data.message || erro.message)
            setShowModalLoading(false)
        })
    }
    const [showModalOpcoes, setShowModalOpcoes] = useState(false)
    const [opcoes, setOpcoes] = useState<any[]>([])
    function manipularModalOpcoes() {
        setShowModalOpcoes(!showModalOpcoes)
    }
    function DeletarArquivo(arquivo: any) {
        setShowModalLoading(true)
        axios.delete(`${process.env.REACT_APP_API_URL}/meus-arquivos/deletar/arquivo/usuario/${arquivo.id}`, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            toast.success(resposta.data)
            carregarArquivos()
            setShowModalOpcoes(false)
            setShowModalLoading(false)
        }).catch(function (erro) {
            toast.error(erro.response.data.message || erro.message)
            setShowModalLoading(false)
        })
    }
    function onRowClick(uploads: any) {
        const dadosLinha = uploads.row
        setOpcoes([
            {
                label: "Baixar Arquivo",
                acao: function () {
                    //download da imagem
                    const link = document.createElement("a")
                    link.href = dadosLinha.filebase64 || dadosLinha.fileBase64
                    link.download = dadosLinha.name
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                },
                icon: 'bi bi-cloud-arrow-down',
                className: "btn-outline-primary w-100"
            },
            {
                label: "Excluir Arquivo",
                acao: function () {
                    DeletarArquivo(dadosLinha)
                },
                icon: 'bi bi-trash3',
                className: "btn-outline-danger w-100"
            }
        ])
        manipularModalOpcoes()
    }
    useEffect(function () {
        carregarArquivos()
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm col-md-12 col-lg-12  ">
                    <div className="col-sm col-md-12 col-12">
                        <h4>Meus Arquivos</h4>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-sm col-md-12 col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className='col-sm col-md-12 col-lg-12'>
                                <input onChange={fazerUpload} id="anexarArquivo" type="file" className="d-none" multiple />
                                <ButtonComponente
                                    type="button"
                                    className="btn-outline-primary w-100"
                                    label="Novo Upload"
                                    onClick={AbrirInputFile}
                                    icon="bi bi-cloud-arrow-up"
                                />
                            </div>
                            <VisualizarAnexos
                                onRowClick={onRowClick}
                                anexos={rows}
                                modal={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ModalLoad carregando={showModalLoading} mensagem={"Carregando..."} />
            <ModalOpcoes
                titulo={"Opções de Arquivo"}
                arrayOpcoes={opcoes}
                mostrar={showModalOpcoes}
                fecharModal={manipularModalOpcoes}
            />
        </div>
    )
}
export default MeusArquivos