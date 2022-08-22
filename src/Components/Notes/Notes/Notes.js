import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { auth, db } from '../../../App';
import Note from './Note';
import loadingImg from '../../images/1.gif'
import './Notes.css';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { signOut } from 'firebase/auth';
import notImg from '../../images/not.png';

const Notes = ({ user }) => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        //create the query
        const q = query(collection(db, 'notes'), where('uid', '==', user.uid))
        //create listener
        const notesListenerSubscription = onSnapshot(q, (querySnapShot) => {
            const list = []
            querySnapShot.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id })
            })
            setNotes(list)
            setLoading(false)
        })

        return notesListenerSubscription;
    }, [user.uid])



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
                <title>Note Web App || Notes</title>
            </Helmet>
            <div className='container'>
                <div className='note-title-and-navigation'>
                    <div> <h1 className='my-notes-title'>My Notes</h1></div>
                    <div>
                        <Link to="/create"><span className="material-symbols-outlined">
                            add_circle
                        </span></Link>
                        <span onClick={signout} className="material-symbols-outlined">
                            logout
                        </span>
                    </div>
                </div>
            </div>
            <div className=' container '>
                {

                    // eslint-disable-next-line eqeqeq
                    notes == 0 ?
                        <div >
                            <center><img className='mt-5' src={notImg} alt="" srcset="" /></center>
                        </div> :
                        <div className='row'>
                            {
                                notes.map(note => <Note key={note.id} note={note}></Note>)
                            }
                        </div>
                }

            </div>
        </HelmetProvider>
    );
};

export default Notes;