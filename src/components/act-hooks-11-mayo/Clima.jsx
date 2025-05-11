import React from 'react';
import { useState, useEffect } from 'react'; //Importacion de los hooks useState y useEffect
import axios from 'axios'; //Importacion de la libreria axios para hacer peticiones http





import './Clima.css';

function Clima() {
    // Definicion de los hooks useState para almacenar el clima y el error
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);


    // Definicion del hook useEffect para hacer la peticion http al cargar el componente
    // El segundo argumento es un array vacio, lo que significa que solo se ejecutara una vez al cargar el componente
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiKey = "35fa91817ef532bfd2f872004d4c6319";
                const city = 'Medellin';
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
                );
                setWeather(response.data);
            } catch (err) {
                setError('Error consulta del clima');
            }
        };

        fetchWeather();
    }, []);

    return (
        <div className="clima">
            <h1 className="clima__titulo">Información del clima</h1>
            {error && <p className="clima__error">{error}</p>}
            {weather ? (
                <div className="clima__detalles">
                    <p className="clima__ciudad">Ciudad: {weather.name}</p>
                    <p className="clima__temperatura">Temperatura: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
                    <p className="clima__descripcion">Clima: {weather.weather[0].description}</p>
                </div>
            ) : (
                <p className="clima__cargando">Cargando...</p>
            )}
        </div>
    );
}

export default Clima;

