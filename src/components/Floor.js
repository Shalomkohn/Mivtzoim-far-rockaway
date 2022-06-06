
import Button from 'react-bootstrap/Button';
import React from "react";
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Door from './Door'
import NextFloorBtn from './NextFloorBtn';
import db from "../firebase"
import { collection, onSnapshot } from "firebase/firestore";




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
    
    // ------- Code to initialize doors
    // const add = (data) => {
    //     const arr = ['A','B','C','D','E','F','G','H','J','K','L','M','N']
    //     arr.map((letter) => {
    //         const docRef = doc(db, "buildings", buildingNumber, "floors", floorNumber, "doors", letter)
    //         const payload = {name: letter, jewish: "unknown"}
    //         setDoc(docRef, payload)
    //     })
      
    // }
    //add()

    return (
        <section className='py-4' style={{background: '#dedede'}}>
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