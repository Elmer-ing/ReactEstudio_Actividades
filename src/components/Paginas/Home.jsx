import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import Inicio from '../WikiEstudio/Inicio';
import GithubUserSearch from '../03-mayo/GithubUserSearch';
import CurrencyConverter from '../03-mayo/CurrencyConverter';
import TMDBComponent from '../10-mayo/TMDBComponent';
import Clima from '../act-hooks-11-mayo/Clima';
import FormularioContacto from '../act-hooks-11-mayo/FormularioContacto';
import Contador from '../31-05/Contador';

import './Home.css'
import './Nav.css'

import { temaContexto } from '../../App'; //aqui se importa el contexto global

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
        7:{
            nombre: "Contador",
            Component: <Contador/>
        }
    }

    const { tema, setTema } = useContext(temaContexto); // Aqui se desesctrurctura el objeto

    const cambiarTema = () => {
        setTema(tema === 'oscuro' ? '' : 'oscuro');
      };

    return (
        <div className={`home ${tema}`}>
            <div className='home-baner'>
                <p className='home-baner__titluto'>
                    ESTUDIO Y ACTIVIDADES
                </p>
                <button onClick={cambiarTema} className='boton-tema'>
                    Cambia a modo {tema === 'oscuro' ? 'claro' : 'oscuro'}
                </button>
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

