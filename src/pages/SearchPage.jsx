import React, { useState, useEffect } from 'react';
import '../styling/SearchPage.css';
import { Link } from 'react-router-dom';
import { typeColors, typeOptions } from '../static';

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredType, setFilteredType] = useState('');
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Pokémon data from the backend
    useEffect(() => {
        const fetchPokemons = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://3.141.16.135:8000/pokemon');
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokémon data');
                }
                const data = await response.json();
                console.log(data)
                setPokemons(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterClick = (type) => {
        setFilteredType(type === filteredType ? '' : type);
    };

    // Filter Pokémon based on search term and selected type
    const filteredPokemons = pokemons.filter((pokemon) => {
        const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filteredType ? pokemon.type.includes(filteredType) : true;
        return matchesSearch && matchesType;
    });

    if (loading) {
        return <p>Loading Pokémon...</p>;
    }

    if (error) {
        return <p>Error loading Pokémon: {error}</p>;
    }

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
                <input
                    type="text"
                    placeholder="Search Pokémon..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-bar"
                />

                <div className="filters-and-results">
                    <div className="main-filter-screen">
                        <div className="filter-buttons-column">
                            <div className="filter-buttons-grid">
                                {typeOptions.map((type) => (
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
                    </div>

                    <div className="main-list-screen">
                        {filteredPokemons.length > 0 ? (
                            filteredPokemons.map((pokemon) => (
                                <Link to={`/profile/${pokemon.id}`} key={pokemon.id} className="pokemon-item">
                                    <div className="pokemon-item-details">
                                        <p className="pokemon-name">{pokemon.name}</p>
                                        <div className="pokemon-types">
                                            {pokemon.type.map((type, index) => (
                                                <span
                                                    key={index}
                                                    className="pokemon-type"
                                                    style={{ backgroundColor: typeColors[type] }}
                                                >
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="no-results">No Pokémon found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;

// import React, { useState } from 'react';
// import '../styling/SearchPage.css';
// import { Link } from 'react-router-dom';
// import { typeColors } from '../static'; // Import typeColors

// const SearchPage = ({ pokemons }) => {
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filteredType, setFilteredType] = useState('');

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const handleFilterClick = (type) => {
//         setFilteredType(type === filteredType ? '' : type);
//     };

//     const filteredPokemons = pokemons.filter((pokemon) => {
//         const matchesSearch = pokemon.pokemon_name.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesType = filteredType ? pokemon.type.includes(filteredType) : true;
//         return matchesSearch && matchesType;
//     });

//     return (
//         <>
//             <header className="header">
//                 <div className="blue-circle"></div>
//                 <div className="top-left"></div>
//                 <div className="top-right"></div>
//                 <div className="middle">
//                     <div className="middle-left"></div>
//                     <div className="diagonal"></div>
//                     <div className="middle-right"></div>
//                 </div>
//             </header>

//             <div className="search-main-area">
//                 <input
//                     type="text"
//                     placeholder="Search Pokemon..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     className="search-bar"
//                 />

//                 <div className="filters-and-results">
//                     <div className="main-filter-screen">
//                         <div className="filter-buttons-column">
//                             <div className="filter-buttons-grid">
//                                 {Object.keys(typeColors).map((type) => (
//                                     <button
//                                         key={type}
//                                         className={`filter-button ${filteredType === type ? 'active' : ''}`}
//                                         style={{ backgroundColor: typeColors[type] }}
//                                         onClick={() => handleFilterClick(type)}
//                                     >
//                                         {type}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>

//                     <div className="main-list-screen">
//                         {filteredPokemons.length > 0 ? (
//                             filteredPokemons.map((pokemon) => (
//                                 <Link to={`/profile/${pokemon.id}`} key={pokemon.id} className="pokemon-item">
//                                     {pokemon.pokemon_name}
//                                 </Link>
//                             ))
//                         ) : (
//                             <p className="no-results">No Pokemon found.</p>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default SearchPage;