
import Button from 'react-bootstrap/Button';
import React from "react";
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Door from './Door'
import NextFloorBtn from './NextFloorBtn';
import db from "../firebase"
import { collection, onSnapshot,updateDoc, doc, query, where, getDocs} from "firebase/firestore";



const Floor = (props) => {
    const [doors, setDoors] = useState([])
    const [totalJewish, setTotalJewish] = useState(null)
    const navigate = useNavigate()
    let {buildingNumber, floorNumber} = useParams()

    useEffect(() => {
        countJews()

        const unsub = onSnapshot(collection(db, "buildings", buildingNumber, "floors", floorNumber, "doors" ),(snapshot) => {setDoors(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))})
        return unsub;
    },[floorNumber])

    async function countJews() {
        const querySnapshot2 = await getDocs(query(collection(db, "buildings", buildingNumber, "floors", floorNumber, 'doors'), where("jewish", "==", "jewish")));

        const docRef = doc(db, "buildings", buildingNumber, "floors", floorNumber)
        const payload = {jewsCount: querySnapshot2.size}
        updateDoc(docRef, payload)
    }
    


    let jay = [];
    for(let door in doors){
        let num = 0;
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
        <section className='py-4'>
            <Container>
                <Container className="mb-3 text-center">
                    <div className="d-flex justify-content-between mb-4 align-items-center">
                        <Button  className='btn-light btn-sm border border-secondary d-flex align-items-center' onClick={async ()=> {
                            await countJews();
                            navigate(`/buildings/${buildingNumber}`);
                            }}>
                            <ArrowLeftShort size={25}/>
                            <div>Floors</div>
                        </Button>
                        <div className="display-1 me-3">{`Floor ${floorNumber}`}</div>
                        <div className="d-none d-lg-block">
                            <NextFloorBtn buildingNumber={buildingNumber} floorNumber={floorNumber}/>
                        </div>
                    </div>
                    {/* <Card body className="display-4 my-4 bg-light">{`Floor ${floorNumber}`}</Card> */}
                    <Row>
                        {jay}
                    </Row>

                    <div className='d-grid d-lg-none'>
                        <NextFloorBtn buildingNumber={buildingNumber} floorNumber={floorNumber} countJews={countJews}/>
                    </div>
                </Container>  
            </Container>
        </section>
    )
}

export default Floor