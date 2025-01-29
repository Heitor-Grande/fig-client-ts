import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ModalLoad from '../ModalLoad';
import axios from "axios"
import { toast } from "react-toastify"
interface tipoRecSenha {
    mostrar: boolean,
    fecharModal: () => void
}
function RecSenha({ mostrar, fecharModal }: tipoRecSenha) {
    const token = sessionStorage.getItem("tokenPublic")
    const [showModalLoad, setShowModalLoad] = useState(false)
    const [emailRecuperacao, setEmailRecuperacao] = useState("")
    const [etapa, setEtapa] = useState(1)
    function setValueEmailRecuperacao(e: React.ChangeEvent<HTMLInputElement>) {
        setEmailRecuperacao(e.target.value)
    }
    const [codigo, setCodigo] = useState("")
    function setValueCodigo(e: React.ChangeEvent<HTMLInputElement>) {
        setCodigo(e.target.value)
    }
    function enviarEmailRecSenha(e: React.FormEvent<HTMLFormElement>) {
        setShowModalLoad(true)
        e.preventDefault()
        const dados = {
            email: emailRecuperacao
        }
        axios.post(`${process.env.REACT_APP_API_URL}/recsenha-usuario/enviar/email/recuperacao/senha`, dados, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            toast.success(resposta.data.message)
            sessionStorage.setItem("tokenRecSenha", resposta.data.token)
            setEtapa(2)
            setShowModalLoad(false)
        }).catch(function (erro) {
            if (erro.response.status == 400) {
                toast.info(erro.response.data.message)
            }
            else {
                toast.error(erro.response.data.message)
            }
            setShowModalLoad(false)
        })
    }
    function validarCodigo(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setShowModalLoad(true)
        const dados = {
            token: sessionStorage.getItem("tokenRecSenha"),
            codigo: codigo
        }
        axios.post(`${process.env.REACT_APP_API_URL}/recsenha-usuario/validar/codigo/recuperacao`, dados, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            toast.success(resposta.data.message)
            setEtapa(3)
            setShowModalLoad(false)
        }).catch(function (erro) {
            toast.error(erro.response.data.message)
            setShowModalLoad(false)
        })
    }
    const [novaSenha, setNovaSenha] = useState("")
    function setarValueNovaSenha(e: React.ChangeEvent<HTMLInputElement>) {
        setNovaSenha(e.target.value)
    }
    function setarNovaSenha(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setShowModalLoad(true)
        const dados = {
            email: emailRecuperacao,
            novaSenha: novaSenha
        }
        axios.put(`${process.env.REACT_APP_API_URL}/recsenha-usuario/recupera/senha/usuario`, dados, {
            headers: {
                Authorization: token
            }
        }).then(function (resposta) {
            toast.success(resposta.data.message)
            fecharModal()
            setShowModalLoad(false)
        }).catch(function (erro) {
            toast.error(erro.response.data.message)
            setShowModalLoad(false)
        })
    }
    useEffect(function () {
        if (mostrar == false) {
            setEtapa(1)
            setEmailRecuperacao("")
            setCodigo("")
            setNovaSenha("")
        }
    }, [mostrar])
    return (
        <Modal show={mostrar} centered size="lg" onHide={fecharModal}>
            <Modal.Header closeButton>
                <p>Recuperação de senha</p>
            </Modal.Header>
            <Modal.Body>
                {
                    etapa == 1 ?
                        <form onSubmit={enviarEmailRecSenha}>
                            <div className='container'>
                                <div className='row'>
                                    <div className='col-sm col-md-12 col-lg-12'>
                                        <p>Informe o e-mail da sua conta para receber o e-mail de verificação e recuperar sua senha.</p>
                                    </div>
                                    <div className='col-sm col-md-12 col-lg-5'>
                                        <label>Email</label>
                                        <input required type="email" value={emailRecuperacao} onChange={setValueEmailRecuperacao} className="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="exemplo@email.com" />
                                    </div>
                                    <div className='col-sm col-md-12 col-lg-7 pt-4 text-end'>
                                        <button type="submit" className='btn btn-outline-primary btn-sm'>Enviar E-mail de verificação</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        : etapa == 2 ?
                            <form onSubmit={validarCodigo}>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-sm col-md-12 col-lg-12'>
                                            <p>Informe o código recebido no e-mail de verificação para recuperar sua senha.</p>
                                        </div>
                                        <div className='col-sm col-md-12 col-lg-5'>
                                            <label>Código</label>
                                            <input required type="text" value={codigo} onChange={setValueCodigo} className="form-control form-control-sm" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Código de 5 digitos" maxLength={5} minLength={5} />
                                        </div>
                                        <div className='col-sm col-md-12 col-lg-7 pt-4 text-end'>
                                            <button type="submit" className='btn btn-outline-primary btn-sm'>Validar Código</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            : etapa == 3 ?
                                <form onSubmit={setarNovaSenha}>
                                    <div className='container'>
                                        <div className='row'>
                                            <div className='col-sm col-md-12 col-lg-12'>
                                                <p>Defina a sua nova senha</p>
                                            </div>
                                            <div className='col-sm col-md-12 col-lg-5'>
                                                <label>Nova Senha</label>
                                                <input required minLength={6} type="password" value={novaSenha} onChange={setarValueNovaSenha} className="form-control form-control-sm" id="minhaSenha" placeholder="******" />
                                            </div>
                                            <div className='col-sm col-md-12 col-lg-7 pt-4 text-end'>
                                                <button type="submit" className='btn btn-outline-primary btn-sm'>Definir nova Senha</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                :
                                <h4>Ops!</h4>
                }
            </Modal.Body>
            <ModalLoad mensagem={"Enviando e-mail de recuperação..."} carregando={showModalLoad} />
        </Modal>
    )
}
export default RecSenha