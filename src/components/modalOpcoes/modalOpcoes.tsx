import { Modal } from "react-bootstrap"
import Button from '@mui/material/Button';
interface typeOpcoesModalOpcoes {
    label: string
    acao: () => void
    icone: React.JSX.Element
    color: "secondary" | "success" | "error" | "info" | "warning"
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
                <h4>{titulo}</h4>
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
                                    <Button type="button" sx={{ width: "100%" }} variant="contained" color={opcao.color} size="small" startIcon={opcao.icone} onClick={opcao.acao}>
                                        {opcao.label}
                                    </Button>
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