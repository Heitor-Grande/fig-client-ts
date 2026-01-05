export function Lembretes() {

    const styleNovoLembrete: React.CSSProperties = {
        height: "150px"
    }

    const styleCard: React.CSSProperties = {
        cursor: "pointer"
    }

    return (
        <div className="container-fluid">
            <div className="row text-center">
                <div className="col-sm col-md-12 col-lg-12">
                    <p className="text-center">
                        Crie seus Lembretes.
                    </p>
                    <p className="text-center">
                        Os lembretes podem ser classificados em <b>"Diário", "Semanal", "Mensal" ou "Único"</b>.
                    </p>
                </div>
            </div>
            <div className="row w-100" style={styleNovoLembrete}>
                <div className="col-sm col-md-4 col-lg-4 d-inline-block h-100">
                    <div className="card bg-dark d-inline-block h-100 w-100" style={styleCard}>
                        <div className="card-body text-center pt-5">
                            <i className="bi bi-plus-square-fill text-white fs-3"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-sm col-md-12 col-lg-12">
                    <h5 className="text-center fs-4">Meus Lembretes</h5>
                </div>
            </div>
            <div className="row mt-3 mb-3">
                
            </div>
        </div>
    )
}