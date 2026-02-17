interface typeSelectComponente {
    options: {
        label: string;
        value: string;
    }[]
    value: string
    onchange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    label: string
    required: boolean
    disabled: boolean
    id?: string
}
function SelectComponente({
    options,
    value,
    onchange,
    label,
    required,
    disabled,
    id
}: typeSelectComponente) {
    return (
        <div className="form-group">
            <label>{label}</label>
            <select value={value} id={id} required={required} disabled={disabled} onChange={onchange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                <option value="" key={0}>Selecione...</option>
                {
                    options.map(function (option, index) {
                        return <option value={option.value} key={index + 1}>{option.label}</option>
                    })
                }
            </select>
        </div>
    )
}
export default SelectComponente