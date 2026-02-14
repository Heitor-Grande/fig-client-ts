interface typeInputComponente {
    label: string
    tipo: string,
    required: boolean
    className?: string,
    id: string,
    placeholder: string,
    value: string,
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void
    readOnly: boolean,
    maxLength?: number,
    minLength?: number
}
function InputComponente({
    label,
    tipo,
    required,
    className = "form-control form-control-sm",
    id,
    placeholder,
    value,
    onchange,
    readOnly,
    maxLength,
    minLength
}: typeInputComponente) {
    return <div className="form-group">
        <label>{label}</label>
        <input type={tipo}
            disabled={readOnly}
            required={required}
            value={value}
            onChange={onchange}
            className={'form-control form-control-sm ' + className}
            id={id}
            placeholder={placeholder}
            maxLength={maxLength}
            minLength={minLength}
        />
    </div>
}

export default InputComponente