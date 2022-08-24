import { signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useParams, } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import swal from 'sweetalert';
import { auth, db } from '../../../App';
import loadingImg from "../../images/1.gif"

const Update = () => {
    const { id } = useParams();
    const [noteDetails, setNoteDetails] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [noteColor, setNoteColor] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`https://firestore.googleapis.com/v1/projects/my-note-app-ccc18/databases/(default)/documents/notes/${id}`)
            .then((res) => res.json())
            .then((data) => setNoteDetails(data));

    }, [id])


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
    const onClickUpdate = async () => {

        const noteRef = doc(db, "notes", id)
        try {
            if (title.trim().length !== 0 && description.trim().length !== 0 && noteColor.trim().length !== 0) {

                await updateDoc(noteRef, {
                    title: title,
                    description: description,
                    color: noteColor,
                    date: String(new Date()),
                    time: String(moment().utcOffset('+06:00').format(' hh:mm a'))
                })
                setDescription(description);
                setTitle(title)
                setNoteColor(noteColor);

                swal("Well Done!", "You have successfully Updated the Note!", "success", {
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
            else if (title.trim().length === 0 && description.trim().length === 0 && noteColor.trim().length === 0) {

                toast.warning("For update you have to click once in all the input field")
            }
            else if (title.trim().length === 0) {
                toast.error("Sorry! Title is blank or not Clicked!")
            }

            else if (description.trim().length === 0) {
                toast.error("Sorry! Description is blank or not Clicked!")
            }
            else if (noteColor.trim().length === 0) {
                toast.error("Sorry! Color is blank!")
            }

        }
        catch (err) {
            console.log('err--->', err)
            toast.error(err.message)
        }

        setLoading(false)

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
                <title>Note Web App || Update</title>
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
                    <h3 className='note-title'>Update the Note Here</h3>
                    <div className="md-form mt-4 mb-4">
                        <input style={{ height: "60px" }} type="title"
                            placeholder='Note Title'
                            defaultValue={noteDetails.fields?.title.stringValue}

                            onBlur={handleTitle}
                            className="form-control w-75"
                            required />
                    </div>
                    <div className="md-form mb-4">
                        <textarea placeholder="Note Description"

                            defaultValue={noteDetails.fields?.description.stringValue}

                            onBlur={handleDescription}
                            class="form-control" name="" id="" rows="10"></textarea>
                    </div>
                    <h4 className='note-title ' style={{ fontSize: "30px" }}>Choose your Note color</h4>
                    <div className='radio-button mt-4 mb-4'>
                        <div className='me-3'>
                            <label>
                                <div className='d-flex'>
                                    <div>
                                        <input type="radio"
                                            value='red'

                                            onChange={handleNoteColor}
                                            name="color" />

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
                                        <input type="radio"

                                            value='blue'

                                            onChange={handleNoteColor}
                                            name="color" />

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
                                        <input type="radio"

                                            value='green'


                                            onChange={handleNoteColor}
                                            name="color" />

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
                                        <input type="radio"
                                            value='black'


                                            onChange={handleNoteColor}
                                            name="color" />

                                    </div>
                                    <div className='ms-1'>
                                        <h6>Black</h6>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <button onClick={onClickUpdate} className="login-btn w-25 mb-4">Update</button>
                <ToastContainer />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}

                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {/* Same as */}
                <ToastContainer />
            </div>

        </HelmetProvider>
    );
};
export default Update;

