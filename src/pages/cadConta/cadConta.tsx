import Logo from "../../assets/logo192.png"
import Footer from "../../components/footer"
import { useEffect, useState } from "react"
import TokenPublic from "../../functions/tokenPublic"
import { toast } from "react-toastify"
import ModalLoad from "../../components/ModalLoad"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
function CadConta() {
    const navigate = useNavigate()
    const token = sessionStorage.getItem("tokenPublic")
    const [carregando, setCarregando] = useState(false)
    useEffect(function () {
        if (!sessionStorage.getItem("tokenPublic")) {
            setCarregando(true)
            TokenPublic().then(function () {
                setCarregando(false)
            }).catch(function (erro) {

                setCarregando(false)
                toast.error(erro.response.data || erro.message || erro.statusText)
            })
        }
    }, [])
    const [nome, setNome] = useState("")
    const [senha, setSenha] = useState("")
    const [senhaConfirmar, setSenhaConfirmar] = useState("")
    const [email, setEmail] = useState("")
    function criarPreCad() {
        setCarregando(true)
        try {
            const dados = {
                nome,
                senha,
                senhaConfirmar,
                email
            }
            if (senha == senhaConfirmar) {
                axios.post(process.env.REACT_APP_API_URL + "/criar/novo/precad", dados, {
                    headers: {
                        Authorization: token
                    }
                }).then(function (resposta) {
                    setCarregando(false)
                    setNome("")
                    setSenha("")
                    setSenhaConfirmar("")
                    setEmail("")
                    toast.success(resposta.data)
                }).catch(function (error) {
                    setCarregando(false)
                    toast.error(error.response.data || error.statusText || error.message)
                    if (error.response.status == 400) {
                        setTimeout(() => {
                            navigate("/")
                        }, 1000);
                    }
                })
            }
            else {
                setCarregando(false)
                toast.info("As senhas não são idênticas.")
            }
        } catch (error) {
            console.log(error)
            toast.error("Ocorreu um erro ao realizar pré-cadastro.")
        }
    }
    return (
        <>

            <div className="App">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">
                            <img src={Logo} alt="" width="60" height="60" />
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active rounded text-center" href="/">
                                        <Button type="button" variant="contained" color="primary" size="small">
                                            Home
                                        </Button>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col">
                        <p className="text-center"><b>Pré-Cadastro</b></p>
                        <p className="text-center mb-0">No pré-cadastro solicitamos apenas informações necessarias para que consiga acessar o FIG.</p>
                        <p className="text-center mb-0">Outras informações de cadastro podem ser solicitadas durante o uso do App.</p>
                    </div>
                </div>
            </div>
            <div className="card mt-5 w-75 m-auto">
                <form onSubmit={function (event) {
                    event.preventDefault()
                    criarPreCad()
                }}>
                    <div className="card-body">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm col-md-5 col-lg-3">
                                    <div className="form-group">
                                        <label>Nome</label>
                                        <input type="text" required value={nome} onChange={function (event) {
                                            setNome(event.target.value)
                                        }} className="form-control form-control-sm text-capitalize" placeholder="Nome completo" />
                                    </div>
                                </div>
                                <div className="col-sm col-md-7 col-lg-3">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" required value={email} onChange={function (event) {
                                            setEmail(event.target.value)
                                        }} className="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="exemplo@email.com" />
                                    </div>
                                </div>
                                <div className="col-sm col-md-6 col-lg-3">
                                    <div className="form-group">
                                        <label>Senha</label>
                                        <input type="password" minLength={6} required value={senha} onChange={function (event) {
                                            setSenha(event.target.value)
                                        }} className="form-control form-control-sm" placeholder="*******" />
                                    </div>
                                </div>
                                <div className="col-sm col-md-6 col-lg-3">
                                    <div className="form-group">
                                        <label>Confirmar Senha</label>
                                        <input type="password" required value={senhaConfirmar} onChange={function (event) {
                                            setSenhaConfirmar(event.target.value)
                                        }} className="form-control form-control-sm" placeholder="*******" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm col-md-12 col-lg-12 text-center m-auto mt-4">
                                    <Button type="submit" variant="contained" color="primary" size="small">
                                        Finalizar Pré-Cadastro
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div >

            <ModalLoad carregando={carregando} mensagem="Carregando..."/>
            <Footer />
        </>
    )
}

export default CadConta