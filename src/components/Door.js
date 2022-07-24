
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import DropdownBotton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { PencilSquare } from 'react-bootstrap-icons';
import { JournalText } from 'react-bootstrap-icons';
import React, { useState, useEffect} from 'react';
import db from "../firebase";
import { doc, updateDoc} from "firebase/firestore";


const Door = ({countJews, doorObj, floorNumber, buildingNumber}) => {
    const [bgColor, setBgColor] = useState('#CCC');
    const [color, setColor] = useState('#777');
    const [noteChanges, setNoteChanges] = useState(doorObj.notes);
    const [show, setShow] = useState(false);
    const [animation, setAnimation] = useState(null);
    const buttonValue = doorObj.notes ? <JournalText/> : <PencilSquare/>;
    const buttonVariant = doorObj.notes ? 'blue' : '#777';

    const handleShow = () => setShow(true);
    
    const handleClose = () => {
        setShow(false);
        const docRef = doc(db, "buildings", buildingNumber, "floors", floorNumber, "doors", doorObj.id)
        const payload = {notes: noteChanges}
        updateDoc(docRef, payload)
    }

    useEffect(()=>{
            if(doorObj.jewish == 'Jewish'){
                setBgColor('#05CFA5')
                setColor('#777')
            }else if(doorObj.jewish == 'Unknown'){
                setBgColor('#CCC')
                setColor('#777')
            }else if(doorObj.jewish == 'Not Jewish'){
                setBgColor('#555')
                setColor('#BBB')
            }}
    ,[doorObj])

    const updateJewish = (data) => {
        const date = new Date();
        const dateString = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
        const docRef = doc(db, "buildings", buildingNumber, "floors", floorNumber, "doors", doorObj.id)
        const payload = {jewish: data, lastUpdated: dateString}
        updateDoc(docRef, payload)
        countJews()
    }

   
    return (
        <>
{/* Modal ====================================================================================================================== */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className='text-center'>
                <Modal.Title>{doorObj.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Control as="textarea" rows={3} value={noteChanges} onChange={(e)=>setNoteChanges(e.target.value)}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

{/* Card ====================================================================================================================== */}
            <Col xs={12} md={6} className="mb-2">
                <div className="rounded-3 shadow bg-light mx-auto" style={{maxWidth: '400px'}}>
                    <div className="d-flex justify-content-around align-items-center" style={{height: '45px'}}>
                        <div className="fs-2 m-0 d-flex justify-content-center" style={{width: '25px'}}>{doorObj.name}</div>
                        <div className='fw-light text-end pe-2 lh-sm' style={{width: '60px', fontSize: '10px', color: '#AAA'}}>{doorObj.lastUpdated}</div>
                        <h6 className="m-0 p-1 d-flex justify-content-center fw-light rounded-1" style={{width: '83px',backgroundColor: bgColor, color: color, fontSize: '15px'}}>{doorObj.jewish}</h6>
                        <DropdownBotton className='dropdown-for-updating' variant='light' key={doorObj.name} title='Update'>
                            <Dropdown.Item className='text-center' onClick={()=> {
                                updateJewish('Not Jewish')
                            }} eventKey="1">Not Jewish</Dropdown.Item>
                            <Dropdown.Item className='text-center' onClick={()=> {
                                updateJewish('Unknown')
                            }} eventKey="2">Unknown</Dropdown.Item>
                            <Dropdown.Item className='text-center' onClick={()=> {
                                updateJewish('Jewish')
                            }} eventKey="3">Jewish</Dropdown.Item>
                        </DropdownBotton>
                        <div variant={'light'} className={`fs-1 d-flex align-items-center`} style={{color: buttonVariant}} onClick={handleShow}>
                            {buttonValue}
                        </div>
                    </div>
                </div>
            </Col>
        </>
    )
}

export default Door