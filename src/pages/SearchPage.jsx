import React, { useState } from 'react';
import '../styling/SearchPage.css';
import { Link } from 'react-router-dom';

const SearchPage = ({ pokemons }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredType, setFilteredType] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterClick = (type) => {
        setFilteredType(type === filteredType ? '' : type);
    };

    const filteredPokemons = pokemons.filter((pokemon) => {
        const matchesSearch = pokemon.pokemon_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filteredType ? pokemon.type.includes(filteredType) : true;
        return matchesSearch && matchesType;
    });

    const typeColors = {
        Grass: '#9bcc50',
        Poison: '#b97fc9',
        Electric: '#eed535',
        Fire: '#fd7d24',
        Water: '#4592c4',
        Bug: '#729f3f',
        Flying: '#3dc7ef',
        Normal: '#a4acaf',
        // Add other types and their respective colors here
    };

    return (
        <>
            <header className="header">
                <div className="blue-circle"></div>
                <div className="top-left"></div>
                <div className="top-right"></div>
                <div className="middle">
                    <div className="middle-left"></div>
                    <div className="diagonal"></div>
                    <div className="middle-right"></div>
                </div>
            </header>

            <div className="search-main-area">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search Pokemon..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-bar full-width"
                    />

                    <div className="filter-buttons">
                        {Object.keys(typeColors).map((type) => (
                            <button
                                key={type}
                                className={`filter-button ${filteredType === type ? 'active' : ''}`}
                                style={{ backgroundColor: typeColors[type] }}
                                onClick={() => handleFilterClick(type)}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="pokemon-list-container">
                    <div className="pokemon-list">
                        {filteredPokemons.length > 0 ? (
                            filteredPokemons.map((pokemon) => (
                                <Link to={`/profile/${pokemon.id}`} key={pokemon.id} className="pokemon-item">
                                    {pokemon.pokemon_name}
                                </Link>
                            ))
                        ) : (
                            <p className="no-results">No Pokemon found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;
