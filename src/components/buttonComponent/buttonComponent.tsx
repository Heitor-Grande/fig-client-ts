import { ButtonComponentType } from "../../types/globalTypes";

export default function ButtonComponente({
    type,
    label,
    onClick,
    className,
    icon
}: ButtonComponentType) {

    return <button type={type} className={className + ' btn btn-sm'} onClick={onClick}>
        {
            (icon && label != "") ? (
                <i className={icon + ' me-2'} />
            ) : (
                <i className={icon} />
            )
        }


        {label}
    </button>
}