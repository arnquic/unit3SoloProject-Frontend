import '../cssFiles/MyPokemonItem.css';


import axios from 'axios';
import env from 'react-dotenv';
import { AppContext } from '../../context/AppContext';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function MyPokemonItem(props) {

    const { battlePokemonState, allPokemonState } = useContext(AppContext);
    const [battlePokemon, setBattlePokemon] = battlePokemonState;
    const [allPokemon] = allPokemonState;

    const [frontImgUrl, setFrontImgUrl] = useState(null);
    const [backImgUrl, setBackImgUrl] = useState(null);
    const [showSelectionConfirm, setShowSelectionConfirm] = useState(false);

    const navigation = useNavigate();

    function capFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async function getPokemonInfo() {
        const response = await axios.get(`${env.POKEAPI_BASE}/pokemon/${props.pokemonName}`);
        setFrontImgUrl(response.data.sprites.front_default);
        setBackImgUrl(response.data.sprites.back_default);
    }

    useEffect(() => { getPokemonInfo(); }, []);

    function handleDivClick() {
        if (!showSelectionConfirm) {
            setShowSelectionConfirm(true);
        }
    }

    async function handleConfirmClick() {

        const myResponse = await axios.get(`${env.POKEAPI_BASE}/pokemon/${props.pokemonName}`);

        const randomIdx = Math.floor(Math.random() * allPokemon.length);
        const enemyResponse = await axios.get(`${allPokemon[randomIdx].url}`);

        setBattlePokemon({
            mine: {
                pokemonName: props.pokemonName,
                imgUrl: myResponse.data.sprites.back_default,
                currentHealth: props.currentHealth,
                maxHealth: myResponse.data.stats[0].base_stat,
                moves: [
                    myResponse.data.moves[0].move,
                    myResponse.data.moves[1].move,
                    myResponse.data.moves[2].move
                ]
            },
            enemy: {
                pokemonName: allPokemon[randomIdx].name,
                imgUrl: enemyResponse.data.sprites.front_default,
                currentHealth: enemyResponse.data.stats[0].base_stat,
                maxHealth: enemyResponse.data.stats[0].base_stat,
                moves: [
                    enemyResponse.data.moves[0].move,
                    enemyResponse.data.moves[1].move,
                    enemyResponse.data.moves[2].move
                ]
            }
        });
        navigation('/battle');
    }

    function handleCancelClick() {
        setShowSelectionConfirm(false);
    }

    return (
        <div className='MyPokemonItem' onClick={handleDivClick}>
            {showSelectionConfirm ?
                <>
                    <button onClick={handleConfirmClick}>Confirm {capFirstLetter(props.pokemonName)}</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </>
                :
                <>
                    {frontImgUrl !== null ?
                        <img src={frontImgUrl} alt={capFirstLetter(props.pokemonName)} />
                        :
                        <p>Loading...</p>
                    }
                    <h4>{capFirstLetter(props.pokemonName)}</h4>
                </>
            }
        </div>
    )
}

export default MyPokemonItem;