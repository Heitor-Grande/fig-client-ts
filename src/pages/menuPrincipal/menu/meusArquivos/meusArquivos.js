
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
function MeusArquivos() {
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
            cellClassName: function (objColuna) {
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
    const idUsuario = sessionStorage.getItem("idUsuario") || localStorage.getItem("idUsuario")
    function AbrirInputFile() {
        document.querySelector("#anexarArquivo").click()
    }
    function fazerUpload(uploads) {
        setShowModalLoading(true)
        const arrayDeFiles = uploads.target.files
        GerarBase64(arrayDeFiles).then(function (arrayDeFilesEmBase64) {
            const dados = {
                arquivosImportados: arrayDeFilesEmBase64
            }
            axios.post(`${process.env.REACT_APP_API_URL}/novo/upload/arquivos/${idUsuario}`, dados, {
                headers: {
                    Authorization: token
                }
            }).then(function (resposta) {
                toast.success(resposta.data.message)
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
        axios.get(`${process.env.REACT_APP_API_URL}/carregar/meus/uploads/${idUsuario}`, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            setRows(resposta.data.arquivos)
            setShowModalLoading(false)
        }).catch(function (erro) {
            toast.error(erro.response.data.message || erro.message)
            setShowModalLoading(false)
        })
    }
    const [showModalOpcoes, setShowModalOpcoes] = useState(false)
    const [opcoes, setOpcoes] = useState([])
    function manipularModalOpcoes() {
        setShowModalOpcoes(!showModalOpcoes)
    }
    function DeletarArquivo(arquivo) {
        setShowModalLoading(true)
        axios.delete(`${process.env.REACT_APP_API_URL}/deletar/arquivo/usuario/${idUsuario}/${arquivo.id}`, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            toast.success(resposta.data.message)
            carregarArquivos()
            setShowModalOpcoes(false)
            setShowModalLoading(false)
        }).catch(function (erro) {
            toast.error(erro.response.data.message || erro.message)
            setShowModalLoading(false)
        })
    }
    function onRowClick(uploads) {
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
                icone: <DownloadIcon />,
                color: "inherit"
            },
            {
                label: "Excluir Arquivo",
                acao: function () {
                    DeletarArquivo(dadosLinha)
                },
                icone: <DeleteSweepIcon />,
                color: "error"
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
                                <Button variant="contained" sx={{ width: "100%" }} onClick={AbrirInputFile} size="small" startIcon={<CloudUploadIcon />}>
                                    Novo Upload
                                </Button>
                            </div>
                            <VisualizarAnexos
                                onRowClick={onRowClick}
                                anexos={rows}
                                columns={columns}
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