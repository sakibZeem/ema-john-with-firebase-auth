import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const Login = () => {
    const [error, setError] = useState('');
    const {signIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    
    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
        .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('');
            form.reset();
            navigate(from, {replace: true})
        })
        .catch(error => {
            setError('Invalid Credentials!')
        })
    }
    return (
        <div className='form-container'>
            <h4 className='form-title'>Login</h4>
            <form onSubmit={handleLogin}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder='email' required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder='password' required/>
                    <Link><p><small>Forget password?</small></p></Link>
                </div>
                <input className='btn-submit' type="submit" value="Login" />
                <p><small>New to Ema-john? <Link to="/signup">Create an account</Link></small></p>
            </form>
            <p>{error}</p>
        </div>
    );
};

export default Login;