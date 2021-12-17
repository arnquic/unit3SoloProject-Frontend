import '../cssFiles/MyPokemonPage.css';
import MyPokemonItem from '../../components/jsFiles/MyPokemonItem';

import axios from 'axios';
import env from 'react-dotenv';
import { AppContext } from '../../context/AppContext';
import { useEffect, useContext } from 'react';

function MyPokemonPage() {

    const { userState, myPokemonState } = useContext(AppContext);
    const [user] = userState;
    const [myPokemon, setMyPokemon] = myPokemonState;

    async function getMyPokemon() {
        if (user.authorization) {
            const response = await axios.get(`${env.BACKEND_URL}/myPokemon`, { headers: { authorization: localStorage.getItem('authorization') } });
            setMyPokemon(response.data);
        }
    }

    useEffect(() => { getMyPokemon(); }, []);

    function createMyPokemonItems() {
        return (
            myPokemon.map(function (pokemon, idx) {
                return (
                    <MyPokemonItem key={pokemon.id} pokemonName={pokemon.name} currentHealth={pokemon.currentHealth} />
                )
            })
        )
    }

    return (
        <div className='MyPokemonPage'>
            <div className='MyPokemonContainer'>
                {createMyPokemonItems()}
            </div>
        </div>
    )
}

export default MyPokemonPage;