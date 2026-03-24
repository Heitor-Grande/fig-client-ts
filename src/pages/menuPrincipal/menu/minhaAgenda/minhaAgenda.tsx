import { useState } from "react"
import "./css/minhaAgenda.css"
import FormAgenda from "./components/modalFormAgenda"

export default function MinhaAgenda() {

    const hoje = new Date()

    const formAgendaInicial = {
        show: false,
        dia: "",
        mes: "",
        ano: ""
    }

    const [formAgenda, setFormAgenda] = useState(formAgendaInicial)

    const [mesSelecionado, setMesSelecionado] = useState(
        `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}`
    )

    function gerarDias() {

        const [ano, mes] = mesSelecionado.split("-").map(Number)

        const primeiroDia = new Date(ano, mes - 1, 1).getDay()
        const totalDias = new Date(ano, mes, 0).getDate()

        const dias = []

        for (let i = 0; i < primeiroDia; i++) {
            dias.push(null)
        }

        for (let dia = 1; dia <= totalDias; dia++) {
            dias.push(dia)
        }


        return dias
    }

    const dias = gerarDias()

    return (
        <div className="agenda-container p-2">

            <h4>Minha Agenda</h4>

            <div className="mb-3">
                <input
                    type="month"
                    value={mesSelecionado}
                    onChange={(e) => setMesSelecionado(e.target.value)}
                    className="form-control"
                />
            </div>

            <div className="dias-semana">
                <div>Dom</div>
                <div>Seg</div>
                <div>Ter</div>
                <div>Qua</div>
                <div>Qui</div>
                <div>Sex</div>
                <div>Sab</div>
            </div>

            <div className="grid-calendario">

                {dias.map((dia, index) => (
                    <div
                        key={index}
                        className="dia"
                        onClick={function () {

                            setFormAgenda(function (form) {

                                const mes = mesSelecionado.split("-")[1]
                                const ano = mesSelecionado.split("-")[0]

                                return {
                                    ...form,
                                    show: true,
                                    dia: String(dia).padStart(2, "0"),
                                    mes: mes,
                                    ano: ano
                                }
                            })
                        }}
                    >
                        <label className="text-color-icon">
                            {dia}
                        </label>
                        <div className="text-center">
                            <span className="badge bg-primary">X</span>
                        </div>
                    </div>
                ))}

            </div>

            <FormAgenda
                show={formAgenda.show}
                dia={formAgenda.dia}
                mes={formAgenda.mes}
                ano={formAgenda.ano}
                onClose={function () {
                    setFormAgenda(formAgendaInicial)
                }}
            />
        </div>
    )
}