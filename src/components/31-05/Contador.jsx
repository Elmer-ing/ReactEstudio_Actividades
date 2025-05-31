import React from "react";
import { useState } from "react";
import './Contador.css';

const Contador = () => {
    const [numero, setNumero] = useState(0);

    const incrementar = () => {
        setNumero(numero + 1);
    };

    const decrementar = () => {
        setNumero(numero - 1);
    };

    return (
        <div className="contador">
            <h1 className="contador__titulo">Contador: {numero}</h1>
            <button className="contador__boton" onClick={decrementar}>Aumentar</button>
            <button className="contador__boton" onClick={incrementar}>Disminuir</button>
        </div>
    );
}

export default Contador;