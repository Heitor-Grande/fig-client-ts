import { Modal } from "react-bootstrap"
import Button from '@mui/material/Button';
import ButtonComponente from "../buttonComponent/buttonComponent";
interface typeOpcoesModalOpcoes {
    label: string
    acao: () => void
    icon: string
    className: string
}
interface typeModalOpcoes {
    titulo: string
    mensagem?: string,
    arrayOpcoes: typeOpcoesModalOpcoes[]
    fecharModal: () => void
    mostrar: boolean
}
function ModalOpcoes({
    titulo,
    mensagem,
    arrayOpcoes,
    fecharModal,
    mostrar
}: typeModalOpcoes) {
    return (
        <Modal show={mostrar} onHide={fecharModal} size="lg" centered>
            <Modal.Header closeButton>
                <p className="m-0 p-0"><b>{titulo}</b></p>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col-sm col-md-12 col-lg-12 text-center">
                            <p>{mensagem}</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {
                            arrayOpcoes.map(function (opcao, index) {
                                return <div className="col-sm col-md-4 col-lg-4 mt-2" key={index}>

                                    <ButtonComponente
                                        type="button"
                                        className={opcao.className}
                                        icon={opcao.icon}
                                        label={opcao.label}
                                        onClick={opcao.acao}
                                    />
                                </div>
                            })
                        }
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalOpcoes