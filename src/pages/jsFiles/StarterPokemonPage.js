import '../cssFiles/StarterPokemonPage.css';

import StarterPokemon from '../../components/jsFiles/StarterPokemon';

function StarterPokemonPage() {
    return (
        <div>
            <StarterPokemon pokemonName='bulbasaur' />
            <StarterPokemon pokemonName='squirtle' />
            <StarterPokemon pokemonName='charmander' />
        </div>
    )
}

export default StarterPokemonPage;