import { useEffect, useState } from 'react';

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
    <div style={{ padding: '1rem' }}>
      <h2>Buscar usuarios en GitHub</h2>
      {/* Campo de entrada para la consulta de búsqueda */}
      <input
        type="text"
        placeholder="Escribe al menos 3 caracteres"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '100%', maxWidth: '300px' }}
      />

      {/* Mostrar mensaje de carga si está buscando */}
      {loading && <p>Cargando...</p>}

      {/* Lista de resultados */}
      <ul style={{ marginTop: '1rem' }}>
        {results.map(user => (
          <li key={user.id} style={{ marginBottom: '0.5rem' }}>
            {/* Mostrar avatar del usuario */}
            <img src={user.avatar_url} alt={user.login} width={30} style={{ marginRight: '8px' }} />
            {/* Enlace al perfil del usuario */}
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">{user.login}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GithubUserSearch;
