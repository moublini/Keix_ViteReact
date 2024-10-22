import { MouseEventHandler } from "react";

interface ButtonProps {
    display: string,
    active?: boolean,
    onClick: MouseEventHandler<HTMLButtonElement>,
}

function Button({ display, onClick, active }: ButtonProps) {
    return (
        <button className={active ? 'border' : ''} onClick={onClick}>{display}</button>
    );
}

export default Button;