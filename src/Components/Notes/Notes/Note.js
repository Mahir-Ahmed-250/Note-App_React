import React from 'react';
import { Card } from 'react-bootstrap';
import './Note.css';
import ReactReadMoreReadLess from "react-read-more-read-less";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../App';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';


const Note = ({ note }) => {
    const { title, description, color, time, date, id } = note;

    const onPressDelete = async () => {
        try {
            deleteDoc(doc(db, "notes", note.id))
            swal("Good job!", "You clicked the button!", "success");
        }
        catch (err) {
            console.log('err--->', err)
        }
    }

    const onPressDeleteMsg = () => {
        swal("Delete Warning!", "Do you really want to Delete this Note?", "warning", {
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
                        onPressDelete()
                        swal("Success!", "You have successfully Delete the Note!", "success");
                        break;
                    default: ;
                }
            });
    }

    return (
        <div className="col-12 mb-4">

            <Card style={{ backgroundColor: color, borderRadius: '25px' }} >
                <Card.Body style={{ height: "100%" }}>
                    <div className='note-card'>
                        <div className='w-75'>
                            <h2 className='note-title-1'> {title}</h2>
                            <h6 className='note-title-2'>
                                <ReactReadMoreReadLess
                                    charLimit={130}
                                    readMoreText={"Show More"}
                                    readLessText={"Show less"}
                                    readMoreClassName="read-more-less--more"
                                    readLessClassName="read-more-less--less"

                                >
                                    {description}
                                </ReactReadMoreReadLess></h6>
                            <p className='note-title-3'>Last Updated: {time} -- {date.slice(0, 15)}</p>
                        </div>
                        <div>
                            <span onClick={onPressDeleteMsg} className="material-symbols-outlined del-icon">
                                delete_forever
                            </span><br />
                            <Link to={`update/${id}`}  > <span className="material-symbols-outlined update-icon">
                                update
                            </span></Link>
                        </div>
                    </div>

                </Card.Body>
            </Card>
        </div>
    );
};

export default Note;