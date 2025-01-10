import { useEffect, useState } from "react"
import InputComponente from "../../../../components/inputComponent/inputComponente"
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import axios from "axios"
import ModalLoad from "../../../../components/ModalLoad";
import { toast } from "react-toastify"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import GerarBase64 from "../../../../functions/gerarBase64";
import Button from '@mui/material/Button';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
function MinhaConta() {
    interface typeInputsConta {
        email: string,
        nome: string,
        avatar: string | undefined,
        dataCriacao: string,
        ativo: boolean
    }
    const [inputsConta, setInputsConta] = useState<typeInputsConta>({
        email: "",
        nome: "",
        avatar: "",
        dataCriacao: "",
        ativo: true
    })
    function setEmailConta(e: React.ChangeEvent<HTMLInputElement>) {
        setInputsConta({
            ...inputsConta,
            email: e.target.value
        })
    }
    function setNomeConta(e: React.ChangeEvent<HTMLInputElement>) {
        setInputsConta({
            ...inputsConta,
            nome: e.target.value
        })
    }
    async function setAvatarConta(e: React.ChangeEvent<HTMLInputElement>) {
        const arrayArquivo = e.target.files
        if (arrayArquivo) {
            GerarBase64(arrayArquivo).then(function (arrayBase64) {
                setInputsConta({
                    ...inputsConta,
                    avatar: arrayBase64[0].fileBase64 && typeof (arrayBase64[0].fileBase64) == "string" ? arrayBase64[0].fileBase64 : ""
                })
            }).catch(function (erro) {
                setShowModalCarregando(false)
                toast.error(erro.message)
            })
        }
    }
    const token = sessionStorage.getItem("tokenLogin") || localStorage.getItem("tokenLogin")
    const idUsuario = sessionStorage.getItem("idUsuario") || localStorage.getItem("idUsuario")
    const [showModalCarregando, setShowModalCarregando] = useState(false)
    function CarregarInformacoesUsuario() {
        setShowModalCarregando(true)
        axios.get(`${process.env.REACT_APP_API_URL}/carregar/usuario/${idUsuario}`, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            const usuario = resposta.data.usuario
            setInputsConta({
                ...inputsConta,
                nome: usuario.nome,
                avatar: usuario.avatar,
                email: usuario.email,
                dataCriacao: usuario.datacriacao.split("T")[0],
                ativo: usuario.ativo
            })
            setShowModalCarregando(false)
        }).catch(function (erro) {
            toast.error(erro.response.data.message || erro.message)
            setShowModalCarregando(false)
        })
    }
    function AtualizarConta(e: React.FormEvent<HTMLFormElement>) {
        if (e) {
            e.preventDefault()
        }
        setShowModalCarregando(true)
        const dados = {
            inputsConta
        }
        axios.put(`${process.env.REACT_APP_API_URL}/atualizar/minha/conta/${idUsuario}`, dados, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            toast.success(resposta.data.message)
            CarregarInformacoesUsuario()
            setShowModalCarregando(false)
        }).catch(function (erro) {
            toast.error(erro.response.data.message || erro.message)
            setShowModalCarregando(false)
        })
    }
    useEffect(function () {
        CarregarInformacoesUsuario()
    }, [])
    return (
        <div className="container-fluid">
            <ModalLoad carregando={showModalCarregando} mensagem={"Carregando conta..."} />
            <div className="col-sm col-md-12 col-12">
                <h4>Minha Conta</h4>
            </div>
            <div className="row">
                <div className="col-sm col-md-12 col-lg-12">
                    <div className="card">
                        <form onSubmit={AtualizarConta}>
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm col-md-2 col-lg-2">
                                            <Stack className="text-center" direction="row" spacing={2}>
                                                <Avatar alt={inputsConta.nome}
                                                    src={inputsConta.avatar}
                                                    sx={{ width: 100, height: 100 }}
                                                />
                                                <input className="d-none" onChange={setAvatarConta} type="file" id="imgAvatar" multiple={false} accept=".png, .jpeg, .jpg" />
                                                <label className="btn border-0" htmlFor="imgAvatar">
                                                    <ModeEditIcon color="primary" />
                                                </label>
                                            </Stack>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm col-md-6 col-lg-2">
                                            <InputComponente
                                                label={"Data de Criação"}
                                                tipo={"date"}
                                                required={true}
                                                id={"dataCriacao"}
                                                placeholder={"Data de Criação"}
                                                value={inputsConta.dataCriacao}
                                                onchange={function () {

                                                }}
                                                readOnly={true}
                                            />
                                        </div>
                                        <div className="col-sm col-md-6 col-lg-2 pt-3">
                                            <FormGroup>
                                                <FormControlLabel
                                                    disabled
                                                    control={<Checkbox checked={inputsConta.ativo} />}
                                                    label={inputsConta.ativo == true ? "Ativo" : "Bloqueado"} />
                                            </FormGroup>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm col-md-6 col-lg-6">
                                            <InputComponente
                                                label={"Nome"}
                                                tipo={"text"}
                                                required={true}
                                                id={"nomeUsuario"}
                                                placeholder={"Nome completo"}
                                                value={inputsConta.nome}
                                                onchange={setNomeConta}
                                                readOnly={false}
                                            />
                                        </div>
                                        <div className="col-sm col-md-6 col-lg-6">
                                            <InputComponente
                                                label={"E-mail"}
                                                tipo={"email"}
                                                required={true}
                                                id={"emailUsuario"}
                                                placeholder={"email@email.com"}
                                                value={inputsConta.email}
                                                onchange={setEmailConta}
                                                readOnly={false}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm col-md-6 col-lg-6 text-end mt-2">
                                            <Button type="submit" sx={{ width: "100%" }} variant="contained" color="primary" size="small">
                                                Salvar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MinhaConta