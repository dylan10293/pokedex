import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from '../src/pages/SearchPage';
import ProfilePage from '../src/pages/ProfilePage';
import StartPage from '../src/pages/StartPage';


function App() {
  // Default Pokémon list
  const pokemons = [
    {
      id: 1,
      pokemon_name: "Bulbasaur",
      species: "Seed Pokémon",
      moves: ["Tackle", "Vine Whip", "Growl", "Leech Seed", "Slam"],
      type: ["Grass", "Poison"],
      stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        special_attack: 65,
        special_defense: 65,
        speed: 45,
      },
    },
    {
      id: 2,
      pokemon_name: "Pikachu",
      species: "Electric Mouse Pokémon",
      moves: ["Shock", "Tackle", "Electrocute"],
      type: ["Electric"],
      stats: {
        hp: 35,
        attack: 55,
        defense: 40,
        special_attack: 50,
        special_defense: 50,
        speed: 90,
      },
    },
    {
      id: 3,
      pokemon_name: "Weedle",
      species: "Hairy Bug",
      moves: ["Shield Dust"],
      type: ["Bug","Poison"],
      stats: {
        hp: 25,
        attack: 55,
        defense: 40,
        special_attack: 60,
        special_defense: 50,
        speed: 70,
      },
    },
  ];

  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage pokemons={pokemons} />} />
        <Route path="/search" element={<SearchPage pokemons={pokemons} />} />
        <Route path="/profile/:id" element={<ProfilePage pokemons={pokemons} />} />
      </Routes>
    </Router>
  );
}

export default App;