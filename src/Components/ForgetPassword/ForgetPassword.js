import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { auth } from '../../App';
import fire from "../images/fire.png";
import forgetImg from '../images/forget.png';
import swal from 'sweetalert';


const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);


    const handlePasswordReset = e => {
        e.preventDefault()
        setLoading(true)

        sendPasswordResetEmail(auth, email)
            .then(() => {
                swal({
                    title: "Successful",
                    text: "Password reset link has been send, please check your inbox or spam folder ",
                    icon: "success",
                    button: "OK",
                });
                setLoading(false);
                setEmail("")
            })
            .catch((error) => {
                toast.error(error.message);
                setLoading(false)
            });




    }

    return (

        <HelmetProvider>
            <Helmet>
                <title>Note Web App || Forget password</title>
            </Helmet>
            <div className='login-page'>
                <div className='container '>
                    <h2 className='login-title'>Welcome to Note Web Application</h2>
                    <h4 className='text-center note-title'>Note Application is a simple CRUD Application by  <img src={fire} alt="firebase" /> </h4>

                    <center>
                        <img className='login-img ' src={forgetImg} alt="login-img" />
                        <h5 className=''>Enter your Email Address</h5>
                        <div className="col-sm-12 col-xl-6 mb-md-0 mb-5">
                            <form id="contact-form" name="contact-form" onSubmit={handlePasswordReset}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="md-form mb-4">
                                            <input placeholder="Your Email Address" type="email"
                                                required
                                                onChange={e => setEmail(e.target.value)}
                                                value={email}
                                                className="form-control" />
                                        </div>
                                    </div>



                                </div>
                                <button
                                    className="login-btn mt-3 w-100 mb-4">

                                    {loading ? (<>
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </>) : (<>
                                        Send Password Reset Link
                                    </>)}
                                </button>
                            </form>

                            {/* <div className="text-center mb-4">
                                
                            </div> */}


                            <ToastContainer />


                            <h5 className='sign-up-text'>Want to Login? <Link to='/login' className='sign-up-link'> <span >Sign In</span></Link></h5>
                        </div>
                    </center>





                    <div >


                    </div>



                </div>
            </div>
        </HelmetProvider>




    );
};

export default ForgetPassword;