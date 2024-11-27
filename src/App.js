// import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';

import StartPage from './pages/StartPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
<BrowserRouter>
      <Routes>
        <Route path='/' element={<StartPage/>}/>
        <Route path='/profile/:id' element={<ProfilePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
