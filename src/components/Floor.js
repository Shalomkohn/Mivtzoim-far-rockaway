
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import React from "react";
import { useEffect, useState } from 'react';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { useNavigate, useParams } from 'react-router-dom';
import ToggleButton from "react-bootstrap/ToggleButton";
import { ArrowLeft, ArrowDown } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Door from './Door'
import NextFloorBtn from './NextFloorBtn';
import db from "../firebase"
import { collection, onSnapshot, addDoc, doc, setDoc, deleteDoc, orderBy, query} from "firebase/firestore";




const Floor = (props) => {
    const [doors, setDoors] = useState([])
    const navigate = useNavigate()

    let {buildingNumber, floorNumber} = useParams()

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "buildings", buildingNumber, "floors", floorNumber, "doors" ),(snapshot) => {setDoors(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))})
        return unsub;
    },[floorNumber])
    

    let jay = [];
    for(let door in doors){
        jay.push(
            <Door buildingNumber={buildingNumber} floorNumber={floorNumber} key={door} door={door} doorObj={doors[door]} />
        )
    }
    
    //  const add = (data) => {
    //     const docRef = doc(db, "buildings", buildingNumber, "floors", floorNumber, "doors", "n")
    //     const payload = {name: "N", jewish: "Unknown"}
    //     setDoc(docRef, payload)
    // }
    // add()

    return (
        <section className='pt-4 bg-light'>
            <Container>
            
                <Button onClick={()=> navigate(`/buildings/${buildingNumber}`)}>
                    <ArrowLeft size={25}/> Floors
                </Button>
                <Container className="my-3 text-center">
                    <Card body className="display-4 my-4 bg-light">{`Floor ${floorNumber}`}</Card>
                    <Row>
                        {jay}
                    </Row>
                    <NextFloorBtn buildingNumber={buildingNumber} floorNumber={floorNumber}/>
                </Container>  
            </Container>
        </section>
    )
}

export default Floor