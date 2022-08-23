import { signOut } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import moment from 'moment';
import React, { useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import { auth, db } from '../../../App';
import loadingImg from '../../images/1.gif';

const Create = ({ user }) => {
    console.log(user)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [noteColor, setNoteColor] = useState('');
    const [loading, setLoading] = useState(false);


    const handleTitle = event => {
        const result = event.target.value;
        setTitle(result)
    }
    const handleDescription = event => {
        const result = event.target.value;
        setDescription(result)
    }
    const handleNoteColor = event => {
        const result = event.target.value;
        setNoteColor(result)
    }


    const onClickCreate = async () => {

        setLoading(true)
        try {
            if (title.trim().length !== 0 && description.trim().length !== 0 && noteColor.trim().length !== 0) {

                await addDoc(collection(db, 'notes'), {
                    title: title,
                    description: description,
                    color: noteColor,
                    uid: user.uid,
                    time: String(moment().utcOffset('+06:00').format(' hh:mm a')),
                    date: String(new Date())
                })
                setDescription('');
                setTitle('')
                setNoteColor('');

                swal("Well Done!", "You have successfully Created a Note!", "success", {
                    buttons: {
                        cancel: "Cancel",
                        catch: {
                            text: "Go to Notes",
                            value: "catch",
                        },
                    },
                })
                    .then((value) => {
                        switch (value) {
                            case "catch":
                                setLoading(true)
                                window.location.href = '/'
                                setLoading(false)
                                break;
                            default: ;
                        }
                    });

            }

            else {
                toast.error("Please fill-up all fields!")
            }
        }
        catch (error) {
            console.log('error--->', error)
            toast.error(error.message);
        }

        setLoading(false);
    }






    const signout = () => {
        swal("Logout Warning!", "Do you really want to logout?", "warning", {
            buttons: {
                cancel: "NO",
                catch: {
                    text: "YES",
                    value: "catch",
                },
            },
        })
            .then((value) => {
                switch (value) {
                    case "catch":
                        signOut(auth)
                        swal("Well Done!", "You are successfully logged out!", "success");
                        break;
                    default: ;
                }
            });
    }

    if (loading) {
        return (
            <>
                <center>
                    <img src={loadingImg} alt="" className='loading-gif' />
                </center>
            </>
        )
    }
    return (
        <HelmetProvider>
            <Helmet>
                <title>Note Web App || Create</title>
            </Helmet>
            <div className='container'>
                <div className='note-title-and-navigation'>
                    <div><Link to='/' style={{ textDecoration: "none" }}>
                        <h1 className='my-notes-title'>My Notes</h1>
                    </Link> </div>
                    <div>

                        <span onClick={signout} className="material-symbols-outlined">
                            logout
                        </span>
                    </div>
                </div>

                <div className="col-12">
                    <h3 className='note-title'>Create a Note Here</h3>
                    <div className="md-form mt-4 mb-4">
                        <input style={{ height: "60px" }} placeholder="Note Title" type="title"
                            onChange={handleTitle}
                            className="form-control w-75"
                            required />
                    </div>
                    <div className="md-form mb-4">
                        <textarea placeholder="Note Description"
                            onChange={handleDescription}
                            class="form-control" name="" id="" rows="10"></textarea>
                    </div>
                    <h4 className='note-title ' style={{ fontSize: "30px" }}>Choose your Note color</h4>
                    <div className='radio-button mt-4 mb-4'>
                        <div className='me-3'>
                            <label>
                                <div className='d-flex'>
                                    <div>
                                        <input type="radio" value="red" name="color" onChange={handleNoteColor} />

                                    </div>
                                    <div className='ms-1'>
                                        <h6>Red</h6>
                                    </div>
                                </div>
                            </label>
                        </div>

                        <div className='me-3'>
                            <label>
                                <div className='d-flex'>
                                    <div>
                                        <input type="radio" value="blue" onChange={handleNoteColor} name="color" />

                                    </div>
                                    <div className='ms-1'>
                                        <h6>Blue</h6>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div className='me-3'>
                            <label>
                                <div className='d-flex'>
                                    <div>
                                        <input type="radio" value="green" onChange={handleNoteColor} name="color" />

                                    </div>
                                    <div className='ms-1'>
                                        <h6>Green</h6>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <div className='me-3'>
                            <label>
                                <div className='d-flex'>
                                    <div>
                                        <input type="radio" value="black" onChange={handleNoteColor} name="color" />

                                    </div>
                                    <div className='ms-1'>
                                        <h6>Black</h6>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <button onClick={onClickCreate} className="login-btn w-25 mb-4">Create</button>
                <ToastContainer />

            </div>
        </HelmetProvider>
    );
};

export default Create;