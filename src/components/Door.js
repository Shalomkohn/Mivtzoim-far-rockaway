
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import DropdownBotton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect} from 'react';
import db from "../firebase"
import { doc, updateDoc} from "firebase/firestore";

const Door = ({door, doorObj, floorNumber, buildingNumber}) => {
    const [color, setColor] = useState('bg-secondary')
    const [noteChanges, setNoteChanges] = useState(doorObj.notes)
    const [show, setShow] = useState(false);
    const buttonValue = doorObj.notes ? 'Notes' : '+ Note';
    const buttonVariant = doorObj.notes ? 'warning' : 'light';


    const handleShow = () => setShow(true);
    
    const handleClose = () => {
        setShow(false);
        const docRef = doc(db, "buildings", buildingNumber, "floors", floorNumber, "doors", doorObj.id)
        const payload = {notes: noteChanges}
        updateDoc(docRef, payload)
    }

    useEffect(()=>{if(doorObj.jewish == 'jewish'){
                setColor('rgba(100, 255, 0, 0.5)')
            }else if(doorObj.jewish == 'unknown'){
                setColor('#f8f9fa')
            }else if(doorObj.jewish == 'not jewish'){
                setColor('rgba(255, 0, 74, 0.4)')
            }}
    ,[doorObj])

    const updateJewish = (data) => {
        const docRef = doc(db, "buildings", buildingNumber, "floors", floorNumber, "doors", doorObj.id)
        const payload = {jewish: data}
        updateDoc(docRef, payload)
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
            <Col xs={12} md={6} lg={4} className="mb-4">
                <Card className='shadow-sm m-2'>
                    <h6 style={{backgroundColor: color}} className='p-1 m-0 border-bottom'>{doorObj.jewish}</h6>
                    <div className="p-1 d-flex justify-content-between align-items-center bg-light">
                        <Button className='border' variant={buttonVariant} onClick={handleShow}>
                            {buttonValue}
                        </Button>
                        <h1 className='m-0 d-block h-100'>{doorObj.name}</h1>  
                        <DropdownBotton className='border' variant='light' key={doorObj.name} title='Update'>
                            <Dropdown.Item className='text-center' onClick={()=> {
                                    updateJewish('not jewish')
                                }} eventKey="1">Not Jewish</Dropdown.Item>
                            <Dropdown.Item className='text-center' onClick={()=> {
                                    updateJewish('unknown')
                                }} eventKey="2">Unknown</Dropdown.Item>
                            <Dropdown.Item className='text-center' onClick={()=> {
                                    updateJewish('jewish')
                                }} eventKey="3">Jewish</Dropdown.Item>
                        </DropdownBotton>
                    </div>
                </Card>
            </Col>
        </>
    )
}

export default Door