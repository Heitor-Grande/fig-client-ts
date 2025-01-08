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
}
function SelectComponente({
    options,
    value,
    onchange,
    label,
    required,
    disabled
}: typeSelectComponente) {
    return (
        <div className="form-group">
            <label>{label}</label>
            <select value={value} required={required} disabled={disabled} onChange={onchange} className="form-select form-select-sm" aria-label=".form-select-sm example">
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