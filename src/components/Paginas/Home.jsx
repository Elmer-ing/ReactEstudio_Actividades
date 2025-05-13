import React from 'react';
import { useState } from 'react';
import Inicio from '../WikiEstudio/Inicio';
import GithubUserSearch from '../03-mayo/GithubUserSearch';
import CurrencyConverter from '../03-mayo/CurrencyConverter';
import TMDBComponent from '../10-mayo/TMDBComponent';
import Clima from '../act-hooks-11-mayo/Clima';
import FormularioContacto from '../act-hooks-11-mayo/FormularioContacto';

import './Home.css'
import './Nav.css'

function Home () {

    const [paginaActiva, setPaginaActiva] = useState(<Inicio/>)

    const paguinas = {
        1:{
            nombre: "Inico",
            Component: <Inicio/>
        },
        2:{
            nombre: "Buscador GitHub",
            Component: <GithubUserSearch/>
        },
        3:{
            nombre: "Convertir Moneda",
            Component: <CurrencyConverter/>
        },
        4:{
            nombre: "Buscador de peliculas",
            Component: <TMDBComponent/>
        },
        5:{
            nombre: "Consultar clima (medellin)",
            Component: <Clima/>
        },
        6:{
            nombre: "Formulario sencillo",
            Component: <FormularioContacto/>
        },
    }

    return (
        <div className='home'>
            <div className='home-baner'>
                <p className='home-baner__titluto'>
                    ESTUDIO Y ACTIVIDADES
                </p>
                <div>
                    <p>
                        boton: modo oscuro
                    </p>
                </div>
            </div>
            <Navegacion
                paginas={paguinas}
                paginaActiva={paginaActiva}
                setPaginaActiva={setPaginaActiva}
            />
            <div className='home-tablero'>
                {paginaActiva}
            </div>
            
        </div>
    )
}

function Navegacion({ paginas, setPaginaActiva, paginaActiva }) {

    const esItemActivo = (item) => {
        return paginaActiva.type === item.type;
      };

    return (
        <nav className="Nav">
            <ul className="Nav-lista">
                {Object.entries(paginas).map(([key, pagina]) => {
                    const isActive = esItemActivo(pagina.Component);
                    return (
                        <li
                        key={key}
                        onClick={() => setPaginaActiva(pagina.Component)}
                        className={`Nav-lista__item ${isActive ? 'Nav-lista__item--active' : ''}`}
                        >
                        {pagina.nombre}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}


export default Home

