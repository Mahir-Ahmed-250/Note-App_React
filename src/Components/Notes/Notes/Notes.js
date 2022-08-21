import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { db } from '../../../App';
import Note from './Note';

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
    }, [])




    return (
        <HelmetProvider>
            <Helmet>
                <title>Note Web App || Notes</title>
            </Helmet>
            <div>

                {
                    notes.map(note => <Note key={note.id} note={note}></Note>)
                }

            </div>
        </HelmetProvider>
    );
};

export default Notes;