import '../cssFiles/BattlePage.css';
import BattleOptions from '../../components/jsFiles/BattleOptions';
import PokemonBattleStats from '../../components/jsFiles/PokemonBattleStats';

import axios from 'axios';
import env from 'react-dotenv';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext, useState, useEffect } from 'react';

function BattlePage() {

    const BATTLE_STATES = [
        "What will you do?",
        "Select a move.",
        "The enemy is attacking.",
        "The enemy used ",
        "You Won!",
        "You Lost... Better luck next time!"
    ]

    const navigation = useNavigate();

    const { battlePokemonState } = useContext(AppContext);
    const [battlePokemon] = battlePokemonState;

    const [myHealth, setMyHealth] = useState(battlePokemon.mine.currentHealth);
    const [enemyHealth, setEnemyHealth] = useState(battlePokemon.enemy.currentHealth);
    const [battleState, setBattleState] = useState(BATTLE_STATES[0]);
    const [stateText, setStateText] = useState(BATTLE_STATES[0]);
    const [enemyAttackText, setEnemyAttackText] = useState("");

    useEffect(() => { setBattleState(BATTLE_STATES[0]); }, []);

    function capFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function delay(seconds) {
        const start = Date.now();
        const milliSecs = seconds * 1000;
        let difference = Date.now() - start;

        while (difference < milliSecs) {
            difference = Date.now() - start;
        }
    }

    async function handleMatchOver() {
        if (battleState === BATTLE_STATES[4]) {
            const response = await axios.post(`${env.BACKEND_URL}/myPokemon/add`, { name: battlePokemon.enemy.pokemonName, currentHealth: battlePokemon.enemy.maxHealth }, { header: { authorization: localStorage.getItem('authorization') } });
            delay(2.5);
            console.log(response);
            navigation('/myPokemon');
        }
        else if (battleState === BATTLE_STATES[5]) {
            delay(2.5);
            navigation('/myPokemon');
        }
    }

    useEffect(() => { handleMatchOver(); }, [battleState]);

    return (
        <div className='BattlePage'>
            {battlePokemon !== {} ?
                <>
                    <div className='EnemyArea'>
                        <PokemonBattleStats
                            pokemonName={capFirstLetter(battlePokemon.enemy.pokemonName)}
                            currentHealth={enemyHealth}
                            maxHealth={battlePokemon.enemy.maxHealth}
                        />
                        <img src={battlePokemon.enemy.imgUrl} alt={battlePokemon.enemy.pokemonName} />
                    </div>
                    <div className='MyArea'>
                        <img src={battlePokemon.mine.imgUrl} alt={battlePokemon.mine.pokemonName} />
                        <PokemonBattleStats
                            pokemonName={capFirstLetter(battlePokemon.mine.pokemonName)}
                            currentHealth={myHealth}
                            maxHealth={battlePokemon.mine.maxHealth}
                        />
                    </div>
                    <div className='BattleDisplay'>
                        <div className='BattleState'>
                            <h3>{battleState + enemyAttackText}</h3>
                        </div>
                        <BattleOptions
                            BATTLE_STATES={BATTLE_STATES}
                            battleState={battleState}
                            setBattleState={setBattleState}
                            myHealth={myHealth}
                            setMyHealth={setMyHealth}
                            enemyHealth={enemyHealth}
                            setEnemyHealth={setEnemyHealth}
                            setEnemyAttackText={setEnemyAttackText}
                        />
                    </div>
                </>
                :
                <h2>Loading...</h2>
            }
        </div>
    )
}

export default BattlePage;