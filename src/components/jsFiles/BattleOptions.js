import '../cssFiles/BattleOptions.css';

import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BattleOptions(props) {

    const damageModifier = 0.5;

    const { battlePokemonState } = useContext(AppContext);
    const [battlePokemon, setBattlePokemon] = battlePokemonState;

    const [myMoveStats, setMyMoveStats] = useState([]);
    const [enemyMoveStats, setEnemyMoveStats] = useState([]);

    const navigation = useNavigate();

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

    function handleFightClick() {
        props.setBattleState(props.BATTLE_STATES[1]);
    }

    function handleRunClick() {
        setBattlePokemon({});
        navigation('/myPokemon');
    }

    function handleGoBackClick() {
        props.setBattleState(props.BATTLE_STATES[0]);
    }

    function handleMoveClick(e) {
        const { name } = e.target;
        if (name === 'move1') {
            props.setEnemyHealth(Math.max(0, props.enemyHealth - myMoveStats[0] * damageModifier));
        }
        else if (name === 'move2') {
            props.setEnemyHealth(Math.max(0, props.enemyHealth - myMoveStats[1] * damageModifier));
        }
        else if (name === 'move3') {
            props.setEnemyHealth(Math.max(0, props.enemyHealth - myMoveStats[2] * damageModifier));
        }


    }

    function handleEnemyHealthUpdate() {
        if (props.enemyHealth <= 0) {
            props.setEnemyAttackText("");
            props.setBattleState(props.BATTLE_STATES[4]);
        }
        else {
            props.setBattleState(props.BATTLE_STATES[2]);
        }
    }

    function handleMyHealthUpdate() {
        if (props.myHealth <= 0) {
            props.setEnemyAttackText("");
            props.setBattleState(props.BATTLE_STATES[5]);
        }
        else {
            props.setEnemyAttackText("");
            props.setBattleState(props.BATTLE_STATES[0]);
        }
    }

    useEffect(() => { handleEnemyHealthUpdate(); handleMyHealthUpdate(); }, [props.myHealth, props.enemyHealth]);

    function delay(seconds) {
        const start = Date.now();
        const milliSecs = seconds * 1000;
        let difference = Date.now() - start;

        while (difference < milliSecs) {
            difference = Date.now() - start;
        }
    }

    function handleEnemyTurn() {
        if (props.battleState === props.BATTLE_STATES[2]) {
            delay(2);
            const moveChoice = Math.floor(Math.random() * 3);
            props.setMyHealth(Math.max(0, props.myHealth - enemyMoveStats[moveChoice] * damageModifier));
            props.setEnemyAttackText(`${battlePokemon.enemy.moves[moveChoice].name} and did ${enemyMoveStats[moveChoice] * damageModifier} damamge.`);
            props.setBattleState(props.BATTLE_STATES[3]);
        }
        else if (props.battleState === props.BATTLE_STATES[3]) {
            delay(2);
            props.setEnemyAttackText("");
            props.setBattleState(props.BATTLE_STATES[0]);
        }
    }

    useEffect(handleEnemyTurn, [props.battleState]);

    function displayCorrectItems() {
        if (props.battleState === props.BATTLE_STATES[0]) {
            return (
                <>
                    <button onClick={handleFightClick}>Fight</button>
                    <button onClick={handleRunClick}>Run</button>
                </>
            )
        }
        else if (props.battleState === props.BATTLE_STATES[1]) {
            return (
                <>
                    <button name='move1' onClick={handleMoveClick}>{battlePokemon.mine.moves[0].name}</button>
                    <button name='move2' onClick={handleMoveClick}>{battlePokemon.mine.moves[1].name}</button>
                    <button name='move3' onClick={handleMoveClick}>{battlePokemon.mine.moves[2].name}</button>
                    <button onClick={handleGoBackClick}>Go Back</button>
                </>
            )
        } else {
            return (
                <>
                </>
            )
        }
    }

    return (
        <div className='BattleOptions'>
            {displayCorrectItems()}
        </div>
    )
}

export default BattleOptions;