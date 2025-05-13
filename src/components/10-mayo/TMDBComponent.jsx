import React, { useState } from 'react';
import './TMDBComponent.css';

// Constantes en un objeto de configuración
const CONFIG = {
  API_KEY: 'c370ebe1095a5bed7ebf0f7f830e6344',
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500'
};

// Componente para la barra de búsqueda
const SearchBar = ({ query, setQuery, onSearch }) => {
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="buscador-pelicula__formulario">
      <input
        type="text"
        className="buscador-pelicula__entrada"
        placeholder="Buscar películas..."
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button
        className="buscador-pelicula__boton"
        onClick={onSearch}
      >
        Buscar
      </button>
    </div>
  );
};

// Componente para la tarjeta de película
const PeliculaTarjeta = ({ pelicula }) => {
  return (
    <div className="buscador-pelicula__pelicula">
      <h2 className="buscador-pelicula__pelicula-titulo">{pelicula.title}</h2>
      <div className="buscador-pelicula__pelicula-contenido">
        {pelicula.poster_path ? (
          <img
            src={`${CONFIG.IMAGE_BASE_URL}${pelicula.poster_path}`}
            alt={pelicula.title}
            className="buscador-pelicula__pelicula-poster"
          />
        ) : (
          <div className="buscador-pelicula__pelicula-sin-poster">
            <p>Sin imagen disponible</p>
          </div>
        )}
        <div className="buscador-pelicula__pelicula-detalles">
          <p className="buscador-pelicula__pelicula-fecha">
            {pelicula.release_date ? `Estreno: ${new Date(pelicula.release_date).toLocaleDateString('es-ES')}` : 'Fecha no disponible'}
          </p>
          <p className="buscador-pelicula__pelicula-valoracion">
            {pelicula.vote_average ? `Valoración: ${pelicula.vote_average}/10` : 'Sin valoración'}
          </p>
          <p className="buscador-pelicula__pelicula-descripcion">
            {pelicula.overview || 'Sin descripción disponible.'}
          </p>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const TMDBComponent = () => {
  const [query, setQuery] = useState('');
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const buscarPeliculas = async () => {
    if (query.trim() === '') return;
    
    try {
      setCargando(true);
      setError(null);
      
      const response = await fetch(
        `${CONFIG.BASE_URL}/search/movie?api_key=${CONFIG.API_KEY}&query=${query}&language=es-ES`
      );
      
      if (!response.ok) {
        throw new Error('Error en la petición a la API');
      }
      
      const data = await response.json();
      setPeliculas(data.results);
    } catch (error) {
      console.error('Error al buscar películas:', error);
      setError('Ocurrió un error al buscar películas. Por favor, inténtelo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="buscador">
      <div className="buscador-pelicula__cabecera">
        <h1 className="buscador-pelicula__titulo">Buscador de Películas</h1>
        <p className="buscador-pelicula__descripcion">
          Encuentra información sobre tus películas favoritas
        </p>
      </div>
      
      <SearchBar 
        query={query} 
        setQuery={setQuery} 
        onSearch={buscarPeliculas} 
      />
      
      <div className="buscador-pelicula__resultados">
        {cargando && (
          <div className="buscador-pelicula__cargando">
            <p>Buscando películas...</p>
          </div>
        )}
        
        {error && (
          <div className="buscador-pelicula__error">
            <p>{error}</p>
          </div>
        )}
        
        {!cargando && !error && peliculas.length === 0 && query !== '' && (
          <p className="buscador-pelicula__sin-resultados">
            No se encontraron resultados para "{query}".
          </p>
        )}
        
        {!cargando && !error && peliculas.length > 0 && (
          <>
            <p className="buscador-pelicula__contador-resultados">
              {peliculas.length} {peliculas.length === 1 ? 'resultado' : 'resultados'} encontrados
            </p>
            <div className="buscador-pelicula__lista-peliculas">
              {peliculas.map((pelicula) => (
                <PeliculaTarjeta key={pelicula.id} pelicula={pelicula} />
              ))}
            </div>
          </>
        )}
        
        {!cargando && !error && query === '' && (
          <div className="buscador-pelicula__instrucciones">
            <p>Ingrese el nombre de una película para comenzar la búsqueda</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TMDBComponent;