import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { Modal } from "react-bootstrap";
import InputComponente from "../../../../components/inputComponent/inputComponente";
const styleCloseBtn: React.CSSProperties = {
    cursor: "pointer",
    width: "auto", display: "inline-block", padding: "5px"
}
function MeusLembretes() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm col-md-12 col-lg-12">
                    <p className="text-center">
                        Utilize a criação de lembretes para receber notificações de aviso.
                    </p>
                    <p className="text-center  mb-0 pb-0">
                        Possuí compromissos que são recorrentes? Crie um <b>Lembrete Recorrente</b>, para sempre receber notificações
                    </p>
                    <p className="pt-0 mt-0 text-center">
                        de aviso quando o seu compromisso estiver se aproximando da data.
                    </p>
                    <p className="text-center">
                        Possuí compromisso exporadico? Crie um <b>Lembrete Único</b>, para receber a notificação de aviso e em seguida o lembrete ser deletado.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-sm col-md-5 col-lg-4">
                    <div className="card bg-secondary">
                        <div className="card-body p-5 text-center">
                            <br />
                            <br />
                            <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />}>
                                Criar Novo Lembrete
                            </Button>
                            <br />
                            <br />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">

            </div>
            <Modal show centered>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row flex-row-reverse">
                            <i className="bi bi-x-circle-fill text-danger" style={styleCloseBtn}></i>
                        </div>
                        <div className="row">
                            <div className="col-sm col-md-12 col-lg-12">
                                <InputComponente
                                    label="Título do Lembrete"
                                    tipo="text"
                                    required
                                    id="title"
                                    placeholder="Digite aqui o título do lembrete..."
                                    value=""
                                    onchange={function (e) {

                                    }}
                                    readOnly={false}
                                    maxLength={30}
                                    minLength={5}
                                />
                            </div>
                            <div className="col-sm col-md-12 col-lg-12">
                                {/*Fazer um componente de textarea para por aqui ou um campo que edite coloque bold etc */}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default MeusLembretes