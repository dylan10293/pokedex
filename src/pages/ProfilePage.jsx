import React, { useEffect, useState } from 'react'
import '../styling/ProfilePage.css'

const ProfilePage = () => {
  const [pokemonData, setPokemonData] = useState(null)
  const typeColors = {
    Grass: '#9bcc50',
    Poison: '#b97fc9',
    Fire: '#fd7d24',
    Water: '#4592c4',
    Electric: '#eed535',
    Ice: '#51c4e7',
    Ground: '#ab9842',
    Flying: '#3dc7ef',
    Psychic: '#f366b9',
    Bug: '#729f3f',
    Rock: '#a38c21',
    Ghost: '#7b62a3',
    Dark: '#707070',
    Dragon: '#53a4cf',
    Steel: '#9eb7b8',
    Fairy: '#fdb9e9',
    Normal: '#a4acaf',
    Fighting: '#d56723',
  };

  useEffect(() => {
    // Replace with your actual API URL
    const fetchPokemonData = async () => {
      try {
        const response = await fetch('https://api.example.com/pokemon') // Adjust the API URL
        const data = await response.json()
        setPokemonData(data.pokemons[0]) // Assuming we fetch the first Pokémon
      } catch (error) {
        console.error('Error fetching Pokémon data:', error)
      }
    }

    fetchPokemonData()
  }, [])

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

      {/* Main Pokedex Screen */}
      <div className="main-screen profile-screen">
        {/* Back to Pokedex button */}
        <a href="#" className="back-link">&larr Back to Pokedex</a>

        <div className="columns">
          {/* Left Column: Pokémon Image and Details */}
          <div className="left-column">
            <div className="poke-image"></div>
            <div className="poke-details">
              <h1 className="poke-name">
                {pokemonData ? pokemonData.pokemon_name : 'Loading...'}
              </h1>
              <div className="poke-types">
  {pokemonData &&
    pokemonData.type.map((type, index) => (
      <span
        key={index}
        className="type"
        style={{ backgroundColor: typeColors[type] || '#ccc' }} // Default to #ccc if type not found
      >
        {type}
      </span>
    ))}
</div>
              <p>{pokemonData ? pokemonData.species : ''}</p>
            </div>
          </div>

          {/* Right Column: Moves Section */}
          <div className="right-column">
            <div className="moves-section">
              <h2 className="moves-label">Moves</h2>
              <div className="block-group">
                {pokemonData &&
                  pokemonData.moves.map((move, index) => (
                    <div key={index} className="block">
                      {move}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
