import '../cssFiles/StarterPokemonPage.css';

import StarterPokemon from '../../components/jsFiles/StarterPokemon';

function StarterPokemonPage() {
    return (
        <div className='StarterPokemonPage'>
            <h2>Select a starter Pokemon</h2>
            <div className='StarterPokemonContainer'>
                <StarterPokemon pokemonName='bulbasaur' />
                <StarterPokemon pokemonName='squirtle' />
                <StarterPokemon pokemonName='charmander' />
            </div>
        </div>
    )
}

export default StarterPokemonPage;