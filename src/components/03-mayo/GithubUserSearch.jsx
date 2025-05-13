import { useEffect, useState } from 'react';
import './GithubUserSearch.css';

function GithubUserSearch() {
  // Estado para almacenar la consulta de búsqueda
  const [query, setQuery] = useState('');
  // Estado para almacenar los resultados de la búsqueda
  const [results, setResults] = useState([]);
  // Estado para indicar si la búsqueda está cargando
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Si la consulta tiene menos de 3 caracteres, limpiar resultados y salir
    if (query.length < 3) {
      setResults([]);
      return;
    }

    // Crear un controlador para abortar la solicitud si es necesario
    const controller = new AbortController();
    setLoading(true);

    // Función asíncrona para buscar usuarios en la API de GitHub
    const fetchUsers = async () => {
      try {
        // Realizar la solicitud a la API
        const response = await fetch(
          `https://api.github.com/search/users?q=${query}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        // Actualizar los resultados con los datos obtenidos
        setResults(data.items || []);
      } catch (error) {
        // Manejar errores, excepto si es un aborto de la solicitud
        if (error.name !== 'AbortError') {
          console.error('Error en la búsqueda:', error);
        }
      } finally {
        // Indicar que la carga ha terminado
        setLoading(false);
      }
    };

    // Configurar un debounce de 500ms antes de realizar la búsqueda
    const timeoutId = setTimeout(() => {
      fetchUsers();
    }, 500);

    // Limpiar efectos anteriores si la consulta cambia o el componente se desmonta
    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [query]); // Ejecutar el efecto cuando cambie la consulta

  return (
    <div className="buscador-github">
      <h2 className="buscador-github__titulo">Buscar usuarios en GitHub</h2>
      
      {/* Campo de entrada para la consulta de búsqueda */}
      <div className="buscador-github__contenedor-entrada">
        <input
          type="text"
          className="buscador-github__entrada"
          placeholder="Escribe al menos 3 caracteres"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>
      
      {/* Mostrar mensaje de carga si está buscando */}
      {loading && <p className="buscador-github__cargando">Cargando resultados...</p>}
      
      {/* Lista de resultados */}
      {results.length > 0 && (
        <ul className="buscador-github__lista">
          {results.map(user => (
            <li key={user.id} className="buscador-github__elemento">
              <div className="buscador-github__usuario">
                {/* Mostrar avatar del usuario */}
                <img 
                  src={user.avatar_url} 
                  alt={`Avatar de ${user.login}`} 
                  className="buscador-github__avatar" 
                />
                {/* Enlace al perfil del usuario */}
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="buscador-github__enlace"
                >
                  {user.login}
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {query.length >= 3 && results.length === 0 && !loading && (
        <p className="buscador-github__sin-resultados">No se encontraron usuarios</p>
      )}
    </div>
  );
}

export default GithubUserSearch;
