import React from 'react';
import { Card } from 'react-bootstrap';
import './Note.css';
import ReactReadMoreReadLess from "react-read-more-read-less";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../App';
import swal from 'sweetalert';

const Note = ({ note }) => {
    const { title, description, color, time, date } = note;

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
        swal("Delete Warning!", "Do you really want to Delete this note?", "warning", {
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
                        swal("Success!", "You are successfully Delete a note", "success");
                        break;
                    default: ;
                }
            });

    }
    return (
        <div className="col-md-6 mb-4">

            <Card style={{ backgroundColor: color, borderRadius: '20px', }}>
                <Card.Body>
                    <div className='note-card'>
                        <div className='w-75'>
                            <h5 className=''> {title}</h5>
                            <h6 className=''>
                                <ReactReadMoreReadLess
                                    charLimit={30}
                                    readMoreText={"Show More→"}
                                    readLessText={"Show less↑"}
                                    readMoreClassName="read-more-less--more"
                                    readLessClassName="read-more-less--less"
                                >
                                    {description}
                                </ReactReadMoreReadLess></h6>
                            <p> {time} -- {date.slice(0, 15)}</p>
                        </div>
                        <div>
                            <span onClick={onPressDeleteMsg} class="material-symbols-outlined del-icon">
                                delete_forever
                            </span>
                        </div>
                    </div>

                </Card.Body>
            </Card>
        </div>
    );
};

export default Note;