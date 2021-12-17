import './App.css';
import Header from './components/jsFiles/Header';
import HomePage from './pages/jsFiles/HomePage';
import SignupPage from './pages/jsFiles/SignupPage';
import LoginPage from './pages/jsFiles/LoginPage';
import StarterPokemonPage from './pages/jsFiles/StarterPokemonPage';
import MyPokemonPage from './pages/jsFiles/MyPokemonPage';
import BattlePage from './pages/jsFiles/BattlePage';

import axios from 'axios';
import env from 'react-dotenv';
import { AppContext } from './context/AppContext';
import { useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {

  const { userState, myPokemonState, allPokemonState, battlePokemonState } = useContext(AppContext);
  const [user, setUser] = userState;
  const [myPokemon, setMyPokemon] = myPokemonState;
  const [allPokemon, setAllPokemon] = allPokemonState;
  const [battlePokemon] = battlePokemonState;

  async function verifyUser() {
    const authorization = localStorage.getItem('authorization');
    if (authorization) {
      try {
        const response = await axios.get(`${env.BACKEND_URL}/user/verify`, { headers: { authorization: authorization } });
        setUser(response.data.user);
        localStorage.setItem('authorization', response.data.user.authorization);
      }
      catch (err) {
        console.log(err);
      }
    }
  }

  async function getAllPokemon() {
    const response = await axios.get(`${env.POKEAPI_BASE}/pokemon?limit=151&offset=0`);
    setAllPokemon(response.data.results);
  }

  async function getMyPokemon() {
    if (user.authorization) {
      const response = await axios.get(`${env.BACKEND_URL}/myPokemon`, { headers: { authorization: localStorage.getItem('authorization') } });
      setMyPokemon(response.data);
    }
  }

  useEffect(() => { verifyUser(); getAllPokemon(); }, []);
  useEffect(() => { getMyPokemon(); }, [user]);


  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='*' element={<Navigate to='/' />} />

        <Route path='/' element={<HomePage />} />

        <Route path='/signup'
          element={!user.authorization ? <SignupPage /> : <Navigate to='/selectStarter' />} />

        <Route path='/login'
          element={!user.authorization ? <LoginPage /> : <Navigate to='/selectStarter' />} />

        <Route path='/selectStarter'
          element={user.authorization && myPokemon.length < 1 ? <StarterPokemonPage /> : <Navigate to='/myPokemon' />} />

        <Route path='/myPokemon'
          element={user.authorization ? <MyPokemonPage /> : <Navigate to='/login' />} />

        <Route path='/battle'
          element={user.authorization && battlePokemon !== {} ? <BattlePage /> : <Navigate to='/' />} />

      </Routes>
    </div>
  );
}

export default App;
