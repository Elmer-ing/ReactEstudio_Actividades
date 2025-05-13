import React from "react";
import miImagen from "../../assets/estudiante_cesde_animado.png"

import './Inicio.css';

function Inicio() {
  return (
    <div className="inicio">
      <div className="inicio__contenido">
        <h2 className="inicio__titulo">
          Mi Portafolio de Actividades - Desarrollo Web con React
        </h2>
        <p className="inicio__parrafo">
          Hola! Mi nombre es <strong>Elmer Mosquera</strong>, y soy estudiante del programa de <strong>Análisis y Desarrollo de Software</strong> en CESDE. Esta página ha sido creada como un espacio personal para documentar y compartir las diversas actividades asignadas en la materia de <strong>Desarrollo Web</strong>. Actualmente, nuestro enfoque principal es la construcción de aplicaciones web utilizando la potente biblioteca de JavaScript, <strong>React</strong>. Aquí podrás encontrar detalles sobre cada tarea, mis avances y reflexiones sobre el proceso de aprendizaje. ¡Espero que te sea útil!
        </p>
      </div>
      <div className="inicio__imagen-contenedor">
        <img 
          className="inicio__imagen" 
          src={miImagen} 
          alt="Elmer Mosquera - Desarrollador Web" 
        />
      </div>
    </div>
  );
}

export default Inicio;