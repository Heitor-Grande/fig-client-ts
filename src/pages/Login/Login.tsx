import Logo from "../../assets/logo192.png"
import Footer from "../../components/footer"
import { useEffect } from "react"
import { toast } from "react-toastify"
import ModalLoad from "../../components/ModalLoad"
import { useState } from 'react';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import RecSenha from "../../components/recSenha/recSenha"
import Button from '@mui/material/Button';
function Login() {
    const navigate = useNavigate()
    const [carregando, setCarregando] = useState(false)
    const [inputsLogin, setInputslogin] = useState({
        senha: "",
        email: "",
        salvarLogin: false
    })
    function onChangeInputLoginEmail(obj: React.ChangeEvent<HTMLInputElement>) {
        setInputslogin({ ...inputsLogin, email: obj.target.value })
    }
    function onChangeInputLoginSenha(obj: React.ChangeEvent<HTMLInputElement>) {
        setInputslogin({ ...inputsLogin, senha: obj.target.value })
    }
    function onChangeInputLoginSalvarLogin(obj: React.ChangeEvent<HTMLInputElement>) {
        setInputslogin({ ...inputsLogin, salvarLogin: obj.target.checked })
    }
    useEffect(function () {

        //faz login automatico
        if (localStorage.getItem("tokenLogin")) {
            setCarregando(true)
            axios.get(`${process.env.REACT_APP_API_URL}/autologin/logar/login/usuario?idUsuario=${localStorage.getItem("idUsuario")}`, {
                headers: {
                    Authorization: localStorage.getItem("tokenLogin")
                }
            }).then(function (resposta) {
                sessionStorage.setItem("idUsuario", resposta.data.idUsuario)
                navigate("/home/principal")
                setCarregando(false)
            }).catch(function (erro) {
                toast.error(erro.response.data.message || erro.message)
                setCarregando(false)
            })
        }
    }, [])
    function FazerLogin(eventoSubmit: React.FormEvent<HTMLFormElement>) {
        eventoSubmit.preventDefault()
        setCarregando(true)
        axios.post(`${process.env.REACT_APP_API_URL}/login/realizar/login`, inputsLogin, {
            headers: {
                Authorization: sessionStorage.getItem("tokenPublic")
            }
        }).then(function (resposta) {
            const tokenLogin = resposta.data.tokenLogin
            const usuario = resposta.data.usuario
            if (inputsLogin.salvarLogin) {
                localStorage.setItem("tokenLogin", tokenLogin)
                localStorage.setItem("idUsuario", usuario.id_usuario)
            }
            else {
                sessionStorage.setItem("tokenLogin", tokenLogin)
                sessionStorage.setItem("idUsuario", usuario.id_usuario)
            }
            navigate("/home/principal")
            setCarregando(false)
        }).catch(function (erro) {
            console.log(erro)
            toast.error(erro.response.data.message || erro.message)
            setCarregando(false)
        })
    }
    //recuperação de senha
    const [mostrarModalRecSenha, setMostrarModalRecSenha] = useState(false)
    function manipularModalRecSenha() {
        setMostrarModalRecSenha(!mostrarModalRecSenha)
    }
    return (
        <div className="main">

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
                                    <a className="nav-link active rounded text-center" href="/cad/nova/conta">
                                        <Button type="button" variant="contained" color="primary" size="small">
                                            Criar uma conta
                                        </Button>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active rounded text-center" href="#infoFIG">
                                        <Button type="button" variant="contained" color="inherit" size="small">
                                            Mais sobre o FIG
                                        </Button>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="container  mt-5">
                <div className="row">
                    <div className="col-sm col-lg-9 col-md-10 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col text-center">
                                            <img src={Logo} className="rounded h-50 d-inline-block" alt="..." />
                                        </div>
                                        <div className="col-sm col-md col-lg">
                                            <form onSubmit={FazerLogin}>
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input type="email" required value={inputsLogin.email} onChange={onChangeInputLoginEmail} className="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="exemplo@email.com" />
                                                    <small id="emailHelp" className="form-text text-muted">Nunca compartilhe essas informações.</small>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <label >Senha</label>
                                                    <input type="password" required value={inputsLogin.senha} onChange={onChangeInputLoginSenha} className="form-control form-control-sm" id="exampleInputPassword1" placeholder="*******" />
                                                </div>
                                                <div className="form-check mt-2">
                                                    <input type="checkbox" onChange={onChangeInputLoginSalvarLogin} checked={inputsLogin.salvarLogin} className="form-check-input" id="exampleCheck1" />
                                                    <label className="form-check-label" >Salvar Login</label>
                                                </div>
                                                <div className="form-check mt-2 text-center">
                                                    <Button type="submit" sx={{ width: "75%" }} variant="contained" color="primary" size="small">
                                                        Entrar
                                                    </Button>
                                                </div>
                                                <div className="text-center mt-2">
                                                    <button type="button" className="text-danger btn text-center border-0" onClick={manipularModalRecSenha}> Esqueci minha senha</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm col-lg-9 col-md-10 mx-auto">
                        <h4>Próximas Atualizações</h4>
                    </div>
                    <div className="col-sm col-lg-9 col-md-10 mx-auto">
                        <div className="card">
                            <div className="card-body">
                                <ul>
                                    <li>Lembretes</li>
                                    <li>Agenda</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5" id="infoFIG">
                <div className="row">
                    <div className="col-sm col-md col-lg">
                        <p className="text-center">O FIG foi planejado para simplificar e otimizar a gestão de tarefas da sua vida pessoal.
                            Com ferramentas essenciais, controle de caixa, armazenamento em nuvem e
                            organização de agendas, ele oferece uma interface intuitiva e funcionalidades para facilitar a sua rotina e compromissos.</p>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm col-md-12 col-lg-12">
                        <h4 className="text-center">Principais Funcionalidades</h4>
                    </div>
                    <div className="col-sm col-lg-9 col-md-10 mx-auto">
                        <div className="row">
                            <div className="col-4">
                                <div className="list-group" id="list-tab" role="tablist">
                                    <a className="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">Armazenamento em nuvem</a>
                                    <a className="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile">Controle de Caixa</a>
                                    <a className="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings">Controle de Agenda</a>
                                    <a className="list-group-item list-group-item-action" id="list-lembrete-list" data-toggle="list" href="#list-lembrete" role="tab" aria-controls="lembrete">Lembretes</a>
                                </div>
                            </div>
                            <div className="col-8">
                                <div className="tab-content" id="nav-tabContent">
                                    <div className="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
                                        <ul>
                                            <li>Armazene documentos ou imagens.</li>
                                            <li>Acesse seus arquivos de forma descomplicada.</li>
                                            <li>Vincule documentos no seu controle de caixa para facilitar sua organização.</li>
                                        </ul>
                                    </div>
                                    <div className="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
                                        <ul>
                                            <li>Permite registrar e acompanhar as entradas e saídas do seu caixa,
                                                facilitando a sua organização financeira ou do seu negócio.</li>
                                            <li>Melhore a gestão de dívidas e o controle sobre os recebíveis,
                                                evitando inadimplências e atrasos.</li>
                                            <li>Identifique áreas onde os custos podem ser reduzidos ou otimizados, aumentando a eficiência operacional.</li>
                                        </ul>
                                    </div>
                                    <div className="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list">
                                        <ul>
                                            <li>Permite que seus clientes acessem sua agenda e realizem agendamentos no horário mais conveniente para eles.</li>
                                            <li>Receba notificações automáticas sempre que um novo agendamento for solicitado.</li>
                                            <li>Aprove ou negue agendamentos de forma rápida e prática.</li>
                                            <li>Agendamentos finalizados geram automaticamente entradas no controle de caixa.</li>
                                            <li>Facilita a organização de compromissos, otimizando o planejamento e a gestão do seu tempo.</li>
                                        </ul>
                                    </div>
                                    <div className="tab-pane fade" id="list-lembrete" role="tabpanel" aria-labelledby="list-lembrete-list">
                                        <ul>
                                            <li>Crie lembretes personalizados para qualquer tipo de compromisso ou tarefa.</li>
                                            <li>Programe lembretes únicos ou recorrentes: diários, semanais ou mensais.</li>
                                            <li>Escolha como deseja ser lembrado: via FIG, e-mail ou ambos.</li>
                                            <li>Tenha total liberdade para definir o conteúdo do lembrete, de acordo com sua necessidade.</li>
                                            <li>Evite esquecimentos e mantenha sua rotina sempre organizada.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm col-md col-lg">
                        <p className="text-center">Nosso aplicativo é a ferramenta ideal para quem busca melhorar a gestão do seu negócio e da sua vida pessoal,
                            aumentando a produtividade e proporcionando uma experiência superior tanto para gestores quanto para indivíduos.</p>
                    </div>
                </div>
            </div>
            <ModalLoad carregando={carregando} mensagem="Carregando..." />
            <RecSenha mostrar={mostrarModalRecSenha} fecharModal={manipularModalRecSenha} />
            <Footer />
        </div>
    )
}

export default Login