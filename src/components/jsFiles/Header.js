import '../cssFiles/Header.css';

import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigation = useNavigate();

    const { userState, myPokemonState, battlePokemonState } = useContext(AppContext);
    const [user, setUser] = userState;
    const [myPokemon] = myPokemonState;
    const [battlePokemon, setBattlePokemon] = battlePokemonState;

    function handleLogoutClick() {
        setBattlePokemon({});
        localStorage.removeItem('authorization');
        setUser({});
    }

    return (
        <div className='Header'>
            <div className='HeaderTitle'>
                <img className='Title' src={require('../../graphics/Pokemon-Master Header Text.png')} alt='Pokemon Master' />
            </div>
            <nav className='NavBar'>
                <div className='NavHome'>
                    <button onClick={() => { navigation('/'); setBattlePokemon({}); }}>Home / About</button>
                </div>
                {user.authorization ?
                    <>
                        <div className='NavPokemon'>
                            <button onClick={() => { navigation('/myPokemon'); setBattlePokemon({}); }}>My Pokemon</button>
                            {myPokemon.length < 1 ?
                                <button onClick={() => { navigation('/selectStarter'); }}>Select Starter Pokemon</button>
                                :
                                null
                            }
                        </div>
                        <div className='NavLogin'>
                            <h4>{user.username}</h4>
                            <button onClick={handleLogoutClick}>Logout</button>
                        </div>
                    </>
                    :
                    <div className='NavLogin'>
                        <button onClick={() => { navigation('/login'); }}>Login</button>
                        <button onClick={() => { navigation('/signup'); }}>Sign Up</button>
                    </div>
                }
            </nav>
        </div>
    )
}

export default Header;