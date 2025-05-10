import React, { Component } from 'react';
import './TMDBComponent.css';

const API_KEY = 'c370ebe1095a5bed7ebf0f7f830e6344';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

class TMDBComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: [],
        };
    }

    handleInputChange = (event) => {
        this.setState({ query: event.target.value });
    };

    searchMovies = async () => {
        const { query } = this.state;
        if (query.trim() === '') return;

        try {
            const response = await fetch(
                `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
            );
            const data = await response.json();
            this.setState({ results: data.results });
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    render() {
        const { query, results } = this.state;

        return (
            <div className="tmdb-component">
                <h1 className="tmdb-component__title">Buscador de Películas</h1>
                <div className="tmdb-component__search">
                    <input
                        type="text"
                        className="tmdb-component__input"
                        placeholder="Buscar películas..."
                        value={query}
                        onChange={this.handleInputChange}
                    />
                    <button
                        className="tmdb-component__button"
                        onClick={this.searchMovies}
                    >
                        Buscar
                    </button>
                </div>
                <div className="tmdb-component__results">
                    {results.length > 0 ? (
                        results.map((movie) => (
                            <div key={movie.id} className="tmdb-component__movie">
                                <h2 className="tmdb-component__movie-title">{movie.title}</h2>
                                {movie.poster_path ? (
                                    <img
                                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                                        alt={movie.title}
                                        className="tmdb-component__movie-poster"
                                    />
                                ) : (
                                    <p className="tmdb-component__no-poster">Sin imagen disponible.</p>
                                )}
                                <p className="tmdb-component__movie-overview">
                                    {movie.overview || 'Sin descripción disponible.'}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="tmdb-component__no-results">No se encontraron resultados.</p>
                    )}
                </div>
            </div>
        );
    }
}

export default TMDBComponent;