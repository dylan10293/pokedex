import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Hook to extract params from the URL
import '../styling/ProfilePage.css';
import { Link } from 'react-router-dom';

// const ProfilePage = () => {
//   const [pokemonData, setPokemonData] = useState(null)
// const typeColors = {
//   Grass: '#9bcc50',
//   Poison: '#b97fc9',
//   Fire: '#fd7d24',
//   Water: '#4592c4',
//   Electric: '#eed535',
//   Ice: '#51c4e7',
//   Ground: '#ab9842',
//   Flying: '#3dc7ef',
//   Psychic: '#f366b9',
//   Bug: '#729f3f',
//   Rock: '#a38c21',
//   Ghost: '#7b62a3',
//   Dark: '#707070',
//   Dragon: '#53a4cf',
//   Steel: '#9eb7b8',
//   Fairy: '#fdb9e9',
//   Normal: '#a4acaf',
//   Fighting: '#d56723',
// };

//   useEffect(() => {
//     // Replace with your actual API URL
//     const fetchPokemonData = async () => {
//       try {
//         const response = await fetch('https://api.example.com/pokemon') // Adjust the API URL
//         const data = await response.json()
//         setPokemonData(data.pokemons[0]) // Assuming we fetch the first Pokémon
//       } catch (error) {
//         console.error('Error fetching Pokémon data:', error)
//       }
//     }

//     fetchPokemonData()
//   }, [])

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

//       {/* Main Pokedex Screen */}
//       <div className="main-screen profile-screen">
//         {/* Back to Pokedex button */}
//         <Link to="/search" className="back-link">&larr; Back to Pokedex</Link>

//         <div className="columns">
//           {/* Left Column: Pokémon Image and Details */}
//           <div className="left-column">
//             <div className="poke-image"></div>
//             <div className="poke-details">
//               <h1 className="poke-name">
//                 {/* {pokemonData ? pokemonData.pokemon_name : 'Loading...'} */}
//               </h1>
//               <div className="poke-types">
//                 {pokemonData &&
//                   pokemonData.type.map((type, index) => (
//                     <span
//                       key={index}
//                       className="type"
//                       style={{ backgroundColor: typeColors[type] || '#ccc' }} // Default to #ccc if type not found
//                     >
//                       {type}
//                     </span>
//                   ))}
//               </div>
//               <p>{pokemonData ? pokemonData.species : ''}</p>
//             </div>
//           </div>

//           {/* Right Column: Moves Section */}
//           <div className="right-column">
//             <div className="moves-section">
//               <h2 className="moves-label">Moves</h2>
//               <div className="block-group">
//                 {pokemonData && pokemonData.moves.map((move, index) => (
//                   <div key={index} className="block">
//                     {move}
//                   </div>
//                 ))}
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default ProfilePage


const ProfilePage = ({ pokemons }) => {
  const { id } = useParams(); // Get the ID from the URL
  const [pokemonData, setPokemonData] = useState(null);

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

  useEffect(() => {
    // Find the Pokémon based on the ID from the params
    const selectedPokemon = pokemons.find(pokemon => pokemon.id === parseInt(id));
    setPokemonData(selectedPokemon);
  }, [id, pokemons]);

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

      {pokemonData ? (
        <div className="main-screen profile-screen">
          {/* Back to Pokedex button */}
          <Link to="/search" className="back-link">&larr; Back to Pokedex</Link>

          <div className="columns">
            {/* Left Column: Pokémon Image and Details */}
            <div className="left-column">
              <div className="poke-image"></div>
              <div className="poke-details">
                <h1 className="poke-name">{pokemonData.pokemon_name}</h1>
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
                  {Object.entries(pokemonData.stats).map(([statName, statValue], index) => (
                    <div key={index} className="stat-item">
                      <span className="stat-name">{statName.replace('_', ' ')}:</span>
                      <span className="stat-value">{statValue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ProfilePage;
