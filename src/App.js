import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import StartPage from './pages/StartPage';
import AddPokemonPage from './pages/AddPokemonPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/add" element={<AddPokemonPage />} />
      </Routes>
    </Router>
  );
}

export default App;