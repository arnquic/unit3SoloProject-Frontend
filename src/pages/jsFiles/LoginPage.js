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

    async function submitSignup(e) {
        e.preventDefault();
        const response = await axios.post(`${env.BACKEND_URL}/user/login`, { email: loginInfo.email, password: loginInfo.password });
        console.log(response);
        setUser(response.data.user);
        localStorage.setItem('authorization', response.data.user.authorization);
    }

    return (
        <form className='LoginForm' onSubmit={(e) => { submitSignup(e); }}>
            <div className='LoginEmail'>
                <label htmlFor="email">Email: </label>
                <input name="email" type="email" placeholder="Enter your email" value={loginInfo.email} onChange={handleFormChange} />
            </div>
            <div className='LoginPassword'>
                <label htmlFor="password">Password: </label>
                <input name="password" type="password" placeholder="Enter your password" value={loginInfo.password} onChange={handleFormChange} />
            </div>
            <input type="submit" value="Submit" />
        </form >
    )
}

export default LoginPage;