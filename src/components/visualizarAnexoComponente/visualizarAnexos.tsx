import { Modal } from "react-bootstrap"
import Table from "../table/table"
import bytesParaKB from "../../functions/bytesParaKB"
import { isNumber } from "@mui/x-data-grid/internals"
interface typeVisualizarAnexos {
    mostrar?: boolean
    onRowClick: (dados: any) => void
    fecharModal?: () => void
    anexos: any
    modal: boolean
}
function VisualizarAnexos(
    {
        mostrar,
        onRowClick,
        fecharModal,
        anexos,
        modal
    }: typeVisualizarAnexos
) {
    const columns = [
        {
            field: "name",
            headerName: "Nome",
            width: 400,
            type: "string"
        },
        {
            field: "type",
            headerName: "Tipo",
            width: 200,
            type: "string"
        },
        {
            field: "size",
            headerName: "Tamanho",
            width: 150,
            type: "string",
            cellClassName: function (objColuna: any) {
                if (isNumber(objColuna.formattedValue)) {
                    objColuna.formattedValue = bytesParaKB(objColuna.formattedValue)
                }
            }
        },
        {
            field: "criacao",
            headerName: "Data de Upload",
            width: 150,
            type: "Date"
        }
    ]

    return (
        <>
            {modal == true ?
                <Modal show={mostrar} size="xl" centered onHide={fecharModal}>
                    <Modal.Header closeButton>
                        <h4>Anexos do movimento</h4>
                    </Modal.Header>
                    <Modal.Body>
                        <Table
                            rows={anexos}
                            columns={columns}
                            checkboxSelection={false}
                            pageSize={5}
                            pageSizeOptions={[5, 10, 15]}
                            onRowClick={onRowClick}
                        />
                    </Modal.Body>
                </Modal>
                :
                <Table
                    rows={anexos}
                    columns={columns}
                    checkboxSelection={false}
                    pageSize={5}
                    pageSizeOptions={[5, 10, 15]}
                    onRowClick={onRowClick}
                />
            }
        </>
    )
}
export default VisualizarAnexos