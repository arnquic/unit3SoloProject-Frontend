import '../cssFiles/BattleOptions.css';

import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BattleOptions(props) {

    const { battlePokemonState } = useContext(AppContext);
    const [battlePokemon, setBattlePokemon] = battlePokemonState;

    const navigation = useNavigate();

    function handleFightClick() {
        props.setPageLoaded(true);
        props.setBattleState(props.BATTLE_STATES[1]);
    }

    function handleRunClick() {
        setBattlePokemon({});
        navigation('/myPokemon');
    }

    function handleMoveClick(e) {
        const { name } = e.target;
        if (name === 'move1') {
            props.setEnemyHealth(Math.max(0, props.enemyHealth - props.myMoveStats[0] * props.DAMAGE_MODIFIER));
        }
        else if (name === 'move2') {
            props.setEnemyHealth(Math.max(0, props.enemyHealth - props.myMoveStats[1] * props.DAMAGE_MODIFIER));
        }
        else if (name === 'move3') {
            props.setEnemyHealth(Math.max(0, props.enemyHealth - props.myMoveStats[2] * props.DAMAGE_MODIFIER));
        }
    }

    function handleGoBackClick() {
        props.setBattleState(props.BATTLE_STATES[0]);
    }

    function displayCorrectItems() {
        if (props.battleState === props.BATTLE_STATES[0]) {
            return (
                <div className='BattleState0'>
                    <button onClick={handleFightClick}>Fight</button>
                    <button onClick={handleRunClick}>Run</button>
                </div>
            )
        }
        else if (props.battleState === props.BATTLE_STATES[1]) {
            return (
                <div className='BattleState1'>
                    <button name='move1' onClick={handleMoveClick}>{battlePokemon.mine.moves[0].name}</button>
                    <button name='move2' onClick={handleMoveClick}>{battlePokemon.mine.moves[1].name}</button>
                    <button name='move3' onClick={handleMoveClick}>{battlePokemon.mine.moves[2].name}</button>
                    <button onClick={handleGoBackClick}>Go Back</button>
                </div>
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