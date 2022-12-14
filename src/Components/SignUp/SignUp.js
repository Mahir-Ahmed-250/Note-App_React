import React, { useState } from 'react';
import { Link } from "react-router-dom";
import signUpImg from '../images/signup1.png';
import fire from '../images/fire.png'
import './SignUp.css';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, sendEmailVerification, signInWithPopup } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import swal from 'sweetalert';
import { Spinner } from 'react-bootstrap';
import logo from '../images/google.png';
import logo2 from '../images/github.png';


const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('')
    const [loading, setLoading] = useState(false);

    const handleEmail = event => {
        const result = event.target.value;
        setEmail(result)
    }
    const handleName = event => {
        const result = event.target.value;
        setName(result)
    }
    const handlePassword = event => {
        const result = event.target.value;
        setPassword(result)
    }
    const handleGender = event => {
        const result = event.target.value;
        setGender(result)
    }

    const handleChange = event => {
        const result = event.target.value.replace(/\D/g, '');
        setAge(result);
    };


    const signup = async () => {
        setLoading(true)
        try {
            if (name.trim().length !== 0 && age.length !== 0 && gender.trim().length !== 0) {

                // Created User With Email & Password
                const result = await createUserWithEmailAndPassword(auth, email, password)

                // Add User Profile to Database
                await addDoc(collection(db, 'users'), {
                    name: name,
                    email: email,
                    age: age,
                    gender: gender,
                    uid: result.user.uid
                })

                await sendEmailVerification(auth.currentUser)
                    .then(() => {
                        swal({
                            title: "Account Created",
                            text: "Please check your email spam folder for verification link!",
                            icon: "success",
                            button: "OK",
                        });

                    });
                setLoading(false)
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
        setLoading(false)

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
                <title>Note Web App || Sign Up</title>
            </Helmet>
            <div className='login-page'>
                <div className='container '>
                    <h2 className='login-title'>Welcome to Note Web Application</h2>
                    <h4 className='text-center note-title'>Note Application is a simple CRUD Application by  <img src={fire} alt="firebase" /> </h4>
                    <div className='login-container mt-5'>
                        <div>
                            <img src={signUpImg} alt="login-img" />
                        </div>
                        <div>
                            <div className="row">
                                <div className="col-md-12 mb-md-0 mb-5">
                                    <form id="contact-form" name="contact-form">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="md-form mb-4">
                                                    <input placeholder="Your Email Address" type="email"
                                                        className="form-control"
                                                        onChange={handleEmail} required />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="md-form mb-4">
                                                    <input placeholder="Password" type="password"
                                                        className="form-control" onChange={handlePassword} required />
                                                </div>
                                                <div className="md-form mb-4">
                                                    <input placeholder="Your Name" type="text"
                                                        className="form-control" onChange={handleName} required />
                                                </div>

                                                <div className="md-form mb-4">
                                                    <input
                                                        type="text"
                                                        placeholder="Age"
                                                        value={age}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                    />
                                                </div>

                                                <h5 className='gender-text'>Select your gender</h5>

                                                <div className='radio-button'>
                                                    <div className='me-3'>
                                                        <div className='d-flex'>

                                                            <div>
                                                                <label></label>
                                                                <input type="radio" value="Male" name="gender" onClick={handleGender} />
                                                            </div>

                                                            <div className='ms-1'>
                                                                <h6>Male</h6>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className='d-flex'>
                                                            <div>
                                                                <input type="radio" value="Male" name="gender" onClick={handleGender} />
                                                            </div>
                                                            <div className='ms-1'>
                                                                <h6>Female</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </form>

                                    <div className="text-center mb-3">

                                        <button onClick={signup}
                                            className="login-btn mt-4 w-100">
                                            {loading ? (<>
                                                <Spinner animation="border" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </Spinner>
                                            </>) : (<>
                                                Sign Up
                                            </>)}
                                        </button>

                                        <ToastContainer />

                                    </div>
                                    <div className='social-login mb-2'>
                                        <div>
                                            <p className='social-title'>Sign Up With</p>
                                        </div>
                                        <div>
                                            <img src={logo} className="me-2" onClick={googleSignUp} alt="" />

                                            <img src={logo2} onClick={gitHubSignUp} alt="" />

                                        </div>
                                    </div>
                                    <h5 className='sign-up-text'>Already Have an account? <Link to='/login' className='sign-up-link'> <span >Sign in</span></Link></h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HelmetProvider>
    );
};

export default SignUp;