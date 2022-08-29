/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState } from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import loginImg from '../images/signup.png';
import fire from '../images/fire.png'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { GithubAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../App';
import { toast, ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import { Spinner } from 'react-bootstrap';
import logo from "../images/google.png"
import logo2 from '../images/github.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmail = event => {
        const result = event.target.value;
        setEmail(result)
    }

    const handlePassword = event => {
        const result = event.target.value;
        setPassword(result)
    }

    const signIn = async () => {
        setLoading(true)
        signOut(auth)
        try {

            if (email.trim().length !== 0 && password.length !== 0) {
                await signInWithEmailAndPassword(auth, email, password).then((res) => {

                    if (res.user.emailVerified) {
                        swal({
                            title: "Well Done",
                            text: "Successfully logged in!",
                            icon: "success",
                            button: "OK",
                        });
                    }
                    else {
                        swal({
                            title: "Sorry!",
                            text: "Your Email is not Verified!",
                            icon: "error",
                            button: "OK",
                        });
                    }
                    setLoading(false)
                })
            }
            else {
                toast.error("Please fill-up required fields!")
                setLoading(false)
            }

        }
        catch (error) {
            console.log('error----->', error)
            toast.error(error.message);
            setLoading(false)
        }

    }

    const googleSignUp = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                swal({
                    title: "Well Done",
                    text: "Successfully logged in by Google!",
                    icon: "success",
                    button: "OK",
                });

            })
            .catch((error) => {
                toast.error(error.message);
            })
    }

    const gitHubSignUp = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                swal({
                    title: "Well Done",
                    text: "Successfully logged in by Github!",
                    icon: "success",
                    button: "OK",
                });
            })
            .catch((error) => {
                toast.error(error.message);
            })
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

                                                        onBlur={handleEmail}
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
                                            <Link to="/forget">
                                                <p className='forget-link' >
                                                    Forget Password?
                                                </p>

                                            </Link>


                                        </div>

                                    </form>

                                    <div className="text-center mb-4">
                                        <button onClick={signIn}
                                            className="login-btn mt-3 w-100">
                                            {loading ? (<>
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </>) : (<>
                                                Login
                                            </>)}
                                        </button>
                                    </div>


                                    <ToastContainer />

                                    <div className='social-login mb-2'>
                                        <div>
                                            <p className='social-title'>Log In With</p>
                                        </div>
                                        <div>
                                            <img src={logo} className="me-2" onClick={googleSignUp} alt="" />

                                            <img src={logo2} onClick={gitHubSignUp} alt="" />
                                        </div>
                                    </div>
                                    <h5 className='sign-up-text'>Don't Have an account? <Link to='/signup' className='sign-up-link'> <span >Sign Up</span></Link></h5>
                                </div>

                            </div>

                        </div>

                    </div>

                    <h4 className='text-center note-title-4'>Check this Mobile Application Version <a href="https://expo.dev/@mahir_developer/note-app" target="_blank" rel="noreferrer">Here</a> </h4>

                </div>
            </div>
        </HelmetProvider>
    );
};

export default Login;