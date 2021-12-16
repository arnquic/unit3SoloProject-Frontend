import '../cssFiles/StarterPokemon.css';

import axios from 'axios';
import env from 'react-dotenv';
import { AppContext } from '../../context/AppContext';
import { useState, useEffect, useContext } from 'react';

function StarterPokemon(props) {

    const [imgUrl, setImgUrl] = useState(null);
    const [baseHp, setBaseHp] = useState(null);
    const [showSelectionConfirm, setShowSelectionConfirm] = useState(false);

    const { myPokemonState } = useContext(AppContext);
    const [myPokemon, setMyPokemon] = myPokemonState;

    async function getPokemonImgUrl() {
        const response = await axios.get(`${env.POKEAPI_BASE}/pokemon/${props.pokemonName}`);
        setImgUrl(response.data.sprites.front_default);
        setBaseHp(response.data.stats[0].base_stat);
    }

    function capFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function handleDivClick() {
        if (!showSelectionConfirm) {
            setShowSelectionConfirm(true);
        }
    }

    function handleCancelClick() {
        setShowSelectionConfirm(false);
    }

    async function handleConfirmClick() {
        const response = await axios.post(`${env.BACKEND_URL}/myPokemon/add`, { name: props.pokemonName, currentHealth: baseHp }, { headers: { authorization: localStorage.getItem('authorization') } });
        setMyPokemon([response.data]);
    }

    useEffect(() => { getPokemonImgUrl(); }, []);

    return (
        <div className='StarterPokemon' onClick={handleDivClick}>
            {showSelectionConfirm ?
                <>
                    <button onClick={handleConfirmClick}>Confirm {capFirstLetter(props.pokemonName)}</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </>
                :
                <>
                    {imgUrl !== null ?
                        <img src={imgUrl} alt={capFirstLetter(props.pokemonName)} />
                        :
                        <p>Loading...</p>
                    }
                    <h4>{capFirstLetter(props.pokemonName)}</h4>
                </>
            }
        </div>
    )
}

export default StarterPokemon;