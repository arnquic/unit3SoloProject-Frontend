import '../cssFiles/PokemonBattleStats.css';

function PokemonBattleStats(props) {

    function capFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className='PokemonBattleStats'>
            <h4>{props.pokemonName}</h4>
            <label htmlFor="HealthBar">HP: </label>
            <meter className="HealthBar"
                min={0}
                low={String(0.33 * props.maxHealth)}
                value={props.currentHealth}
                high={String(0.66 * props.maxHealth)}
                optimum={props.maxHealth}
                max={props.maxHealth}></meter>
        </div>
    )
}

export default PokemonBattleStats;