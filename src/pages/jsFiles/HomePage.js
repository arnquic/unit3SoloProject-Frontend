import '../cssFiles/HomePage.css';

import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useContext } from 'react';

function HomePage() {

    const { userState } = useContext(AppContext);
    const [user] = userState;

    return (
        <div className='HomePage'>
            {user.authorization ?
                <>
                    <h1>Welcome, {user.username}!</h1>
                    <p>Battle other Pokemon, build your team, and become a pokemon master! As you defeat pokemon, you will catch them and add them to your roster so that you may use them in your next battle!</p>
                    <h3>To continue, head over to <Link to='/myPokemon'>My Pokemon</Link></h3>
                </>
                :
                <>
                    <h1>Welcome!</h1>
                    <p>Battle other Pokemon, build your team, and become a pokemon master! You will signin as a unique user and pick a starter Pokemon. As you defeat pokemon, you will catch them and add them to your roster so that you may use them in your next battle!</p>
                    <h3>To get started, <Link to='/signup'>create an account</Link></h3>
                </>
            }
        </div>
    )
}

export default HomePage;