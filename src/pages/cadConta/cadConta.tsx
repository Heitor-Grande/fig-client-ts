import Logo from "../../assets/logo192.png"
import Footer from "../../components/footer"
import { useState } from "react"
import { toast } from "react-toastify"
import ModalLoad from "../../components/ModalLoad"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Button from '@mui/material/Button';
import ButtonComponente from "../../components/buttonComponent/buttonComponent"
import InputComponente from "../../components/inputComponent/inputComponente"
function CadConta() {
    const navigate = useNavigate()
    const token = sessionStorage.getItem("tokenPublic")
    const [carregando, setCarregando] = useState(false)

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
                axios.post(process.env.REACT_APP_API_URL + "/cad-conta/criar/novo/precad", dados, {
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
                    setTimeout(() => {
                        window.location.href = "/"
                    }, 2000)
                }).catch(function (error) {
                    setCarregando(false)
                    toast.error(error.response.data.message || error.message)
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
                                        <ButtonComponente
                                            type="button"
                                            className="btn-outline-primary"
                                            label="Home"
                                            icon="bi bi-house"
                                        />
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
                                <div className="col-sm col-md-5 col-lg-6">
                                    <div className="form-group">
                                        <InputComponente
                                            label="Nome"
                                            tipo="text"
                                            required={true}
                                            className="text-capitalize"
                                            id="nome"
                                            placeholder="Nome completo"
                                            value={nome}
                                            onchange={(event) => setNome(event.target.value)}
                                            readOnly={false}
                                        />
                                    </div>
                                </div>

                                <div className="col-sm col-md-7 col-lg-6">
                                    <div className="form-group">
                                        <InputComponente
                                            label="Email"
                                            tipo="email"
                                            required={true}
                                            className=""
                                            id="email"
                                            placeholder="exemplo@email.com"
                                            value={email}
                                            onchange={(event) => setEmail(event.target.value)}
                                            readOnly={false}
                                        />
                                    </div>
                                </div>

                                <div className="col-sm col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <InputComponente
                                            label="Senha"
                                            tipo="password"
                                            required={true}
                                            className=""
                                            id="senha"
                                            placeholder="*******"
                                            value={senha}
                                            onchange={(event) => setSenha(event.target.value)}
                                            readOnly={false}
                                            minLength={6}
                                        />
                                    </div>
                                </div>

                                <div className="col-sm col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <InputComponente
                                            label="Confirmar Senha"
                                            tipo="password"
                                            required={true}
                                            className=""
                                            id="senhaConfirmar"
                                            placeholder="*******"
                                            value={senhaConfirmar}
                                            onchange={(event) => setSenhaConfirmar(event.target.value)}
                                            readOnly={false}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm col-md-12 col-lg-12 text-center m-auto mt-4">
                                    <ButtonComponente
                                        type="submit"
                                        className="btn-outline-primary w-50"
                                        label="Finalizar Cadastro"
                                        icon="bi bi-person-fill-add"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div >

            <ModalLoad carregando={carregando} mensagem="Carregando..." />
            <Footer />
        </>
    )
}

export default CadConta