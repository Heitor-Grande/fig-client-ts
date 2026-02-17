interface typeTextAreaComponente {
    label: string
    required: boolean
    className?: string,
    id: string,
    value: string,
    onchange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    disabled: boolean,
    rows: number,
    maxLength?: number,
    minLength?: number
}
function TextAreaComponent({
    label,
    required,
    className,
    id,
    rows,
    value,
    onchange,
    disabled,
    maxLength,
    minLength
}: typeTextAreaComponente) {
    return <div className="form-group">
        <label>{label}</label>
        <textarea
            className={className + ' form-control form-control-sm'}
            id={id}
            onChange={onchange}
            rows={rows}
            value={value}
            disabled={disabled}
            maxLength={maxLength}
            minLength={minLength}
            required={required}
        >

        </textarea>
    </div>
}

export default TextAreaComponent