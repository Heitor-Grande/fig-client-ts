import { Modal } from "react-bootstrap"
import Button from '@mui/material/Button';
import ButtonComponente from "../buttonComponent/buttonComponent";
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
        <Modal show={mostrar} size="sm" centered>
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
                            <ButtonComponente
                                type="button"
                                className="btn-outline-primary me-2"
                                label={labelBtnCancelar}
                                onClick={acaoBtnCancelar}
                            />
                            <ButtonComponente
                                type="button"
                                className="btn-outline-danger"
                                label={labelBtnConfirmar}
                                onClick={acaoBtnConfirmar}
                            />
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default ModalConfirmacao