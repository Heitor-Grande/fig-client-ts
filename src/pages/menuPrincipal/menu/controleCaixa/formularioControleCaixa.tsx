import { useParams } from "react-router-dom"
import InputComponente from "../../../../components/inputComponent/inputComponente"
import { useEffect, useState } from "react"
import SelectComponente from "../../../../components/selectComponent/selectComponent"
import formatarDinheiro from "../../../../functions/formatarDinheiro"
import ModalLoad from "../../../../components/ModalLoad"
import axios from "axios"
import { toast } from "react-toastify"
import Button from '@mui/material/Button';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ModalConfirmacao from "../../../../components/modalConfirmacao/modalConfirmacao"
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import GerarBase64 from "../../../../functions/gerarBase64"
import FilePresentIcon from '@mui/icons-material/FilePresent';
import VisualizarAnexos from "../../../../components/visualizarAnexoComponente/visualizarAnexos"
import ModalOpcoes from "../../../../components/modalOpcoes/modalOpcoes"
import DownloadIcon from '@mui/icons-material/Download';
function FormularioControleCaixa() {
    const params = useParams()
    const [inputsMovimento, setInputsMovimento] = useState({
        titulo: "",
        tipo: "",
        valor: "",
        data: ""
    })
    function setTituloMovimento(e: React.ChangeEvent<HTMLInputElement>) {
        setInputsMovimento({
            ...inputsMovimento,
            titulo: e.target.value
        })
    }
    function setTipoMovimento(e: React.ChangeEvent<HTMLSelectElement>) {
        setInputsMovimento({
            ...inputsMovimento,
            tipo: e.target.value
        })
    }
    function setValorMovimento(e: React.ChangeEvent<HTMLInputElement>) {
        setInputsMovimento({
            ...inputsMovimento,
            valor: formatarDinheiro.formatarDinheiro(e.target.value)
        })
    }
    function setDataMovimento(e: React.ChangeEvent<HTMLInputElement>) {
        setInputsMovimento({
            ...inputsMovimento,
            data: e.target.value
        })
    }
    const optionsSelect = [
        { label: "Entrada", value: "E" },
        { label: "Saída", value: "S" }
    ]
    const [showModalLoading, setShowModalLoading] = useState(false)
    const token = sessionStorage.getItem("tokenLogin") || localStorage.getItem("tokenLogin")
    const idUsuario = sessionStorage.getItem("idUsuario") || localStorage.getItem("idUsuario")
    function CriarMovimento() {
        setShowModalLoading(true)
        const dados = {
            inputsMovimento: inputsMovimento,
            id_usuario: idUsuario,
            arquivosAnexados: arquivosAnexados
        }
        axios.post(`${process.env.REACT_APP_API_URL}/controle-caixa/criar/novo/movimento`, dados, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            toast.success(resposta.data)
            setTimeout(() => {
                window.location.href = '/home/controle/caixa'
            }, 1000)
            setShowModalLoading(false)
        }).catch(function (erro) {
            toast.error(erro.response.data.message || erro.message)
            setShowModalLoading(false)
        })
    }
    function CarregarMovimento() {
        setShowModalLoading(true)
        axios.get(`${process.env.REACT_APP_API_URL}/controle-caixa/carregar/detalhes/movimento/${idUsuario}/${params.id}`, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            const movimento = resposta.data.movimento
            const anexos = resposta.data.anexos
            setArquivosAnexados(anexos)
            setInputsMovimento({
                ...inputsMovimento,
                titulo: movimento.titulo,
                tipo: movimento.tipo,
                valor: formatarDinheiro.formatarValorFixo(movimento.valor),
                data: movimento.datamovimento.split("T")[0]
            })
            setShowModalLoading(false)
        }).catch(function (erro) {
            toast.error(erro.response.data.message || erro.message)
            setShowModalLoading(false)
        })
    }
    function AtualizaMovimento() {
        setShowModalLoading(true)
        const dados = {
            inputsMovimento: inputsMovimento,
            id_usuario: idUsuario
        }
        axios.put(`${process.env.REACT_APP_API_URL}/controle-caixa/atualizar/movimento/${idUsuario}/${params.id}`, dados, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            toast.success(resposta.data)
            setTimeout(() => {
                window.location.href = '/home/controle/caixa'
            }, 1000)
            setShowModalLoading(false)
        }).catch(function (erro) {
            toast.error(erro.response.data.message || erro.message)
            setShowModalLoading(false)
        })
    }
    function CriarOuAtualizarMovimento(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (params.acao == "novo" && params.id == "0") {
            CriarMovimento()
        }
        else if (params.acao == "editar" && params.id != "0") {
            AtualizaMovimento()
        }
    }
    useEffect(function () {
        if (params.acao != "novo" && params.id != "0") {
            CarregarMovimento()
        }
    }, [])
    const [showModalConfirmacao, setShowModalConfirmacao] = useState(false)
    function manipularModalExcluir() {
        setShowModalConfirmacao(!showModalConfirmacao)
    }
    function ExcluirMovimento() {
        manipularModalExcluir()
        setShowModalLoading(true)
        axios.delete(`${process.env.REACT_APP_API_URL}/controle-caixa/excluir/movimento/${idUsuario}/${params.id}`, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            toast.success(resposta.data)
            setShowModalLoading(false)
            setTimeout(() => {
                window.location.href = '/home/controle/caixa'
            }, 1000)
        }).catch(function (erro) {
            toast.error(erro.response.data.message || erro.message)
            setShowModalLoading(false)
        })
    }
    const [arquivosAnexados, setArquivosAnexados] = useState<any>([])
    function AbrirInputFile() {
        const anexarInput = document.querySelector("#anexarArquivo") as HTMLInputElement
        anexarInput.click()
    }
    function importarArquivos(e: React.ChangeEvent<HTMLInputElement>) {
        setShowModalLoading(true)
        const arrayDeFiles = e.target.files
        if (params.acao == "novo" && params.id == '0' && arrayDeFiles) {
            GerarBase64(arrayDeFiles).then(function (arrayDeFilesEmBase64) {
                setArquivosAnexados(arrayDeFilesEmBase64)
                toast.success("Arquivos vinculado(s) com sucesso.")
                setShowModalLoading(false)
            }).catch(function (erro) {
                toast.error(erro.message || erro)
                setShowModalLoading(false)
            })
        }
        else if (params.acao == "editar" && params.id != '0' && arrayDeFiles) {
            GerarBase64(arrayDeFiles).then(function (arrayDeFilesEmBase64) {
                UploadDeArquivo(arrayDeFilesEmBase64)
            }).catch(function (erro) {
                toast.error(erro.message || erro)
                setShowModalLoading(false)
            })
        }
    }
    const [showModalAnexos, setShowModalAnexos] = useState(false)
    function manipularModalVisualizarAnexos() {
        setShowModalAnexos(!showModalAnexos)
    }
    function UploadDeArquivo(arrayDeFiles: any) {
        const dados = {
            arquivosAnexados: arrayDeFiles
        }
        axios.put(`${process.env.REACT_APP_API_URL}/controle-caixa/upload/arquivo/movimento/${params.id}/${idUsuario}`, dados, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            toast.success(resposta.data)
            CarregarMovimento()
        }).catch(function (erro) {
            toast.error(erro.response.data.message || erro.message)
            setShowModalLoading(false)
        })
    }
    //modal de opções
    const [showModalOpcoes, setShowModalOpcoes] = useState(false)
    const [opcoes, setOpcoes] = useState<any[]>([])
    function DeletarAnexoDoMovimento(anexo: any) {
        if (params.acao == "novo") {
            const novoArray = arquivosAnexados.filter(function (arquivo: any) {
                return arquivo.id != anexo.id
            })
            setArquivosAnexados(novoArray)
            setShowModalOpcoes(false)
            toast.success("Anexo removido com sucesso.")
        }
        else if (params.acao == "editar" && params.id != "0") {
            setShowModalLoading(true)
            axios.delete(`${process.env.REACT_APP_API_URL}/controle-caixa/deletar/arquivo/movimento/${params.id}/${anexo.id}/${idUsuario}`, {
                headers: {
                    Authorization: token
                }
            }).then(function (resposta) {
                toast.success(resposta.data)
                setShowModalOpcoes(false)
                CarregarMovimento()
                setShowModalLoading(false)
            }).catch(function (erro) {
                toast.error(erro.response.data.message || erro.message)
                setShowModalLoading(false)
            })
        }
    }
    function mostrarModalOpcoes(dados: any) {
        setShowModalOpcoes(!showModalOpcoes)
        setShowModalAnexos(!showModalAnexos)
        if (showModalOpcoes == false) {
            const dadosLinha = dados.row
            setOpcoes([
                {
                    label: "Baixar Anexo",
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
                    label: "Excluir Anexo",
                    acao: function () {
                        DeletarAnexoDoMovimento(dadosLinha)
                    },
                    icone: <DeleteSweepIcon />,
                    color: "error"
                }
            ])
        }
    }
    function fecharModalOpcoes() {
        setShowModalOpcoes(!showModalOpcoes)
        setShowModalAnexos(!showModalAnexos)
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm col-md-12 col-12">
                    <h4>{params.acao == "novo" ? 'Novo movimento' : 'Editar Movimento'}</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-sm col-md-12 col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={CriarOuAtualizarMovimento}>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm col-md-4 col-lg-3 mb-4" hidden={params.acao == "novo" ? true : false}>
                                            <Button onClick={manipularModalExcluir} type="button" sx={{ width: "100%" }} variant="contained" color="error" size="small" startIcon={<DeleteSweepIcon />}>
                                                Excluir movimento
                                            </Button>
                                        </div>
                                        <div className="col-sm col-md-4 col-lg-3 mb-4" >
                                            <input onChange={importarArquivos} id="anexarArquivo" type="file" className="d-none" multiple />
                                            <Button onClick={AbrirInputFile} type="button" sx={{ width: "100%" }} variant="contained" color="inherit" size="small" startIcon={<CloudDownloadIcon />}>
                                                Anexar Arquivo(s)
                                            </Button>
                                        </div>
                                        <div className="col-sm col-md-4 col-lg-3 mb-4" hidden={arquivosAnexados.length > 0 ? false : true}>
                                            <Button onClick={manipularModalVisualizarAnexos} type="button" sx={{ width: "100%" }} variant="contained" color="inherit" size="small" startIcon={<FilePresentIcon />}>
                                                Meus Anexos
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm col-md-4 col-lg-3">
                                            <InputComponente
                                                label={'Título do Movimento'}
                                                tipo={'text'}
                                                required={true}
                                                id={'tituloMovimento'}
                                                placeholder={'Recebimento de dividendos'}
                                                className="text-capitalize form-control form-control-sm"
                                                value={inputsMovimento.titulo}
                                                onchange={setTituloMovimento}
                                                readOnly={false}
                                                maxLength={40}
                                                minLength={5}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm col-md-4 col-lg-3">
                                            <SelectComponente
                                                options={optionsSelect}
                                                value={inputsMovimento.tipo}
                                                onchange={setTipoMovimento}
                                                label="Tipo do movimento"
                                                required={true}
                                                disabled={false}
                                            />
                                        </div>
                                        <div className="col-sm col-md-4 col-lg-3">
                                            <InputComponente
                                                label={'Valor do movimento'}
                                                tipo={'text'}
                                                required={true}
                                                id={'valorMovimento'}
                                                placeholder={'2.500,00'}
                                                value={inputsMovimento.valor}
                                                onchange={setValorMovimento}
                                                readOnly={false}
                                            />
                                        </div>
                                        <div className="col-sm col-md-4 col-lg-3">
                                            <InputComponente
                                                label={'Data do movimento'}
                                                tipo={'date'}
                                                required={true}
                                                id={'dataMovimento'}
                                                placeholder={''}
                                                value={inputsMovimento.data}
                                                onchange={setDataMovimento}
                                                readOnly={false}
                                            />
                                        </div>
                                        <div className="col-sm col-md-4 col-lg-3 pt-4">
                                            <Button type="submit" sx={{ width: "100%" }} variant="contained" color="primary" size="small">
                                                {params.acao == "novo" ? 'Criar movimento' : 'Salvar Edição'}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ModalConfirmacao
                mostrar={showModalConfirmacao}
                mensagemPrincipal={"Deseja excluir o movimento?"}
                labelBtnConfirmar={"Excluir"}
                labelBtnCancelar={"Cancelar"}
                acaoBtnConfirmar={ExcluirMovimento}
                acaoBtnCancelar={manipularModalExcluir}
            />
            <ModalLoad carregando={showModalLoading} mensagem={"Carregando..."} />
            <VisualizarAnexos mostrar={showModalAnexos} modal={true} anexos={arquivosAnexados} fecharModal={manipularModalVisualizarAnexos} onRowClick={mostrarModalOpcoes} />
            <ModalOpcoes
                titulo={"Opções"}
                mensagem={""}
                mostrar={showModalOpcoes}
                fecharModal={fecharModalOpcoes}
                arrayOpcoes={opcoes}
            />
        </div>
    )
}

export default FormularioControleCaixa