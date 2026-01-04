import { Modal } from "react-bootstrap"
import Button from '@mui/material/Button';
interface typeModalConfirmacao {
    mostrar: boolean
    mensagemPrincipal: string
    labelBtnConfirmar: string
    labelBtnCancelar: string
    acaoBtnConfirmar: () => void
    acaoBtnCancelar: () => void
}
function ModalConfirmacao({
    mostrar,
    mensagemPrincipal,
    labelBtnConfirmar,
    labelBtnCancelar,
    acaoBtnConfirmar,
    acaoBtnCancelar
}: typeModalConfirmacao) {
    return (
        <Modal show={mostrar} size="lg" centered>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm col-md-12 col-lg-12 text-center">
                            <i className="bi bi-question-circle fs-1"></i>
                        </div>
                        <div className="col-sm col-md-12 col-lg-12 text-center">
                            <p>{mensagemPrincipal}</p>
                        </div>
                        <div className="col-sm col-md-12 col-lg-12 text-center">
                            <Button onClick={acaoBtnCancelar} size="small" className="me-2" variant="contained" color="error">{labelBtnCancelar}</Button>
                            <Button onClick={acaoBtnConfirmar} size="small" variant="contained" color="primary">{labelBtnConfirmar}</Button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default ModalConfirmacao