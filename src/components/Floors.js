
import { useEffect, useState } from "react";
import ListGroup  from "react-bootstrap/ListGroup"
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import React from 'react'
import Card from 'react-bootstrap/Card';
import db from "../firebase"
import { collection, onSnapshot, addDoc, doc, setDoc, deleteDoc, orderBy, query} from "firebase/firestore";





const Floors = (props) => {
    const navigate = useNavigate();
    const [floors, setFloors] = useState([])

    let {buildingNumber} = useParams()

    useEffect(() => {
        const q = query(collection(db, "buildings", buildingNumber, "floors" ),orderBy("floorNumber","asc"))
        const unsub = onSnapshot(q,(snapshot) => {setFloors(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))})
        return unsub;
    },[])


    let jay = []
    floors.map((floor, index) => {
        jay.unshift(<ListGroup.Item onClick={()=> {navigate(`floors/${floor.floorNumber}`)}} key={floor.floorNumber}>{floor.name}</ListGroup.Item>
        );
    })

    return (
        <div className="container mt-3">
            <Button onClick={()=> navigate('/')}>
                <ArrowLeft size={25}/> Buildings
            </Button>
            <ListGroup className="pt-5">
                <ListGroup.Item className="display-5 text-center">{props.buildings[buildingNumber].address}</ListGroup.Item>
                <div>
                    {jay}
                </div>    
            </ListGroup>
        </div>      
    )
}

export default Floors
