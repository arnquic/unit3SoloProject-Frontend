import '../cssFiles/BattlePage.css';
import BattleOptions from '../../components/jsFiles/BattleOptions';
import PokemonBattleStats from '../../components/jsFiles/PokemonBattleStats';

import axios from 'axios';
import env from 'react-dotenv';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext, useState, useEffect } from 'react';

function BattlePage() {

    // ---------------------------------------
    // | Variables and Function declarations.
    // ---------------------------------------

    // Define Battle CONSTANTS.
    const BATTLE_STATES = [
        "What will you do?",
        "Select a move.",
        "The enemy is attacking.",
        "The enemy used ",
        "You Won!",
        "You Lost... Better luck next time!"
    ]

    const DAMAGE_MODIFIER = 0.5;

    // Declare the navigation variable for use to navigate to another web page. (Player 'runs' or the match/game is over.)
    const navigation = useNavigate();

    // Retrieve the necessary items from context.
    const { battlePokemonState } = useContext(AppContext);
    const [battlePokemon, setBattlePokemon] = battlePokemonState;

    // Declare the necessary pieces of state.
    const [pageLoaded, setPageLoaded] = useState(false);
    const [myHealth, setMyHealth] = useState(parseInt(battlePokemon.mine.currentHealth));
    const [enemyHealth, setEnemyHealth] = useState(battlePokemon.enemy.currentHealth);
    const [battleState, setBattleState] = useState(BATTLE_STATES[0]);
    const [enemyAttackText, setEnemyAttackText] = useState("");

    useEffect(() => { setBattleState(BATTLE_STATES[0]); }, []);

    const [myMoveStats, setMyMoveStats] = useState([]);
    const [enemyMoveStats, setEnemyMoveStats] = useState([]);

    // Fetch and store all of the stats for each of the pokemon's moves so that we know how much damage to do when using each move.
    async function getMoveStats() {
        let myStats = [];
        let enemyStats = [];
        for (let i = 0; i < 3; i++) {
            const myResponse = await axios.get(`${battlePokemon.mine.moves[i].url}`);
            myStats.push(myResponse.data.power);
            const enemyResponse = await axios.get(`${battlePokemon.enemy.moves[i].url}`);
            enemyStats.push(enemyResponse.data.power);
        }
        setMyMoveStats(myStats);
        setEnemyMoveStats(enemyStats);
    }

    useEffect(() => { getMoveStats(); }, []);

    // Function used to capitalize the first letter of the pokemon's name for display. Kept as lowercase in the data for api call functionality.
    function capFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Function used to delay the app for the input number of seconds. Used when the enemy AI is choosing what move to attack with so that the player may have time to read what the enemy has chosen to do and how much damage they did.
    function delay(seconds) {
        const start = Date.now();
        const milliSecs = seconds * 1000;
        let difference = Date.now() - start;

        while (difference < milliSecs) {
            difference = Date.now() - start;
        }
    }

    // Function used to handle the battle states that are the enemy's turn. Chooses what attack they will use and applies the appropriate damage to the player's pokemon.
    function handleEnemyTurn() {
        if (battleState === BATTLE_STATES[2]) {
            delay(2);
            const moveChoice = Math.floor(Math.random() * 3);
            setMyHealth(Math.max(0, myHealth - enemyMoveStats[moveChoice] * DAMAGE_MODIFIER));
            setEnemyAttackText(`${battlePokemon.enemy.moves[moveChoice].name} and did ${enemyMoveStats[moveChoice] * DAMAGE_MODIFIER} damamge.`);
            setBattleState(BATTLE_STATES[3]);
        }
        else if (battleState === BATTLE_STATES[3]) {
            delay(2);
            setEnemyAttackText("");
            setBattleState(BATTLE_STATES[0]);
        }
    }

    useEffect(handleEnemyTurn, [battleState]);

    // Function to check if the player's pokemon's health has reached zero. Will set the battle state to the player has lost state if their health is zero.
    function handleMyHealthUpdate() {
        if (pageLoaded) {
            if (myHealth <= 0) {
                setEnemyAttackText("");
                setBattleState(BATTLE_STATES[5]);
            }
            else {
                setEnemyAttackText("");
                setBattleState(BATTLE_STATES[0]);
            }
        }
    }

    useEffect(handleMyHealthUpdate, [myHealth]);

    // Function to check if the enemy pokemon's health has reached zero. Will set the battle state to the player wins state if their health is zero.
    function handleEnemyHealthUpdate() {
        if (pageLoaded) {
            if (enemyHealth <= 0) {
                setEnemyAttackText("");
                setBattleState(BATTLE_STATES[4]);
            }
            else {
                setBattleState(BATTLE_STATES[2]);
            }
        }
    }

    useEffect(handleEnemyHealthUpdate, [enemyHealth]);

    // If either the player or the enemy pokemon reaches zero health, this function handles the end of the match and whether the player 'catches' the enemy pokemon (if the player wins).
    async function handleMatchOver() {
        if (battleState === BATTLE_STATES[4]) {
            const response = await axios.post(`${env.BACKEND_URL}/myPokemon/add`, { name: battlePokemon.enemy.pokemonName, currentHealth: battlePokemon.enemy.maxHealth }, { headers: { authorization: localStorage.getItem('authorization') } });
            delay(2.5);
            navigation('/myPokemon');
        }
        else if (battleState === BATTLE_STATES[5]) {
            delay(2.5);
            navigation('/myPokemon');
        }
    }

    useEffect(() => { handleMatchOver(); }, [battleState]);


    // ---------------------------------------------
    // | Display items returned by the Battle Page.
    // ---------------------------------------------
    return (
        <div className='BattlePage'>
            {battlePokemon !== {} ?
                <>
                    <div className='BattleArea'>
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
                    </div>
                    <div className='BattleDisplay'>
                        <div className='BattleState'>
                            <h3>{battleState + enemyAttackText}</h3>
                        </div>
                        <BattleOptions
                            setPageLoaded={setPageLoaded}
                            DAMAGE_MODIFIER={DAMAGE_MODIFIER}
                            BATTLE_STATES={BATTLE_STATES}
                            battleState={battleState}
                            setBattleState={setBattleState}
                            myHealth={myHealth}
                            setMyHealth={setMyHealth}
                            myMoveStats={myMoveStats}
                            enemyHealth={enemyHealth}
                            setEnemyHealth={setEnemyHealth}
                            enemyMoveStats={enemyMoveStats}
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