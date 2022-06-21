
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
                {floor.jewsCount != 0 && <div style={{border: '1px solid rgb(100, 255, 0)', color: 'rgb(100, 255, 0)'}} className="btn btn-sm py-0">{floor.jewsCount}</div>}
            </ListGroup.Item>
        );
    })

    // const add = (data) => {
    //     const docRef = doc(db, "buildings", buildingNumber, "floors", '1')
    //     const payload = {name: "Floor 1", floorNumber: 1, jewsCount: 0}
    //     setDoc(docRef, payload)
    // }
    

    return (
        <div className="container py-3">
            <Button className="d-flex align-items-center" style={{backgroundColor: 'rgb(3, 165, 252)', border: 'none'}} onClick={()=>  navigate('/')}>
                <ArrowLeftShort size={25} /> 
                <div>Buildings</div>
            </Button>
            {
                isLoading ? <div className="container text-center mt-4"><h3>Loading...</h3></div>
                : 
                 <ListGroup className="pt-3 m-auto"  style={{maxWidth: "600px"}}>
                    <ListGroup.Item className="display-5 text-center bg-light">{address}</ListGroup.Item>
                    <div>
                        {jay}
                    </div>    
                </ListGroup>
            }
           
        </div>      
    )
}

export default Floors
