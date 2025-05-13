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
    const [mostrarDatos, setMostrarDatos] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [exito, setExito] = useState(false);

    const datosASolicitar = [
        { name: "nombre", type: "text", placeholder: "Tu nombre completo", label: "Nombre:" },
        { name: "correo", type: "email", placeholder: "correo@ejemplo.com", label: "Correo electrónico:" },
        { name: "mensaje", type: "textarea", placeholder: "Escribe tu mensaje aquí...", label: "Mensaje:" },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validaciones dinámicas
        if (name === "correo" && value && !/\S+@\S+\.\S+/.test(value)) {
            setError("El correo no es válido");
        } else if (name === "nombre" && value && value.length < 3) {
            setError("El nombre debe tener al menos 3 caracteres");
        } else if (name === "mensaje" && value && value.length < 10) {
            setError("El mensaje debe tener al menos 10 caracteres");
        } else {
            setError(""); // Sin errores
        }

        setFormData({ ...formData, [name]: value });
        
        // Si hubo éxito anteriormente, resetear
        if (exito) setExito(false);
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

        // Simular envío
        setEnviando(true);
        
        setTimeout(() => {
            console.log("Datos enviados:", formData);

            // Mostrar los datos enviados
            setMostrarDatos(true);

            // Incrementar el contador
            setContador((prevContador) => prevContador + 1);

            // Guardar los datos en el estado de cards
            setCards((prevCards) => ({
                ...prevCards,
                [`card-${contador}`]: {
                    contador: { ...formData },
                    id: contador,
                    fecha: new Date().toLocaleString()
                },
            }));

            // Limpiar el formulario
            setFormData({ nombre: "", correo: "", mensaje: "" });
            setError(""); // Limpiar errores
            setEnviando(false);
            setExito(true);
            
            // Ocultar mensaje de éxito después de 3 segundos
            setTimeout(() => {
                setExito(false);
            }, 3000);
        }, 1000);
    };

    return (
        <div className="formulario-contacto">
            <h1 className="formulario-contacto__titulo">Formulario de Contacto</h1>
            
            {error && <p className="formulario-contacto__error">{error}</p>}
            {exito && <p className="formulario-contacto__exito">¡Mensaje enviado con éxito!</p>}
            
            <form onSubmit={handleSubmit} className="formulario-contacto__formulario">
                {datosASolicitar.map((campo) => (
                    <div key={campo.name} className="formulario-contacto__grupo">
                        <label className="formulario-contacto__label">
                            {campo.label}
                        </label>
                        
                        {campo.type === "textarea" ? (
                            <textarea
                                name={campo.name}
                                value={formData[campo.name]}
                                onChange={handleChange}
                                placeholder={campo.placeholder}
                                className={`formulario-contacto__input formulario-contacto__input--${campo.name}`}
                                rows={5}
                            />
                        ) : (
                            <input
                                type={campo.type}
                                name={campo.name}
                                value={formData[campo.name]}
                                onChange={handleChange}
                                placeholder={campo.placeholder}
                                className={`formulario-contacto__input formulario-contacto__input--${campo.name}`}
                            />
                        )}
                    </div>
                ))}
                
                <button 
                    type="submit" 
                    className="formulario-contacto__boton"
                    disabled={enviando}
                >
                    {enviando ? "Enviando..." : "Enviar mensaje"}
                </button>
            </form>
            
            {mostrarDatos && Object.keys(cards).length > 0 && (
                <div className="formulario-contacto__datos">
                    <h2 className="formulario-contacto__subtitulo">Mensajes enviados</h2>
                    <div className="formulario-contacto__datos-lista">
                        {Object.entries(cards).map(([key, value]) => (
                            <div key={key} className="formulario-contacto__card">
                                <p className="formulario-contacto__card-nombre">
                                    <strong>Nombre:</strong> {value.contador.nombre}
                                </p>
                                <p className="formulario-contacto__card-correo">
                                    <strong>Correo:</strong> {value.contador.correo}
                                </p>
                                <p className="formulario-contacto__card-mensaje">
                                    <strong>Mensaje:</strong> {value.contador.mensaje}
                                </p>
                                {value.fecha && (
                                    <p className="formulario-contacto__card-fecha">
                                        <strong>Fecha:</strong> {value.fecha}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FormularioContacto;