import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { typeColors } from '../static';
import '../styling/ProfilePage.css';

const ProfilePage = () => {
    const { id } = useParams(); // Get the Pokémon ID from the URL
    const [pokemonData, setPokemonData] = useState(null); // State to hold Pokémon data
    const [loading, setLoading] = useState(true); // State to handle loading

    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                const response = await fetch(`http://3.141.16.135:8000/pokemon/${id}`);
                if (!response.ok) throw new Error('Failed to fetch Pokémon data');
                const [data] = await response.json(); // Assuming response is an array with one Pokémon
                setPokemonData(data);
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonData();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!pokemonData) {
        return <p>Error loading Pokémon data.</p>;
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

            <div className="main-screen profile-screen">
                {/* Back to Pokedex button */}
                <Link to="/search" className="back-link">&larr; Back to Pokedex</Link>

                <div className="columns">
                    {/* Left Column: Pokémon Image and Details */}
                    <div className="left-column">
                        <div className="poke-image">
                            {/* Placeholder for Pokémon image */}
                            <img src={`/images/${pokemonData.id}.png`} alt={pokemonData.name} />
                        </div>
                        <div className="poke-details">
                            <h1 className="poke-name">{pokemonData.name}</h1>
                            <div className="poke-types">
                                {pokemonData.type.map((type, index) => (
                                    <span
                                        key={index}
                                        className="type"
                                        style={{ backgroundColor: typeColors[type] || '#ccc' }}
                                    >
                                        {type}
                                    </span>
                                ))}
                            </div>
                            <p>{pokemonData.species}</p>
                        </div>
                    </div>

                    {/* Right Column: Moves Section */}
                    <div className="right-column">
                        <div className="moves-section">
                            <h2 className="moves-label">Moves</h2>
                            <div className="moves-group">
                                {pokemonData.moves.map((move, index) => (
                                    <div key={index} className="move-item">
                                        <span className="move-name">{move}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="stats-section">
                            <h2 className="stats-label">Stats</h2>
                            <div className="stats-group">
                                {Object.entries(pokemonData).map(([statName, statValue], index) => (
                                    statName.includes("hp") ||
                                    statName.includes("attack") ||
                                    statName.includes("defense") ? (
                                        <div key={index} className="profile-stat-item">
                                            <span className="profile-stat-name">
                                                {statName.replace('_', ' ')}:
                                            </span>
                                            <span className="profile-stat-value">{statValue}</span>
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom'; // Hook to extract params from the URL
// import '../styling/ProfilePage.css';
// import { Link } from 'react-router-dom';



// const ProfilePage = ({ pokemons }) => {
//   const { id } = useParams(); // Get the ID from the URL
//   const [pokemonData, setPokemonData] = useState(null);

//   const typeColors = {
//     Grass: '#9bcc50',
//     Poison: '#b97fc9',
//     Electric: '#eed535',
//     Fire: '#fd7d24',
//     Water: '#4592c4',
//     Bug: '#729f3f',
//     Flying: '#3dc7ef',
//     Normal: '#a4acaf',
//     Rock: '#a38c21',
//     Ground: '#ab9842',
//     Ghost: '#7b62a3',
//     Fighting: '#d56723',
//     Steel: '#9eb7b8',
//     Ice: '#51c4e7',
//     Dragon: '#53a4cf',
//     Dark: '#707070',
//     Fairy: '#fdb9e9',
//     Psychic: '#F95788'
// };

//   useEffect(() => {
//     // Find the Pokémon based on the ID from the params
//     const selectedPokemon = pokemons.find(pokemon => pokemon.id === parseInt(id));
//     setPokemonData(selectedPokemon);
//   }, [id, pokemons]);

//   return (
//     <>
//       <header className="header">
//         <div className="blue-circle"></div>
//         <div className="top-left"></div>
//         <div className="top-right"></div>
//         <div className="middle">
//           <div className="middle-left"></div>
//           <div className="diagonal"></div>
//           <div className="middle-right"></div>
//         </div>
//       </header>

//       {pokemonData ? (
//         <div className="main-screen profile-screen">
//           {/* Back to Pokedex button */}
//           <Link to="/search" className="back-link">&larr; Back to Search</Link>

//           <div className="columns">
//             {/* Left Column: Pokémon Image and Details */}
//             <div className="left-column">
//               <div className="poke-image"></div>
//               <div className="poke-details">
//                 <h1 className="poke-name">{pokemonData.pokemon_name}</h1>
//                 <div className="poke-types">
//                   {pokemonData.type.map((type, index) => (
//                     <span
//                       key={index}
//                       className="type"
//                       style={{ backgroundColor: typeColors[type] || '#ccc' }}
//                     >
//                       {type}
//                     </span>
//                   ))}
//                 </div>
//                 <p>{pokemonData.species}</p>
//               </div>
//             </div>

//             {/* Right Column: Moves Section */}
//             <div className="right-column">
//               <div className="moves-section">
//                 <h2 className="moves-label">Moves</h2>
//                 <div className="moves-group">
//                   {pokemonData.moves.map((move, index) => (
//                     <div key={index} className="move-item">
//                       <span className="move-name">{move}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Stats Section */}
//               <div className="stats-section">
//                 <h2 className="stats-label">Stats</h2>
//                 <div className="stats-group">
//                   {Object.entries(pokemonData.stats).map(([statName, statValue], index) => (
//                     <div key={index} className="profile-stat-item">
//                       <span className="profile-stat-name">{statName.replace('_', ' ')}:</span>
//                       <span className="profile-stat-value">{statValue}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </>
//   );
// };

// export default ProfilePage;
