import React from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import loginImg from '../images/signup.png';
import fire from '../images/fire.png'

const Login = () => {
    return (
        <div className='login-page'>
            <div className='container '>
                <h2 className='login-title'>Welcome to Note Web Application</h2>
                <h4 className='text-center note-title'>Note Application is a simple CRUD Application by  <img src={fire} alt="firebase" /> </h4>

                <div className='login-container '>
                    <div>
                        <img className='login-img' src={loginImg} alt="login-img" />
                    </div>
                    <div>
                        <div class="row">
                            <div class="col-md-12 mb-md-0 mb-5">
                                <form id="contact-form" name="contact-form">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="md-form mb-4">
                                                <input placeholder="Your Email Address" type="email"
                                                    class="form-control" required />
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="md-form mb-0">
                                                <input placeholder="Password" type="password"
                                                    class="form-control" required />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div class="text-center mb-4">
                                    <button onclick="sendMail()" class="login-btn mt-4 w-100">Login</button>
                                </div>
                                <h5 className='sign-up-text'>Don't Have an account? <Link to='/signup' className='sign-up-link'> <span >Sign Up</span></Link></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;