
import { useEffect, useState } from "react";
import ListGroup  from "react-bootstrap/ListGroup"
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftShort } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import React from 'react'
import db from "../firebase"
import { collection, orderBy, query, getDocs} from "firebase/firestore";


const Floors = (props) => {
    let {buildingNumber} = useParams()
    const navigate = useNavigate();
    const [floors, setFloors] = useState([])
    const [address, setAddress] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
        getFloors()
    },[])
    
    const getFloors = async () => {    
        setIsLoading(true)
        let floorArray = []
        const querySnapshot = await getDocs(query(collection(db, "buildings", buildingNumber, "floors"), orderBy("floorNumber","asc")));
        querySnapshot.forEach((doc) => floorArray.push(doc.data()));
        
        setIsLoading(false)
        setFloors(floorArray)
        setAddress(floorArray[0].address)
    }
    

    
    let jay = []
    floors.map((floor, index) => {

        jay.unshift(<ListGroup.Item onClick={()=> {navigate(`floors/${floor.floorNumber}`)}} key={floor.floorNumber} className="d-flex justify-content-between">
                {floor.name}
                {floor.jewsCount != 0 && <div className="btn btn-sm py-0 fw-light text-secondary">{floor.jewsCount + ' ' + 'Jews'}</div>}
            </ListGroup.Item>
        );
    })

    // const add = (data) => {
    //     const docRef = doc(db, "buildings", buildingNumber, "floors", '1')
    //     const payload = {name: "Floor 1", floorNumber: 1, jewsCount: 0}
    //     setDoc(docRef, payload)
    // }
    

    return (
        <div className="container py-4" style={{minHeight: '100vh'}}>

            {
                isLoading ? 
                <div className="container text-center mt-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                : 
                <div className="w-75 mx-auto" style={{maxWidth: "600px"}}>
                    <div className="fw-normal fs-3 text-center bg-light d-flex justify-content-between">
                        <Button className="d-flex align-items-center btn-light btn-sm border shadow-sm" onClick={()=>  navigate('/')}>
                            <ArrowLeftShort size={25} /> 
                        </Button>
                        <div>{address}</div>
                    </div>
                    <ListGroup className="mt-3 shadow-sm">
                        <div>
                            {jay}
                        </div>    
                    </ListGroup>
                </div>
            }
           
        </div>      
    )
}

export default Floors
