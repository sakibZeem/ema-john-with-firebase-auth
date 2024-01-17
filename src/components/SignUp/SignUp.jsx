import React, { useContext, useState } from 'react';
import './Signup.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const SignUp = () => {
    const [error, setError] = useState('');
    const {createUser} = useContext(AuthContext);
    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const cpassword = form.cpassword.value;

        setError(''); 
        if(password !== cpassword){
            setError('Your password did not match')
            return;
        }
        else if(password.length < 6){
            setError('Password must be 6 characters')
            return;
        }
        createUser(email, password)
        .then(result => {
            const signedUser = result.user;
            console.log(signedUser);
            form.reset();
        })
        .catch(error => {
            setError('Your email is already in use')
        })
    }
    return (
        <div className='form-container'>
            <h4 className='form-title'>Signup</h4>
            <form onSubmit={handleSignUp}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder='email' required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder='password' required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="cpassword">Password</label>
                    <input type="password" name="cpassword" id="cpassword" placeholder='confirm password' required/>
                </div>
                <input className='btn-submit' type="submit" value="Signup" />
                <p><small>Already have an account? <Link to="/login">Login now</Link></small></p>
            </form>
            <p className='error-text'>{error}</p>
        </div>
    );
};

export default SignUp;