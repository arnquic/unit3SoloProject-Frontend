import '../cssFiles/SignupPage.css';

import axios from 'axios';
import env from 'react-dotenv';
import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function SignupPage() {

    const defaultSignupInfo = {
        username: "",
        email: "",
        password: ""
    }

    const [signupInfo, setSignupInfo] = useState(defaultSignupInfo);

    const { userState } = useContext(AppContext);
    const [user, setUser] = userState;

    function handleFormChange(e) {
        const { name, value } = e.target;
        setSignupInfo({
            ...signupInfo,
            [name]: value
        })
    }

    async function submitSignup(e) {
        e.preventDefault();
        const response = await axios.post(`${env.BACKEND_URL}/user/signup`, { username: signupInfo.username, email: signupInfo.email, password: signupInfo.password });
        console.log(response);
        setUser(response.data.user);
        localStorage.setItem('authorization', response.data.user.authorization);
    }

    return (
        <div className='SignupPage'>
            <div className='SignupTitle'>
                <h2>Sign Up</h2>
            </div>
            <form className='SignupForm'
                onSubmit={(e) => { submitSignup(e); }}
            >
                <div className='SignupUsername'>
                    <input name="username" type="text" placeholder="Username" value={signupInfo.username} onChange={handleFormChange} />
                </div>
                <div className='SignupEmail'>
                    <input name="email" type="email" placeholder="Email" value={signupInfo.email} onChange={handleFormChange} />
                </div>
                <div className='SignupPassword'>
                    <input name="password" type="password" placeholder="Password" value={signupInfo.password} onChange={handleFormChange} />
                </div>
                <input type="submit" value="Submit" />
            </form >
        </div>
    )
}

export default SignupPage;