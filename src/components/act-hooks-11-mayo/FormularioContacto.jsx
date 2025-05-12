import React, { useState } from "react";
import "./FormularioContacto.css";

function FormularioContacto() {
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        mensaje: "",
    });

    const [contador, setContador] = useState(0);

    const [cards, setCards] = useState({});

    const [error, setError] = useState("");
    const [mostrarDatos, setMostrarDatos] = useState(false); // Estado para controlar la visibilidad de los datos

    const datosASolicitar = [
        { name: "nombre", type: "text", placeholder: "Nombre", label: "Nombre:" },
        { name: "correo", type: "email", placeholder: "Correo", label: "Correo:" },
        { name: "mensaje", type: "text", placeholder: "Mensaje", label: "Mensaje:" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validaciones dinámicas
        if (name === "correo" && !/\S+@\S+\.\S+/.test(value)) {
            setError("El correo no es válido");
        } else if (name === "nombre" && value.length < 3) {
            setError("El nombre debe tener al menos 3 caracteres");
        } else if (name === "mensaje" && value.length < 10) {
            setError("El mensaje debe tener al menos 10 caracteres");
        } else {
            setError(""); // Sin errores
        }

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar campos vacíos
        if (!formData.nombre || !formData.correo || !formData.mensaje) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        // Validar si hay errores
        if (error) {
            return;
        }

        console.log("Datos enviados:", formData);

        // Mostrar los datos enviados
        setMostrarDatos(true);

        // Incrementar el contador
        setContador((prevContador) => prevContador + 1);

        // Guardar los datos en el estado de cards
        setCards((prevCards) => ({
            ...prevCards,
            [`card-${contador}`]: {
                contador: formData,
            },
        }));

        // Limpiar el formulario
        setFormData({ nombre: "", correo: "", mensaje: "" });
        setError(""); // Limpiar errores
    };

    return (
        <div className="formulario-contacto">
            <h1 className="formulario-contacto__titulo">Formulario de Contacto</h1>
            {error && <p className="formulario-contacto__error">{error}</p>}
            <form onSubmit={handleSubmit} className="formulario-contacto__formulario">
                {datosASolicitar.map((campo) => (
                    <label key={campo.name} className="formulario-contacto__label">
                        {campo.label}
                        <input
                            type={campo.type}
                            name={campo.name}
                            value={formData[campo.name]}
                            onChange={handleChange}
                            placeholder={campo.placeholder}
                            className={`formulario-contacto__input formulario-contacto__input--${campo.name}`}
                        />
                    </label>
                ))}
                <button type="submit" className="formulario-contacto__boton">Enviar</button>
            </form>
            {mostrarDatos && ( // Mostrar los datos solo si mostrarDatos es true
                <div className="formulario-contacto__datos">
                    <h2 className="formulario-contacto__subtitulo">Datos enviados:</h2>
                    <div className="formulario-contacto__datos-lista">
                        {Object.entries(cards).map(([key, value]) => (
                            <div key={key} className="formulario-contacto__card">
                                <p><strong>Nombre:</strong> {value.contador.nombre}</p>
                                <p><strong>Correo:</strong> {value.contador.correo}</p>
                                <p><strong>Mensaje:</strong> {value.contador.mensaje}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormularioContacto;