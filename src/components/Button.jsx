import { useState } from "react";

const Button = ({ label, color = 'blue' }) => {

    const [total, setTotal] = useState(0);

    const style = {
        backgroundColor: color,
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '5px'
    };
    return (
        <>
            <h2>Rp. {total}</h2>
            <button style={style} onClick={() => setTotal(total + 1)}>{label}</button>
        </>
    )
}

export default Button