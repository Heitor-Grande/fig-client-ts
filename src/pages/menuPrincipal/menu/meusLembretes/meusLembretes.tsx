import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
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
                            <h5 className="card-title text-white">Título do Lembrete</h5>
                            <p className="card-text text-white">Descrição do lembrete.</p>
                            <Button variant="contained" color="primary" size="small" startIcon={<AddIcon />}>
                                Criar Novo Lembrete
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">

            </div>
        </div>
    )
}
export default MeusLembretes