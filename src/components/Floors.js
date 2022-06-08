
import { useEffect, useState } from "react";
import ListGroup  from "react-bootstrap/ListGroup"
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import React from 'react'
import db from "../firebase"
import { collection, onSnapshot, orderBy, query} from "firebase/firestore";





const Floors = (props) => {
    const navigate = useNavigate();
    const [floors, setFloors] = useState([])

    let {buildingNumber} = useParams()

    useEffect(() => {
        //add()
        const q = query(collection(db, "buildings", buildingNumber, "floors" ),orderBy("floorNumber","asc"))
        const unsub = onSnapshot(q,(snapshot) => {setFloors(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))})
        return unsub;
    },[])


    let jay = []
    floors.map((floor, index) => {
        jay.unshift(<ListGroup.Item onClick={()=> {navigate(`floors/${floor.floorNumber}`)}} key={floor.floorNumber}>{floor.name}</ListGroup.Item>
        );
    })

    // const add = (data) => {
    //     const docRef = doc(db, "buildings", buildingNumber, "floors", '1')
    //     const payload = {name: "Floor 1", floorNumber: 1, jewsCount: 0}
    //     setDoc(docRef, payload)
    // }
    

    return (
        <div className="container py-3">
            <Button style={{backgroundColor: 'rgb(3, 165, 252)', border: 'none'}} onClick={()=>  navigate('/')}>
                <ArrowLeft size={25} /> Buildings
            </Button>
            <ListGroup className="pt-3">
                <ListGroup.Item className="display-5 text-center bg-light">{props.buildings[buildingNumber].address}</ListGroup.Item>
                <div>
                    {jay}
                </div>    
            </ListGroup>
        </div>      
    )
}

export default Floors
