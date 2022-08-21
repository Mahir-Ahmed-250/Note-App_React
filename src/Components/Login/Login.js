import React, { useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import loginImg from '../images/signup.png';
import fire from '../images/fire.png'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../App';
import { toast, ToastContainer } from 'react-toastify';
import swal from 'sweetalert';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmail = event => {
        const result = event.target.value;
        setEmail(result)
    }

    const handlePassword = event => {
        const result = event.target.value;
        setPassword(result)
    }


    const signIn = async () => {

        try {
            await signInWithEmailAndPassword(auth, email, password).then((res) => {
                console.log('Sign In Successfully', res)
            })
            swal({
                title: "Congratulation!",
                text: "You are successfully logged in!",
                icon: "success",
                button: "OK",
            });

        }
        catch (error) {
            console.log('error----->', error)
            toast.error(error.message);
        }
    }

    return (
        <HelmetProvider>
            <Helmet>
                <title>Note Web App || Login</title>
            </Helmet>
            <div className='login-page'>
                <div className='container '>
                    <h2 className='login-title'>Welcome to Note Web Application</h2>
                    <h4 className='text-center note-title'>Note Application is a simple CRUD Application by  <img src={fire} alt="firebase" /> </h4>

                    <div className='login-container '>
                        <div>
                            <img className='login-img' src={loginImg} alt="login-img" />
                        </div>
                        <div>
                            <div className="row">
                                <div className="col-md-12 mb-md-0 mb-5">
                                    <form id="contact-form" name="contact-form">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="md-form mb-4">
                                                    <input placeholder="Your Email Address" type="email"

                                                        onChange={handleEmail}
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="md-form mb-0">
                                                    <input placeholder="Password" type="password"
                                                        onChange={handlePassword}
                                                        className="form-control" required />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="text-center mb-4">
                                        <button onClick={signIn} className="login-btn mt-4 w-100">Login</button>
                                    </div>
                                    <ToastContainer />
                                    <h5 className='sign-up-text'>Don't Have an account? <Link to='/signup' className='sign-up-link'> <span >Sign Up</span></Link></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
};

export default Login;