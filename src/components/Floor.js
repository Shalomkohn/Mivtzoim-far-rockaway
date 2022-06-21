
import Button from 'react-bootstrap/Button';
import React from "react";
import { useEffect, useState } from 'react';
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
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    let {buildingNumber, floorNumber} = useParams()

    useEffect(() => {

        setIsLoading(true)
        const unsub = onSnapshot(collection(db, "buildings", buildingNumber, "floors", floorNumber, "doors" ),(snapshot) => {
            setDoors(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
            setIsLoading(false)
        })


        return unsub;
    },[floorNumber])


    async function countJews() {
        const querySnapshot = await getDocs(query(collection(db, "buildings", buildingNumber, "floors", floorNumber, 'doors'), where("jewish", "==", "jewish")));

        const docRef = doc(db, "buildings", buildingNumber, "floors", floorNumber)
        const payload = {jewsCount: querySnapshot.size}
        updateDoc(docRef, payload)
    }
    


    let doorAray = [];
    for(let door in doors){
        doorAray.push(
            <Door buildingNumber={buildingNumber} floorNumber={floorNumber} key={door} door={door} doorObj={doors[door]} countJews={countJews}/>
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
                        <Button  className='btn-light btn-sm border border-secondary d-flex align-items-center' onClick={() => navigate(`/buildings/${buildingNumber}`)}>
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
                        {isLoading && <div className="container text-center my-4"><h3>Loading...</h3></div>}
                        {doorAray}
                    </Row>

                    <div className='d-grid d-lg-none'>
                        <NextFloorBtn buildingNumber={buildingNumber} floorNumber={floorNumber}/>
                    </div>
                </Container>  
            </Container>
        </section>
    )
}

export default Floor