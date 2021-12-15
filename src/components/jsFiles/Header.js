import '../cssFiles/Header.css';

import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigation = useNavigate();

    const { userState, myPokemonState } = useContext(AppContext);
    const [user, setUser] = userState;
    const [myPokemon] = myPokemonState;

    function handleLogoutClick() {
        localStorage.removeItem('authorization');
        setUser({});
    }

    return (
        <div className='Header'>
            <h1 className='Title'>Pokemon Master</h1>
            <nav className='NavBar'>
                <button onClick={() => { navigation('/'); }}>Home / About</button>
                {user.authorization ?
                    <>
                        <button onClick={() => { navigation('/myPokemon'); }}>My Pokemon</button>
                        {myPokemon.length < 1 ?
                            <button onClick={() => { navigation('/selectStarter'); }}>Select Starter Pokemon</button>
                            :
                            null
                        }
                        <span>{user.username}</span>
                        <button onClick={handleLogoutClick}>Logout</button>
                    </>
                    :
                    <>
                        <button onClick={() => { navigation('/login'); }}>Login</button>
                        <button onClick={() => { navigation('/signup'); }}>Sign Up</button>
                    </>
                }
            </nav>
        </div>
    )
}

export default Header;