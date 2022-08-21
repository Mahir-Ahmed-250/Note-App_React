import React from 'react';
import { Card } from 'react-bootstrap';

const Note = ({ note }) => {
    const { title, description } = note;
    return (
        <div className="col-md-4 mt-3">
            <Card className="product-card">

                <Card.Body>
                    <h5 className='product-name'> {title}</h5>
                    <h6 className='product-description'> {description}</h6>

                </Card.Body>
            </Card>
        </div>
    );
};

export default Note;