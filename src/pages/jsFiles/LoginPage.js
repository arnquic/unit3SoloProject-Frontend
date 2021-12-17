import '../cssFiles/LoginPage.css';

import axios from 'axios';
import env from 'react-dotenv';
import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function LoginPage() {
    const defaultLoginInfo = {
        email: "",
        password: ""
    }

    const [loginInfo, setLoginInfo] = useState(defaultLoginInfo);

    const { userState } = useContext(AppContext);
    const [user, setUser] = userState;

    function handleFormChange(e) {
        const { name, value } = e.target;
        setLoginInfo({
            ...loginInfo,
            [name]: value
        })
    }

    async function submitLogin(e) {
        e.preventDefault();
        const response = await axios.post(`${env.BACKEND_URL}/user/login`, { email: loginInfo.email, password: loginInfo.password });
        setUser(response.data.user);
        localStorage.setItem('authorization', response.data.user.authorization);
    }

    return (
        <div className='LoginPage'>
            <div className='LoginTitle'>
                <h2>Login</h2>
            </div>
            <form className='LoginForm'
                onSubmit={(e) => { submitLogin(e); }}
            >
                <div className='LoginEmail'>
                    <input name="email" type="email" placeholder="Email" value={loginInfo.email} onChange={handleFormChange} />
                </div>
                <div className='LoginPassword'>
                    <input name="password" type="password" placeholder="Password" value={loginInfo.password} onChange={handleFormChange} />
                </div>
                <input type="submit" value="Submit" />
            </form >
        </div>
    )
}

export default LoginPage;