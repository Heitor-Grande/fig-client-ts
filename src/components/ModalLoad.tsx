import Modal from 'react-bootstrap/Modal';
import { typeModalLoad } from '../types/globalTypes';


function ModalLoad({ carregando, mensagem }: typeModalLoad) {
    return (
        <Modal show={carregando} centered size="sm">
            <Modal.Body>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status"></div>
                </div>
                <p className='text-center m-0 p-0'>{mensagem}</p>
            </Modal.Body>
        </Modal>
    );
}

export default ModalLoad;
