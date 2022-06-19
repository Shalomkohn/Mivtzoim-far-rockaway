
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from "../firebase";
import worried from '../images/worried.png'
import verify from '../images/verify.png'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import React from 'react'


const Buildings = ({ buildings, isLoading }) => {
    const [message, setMessage] = useState(null);
    const emailToAddRef = useRef()
    const currentUser = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(isLoading){
            setMessage(<div className="container text-center"><h3>Loading...</h3></div>)
        }else if(!currentUser){
            setMessage(
                <div style={{height: '100vh'}}>
                    <div className="container text-center">
                        <h1 className="text-center">oh...<br/> you have to log in</h1>
                        <img className='w-50'  style={{maxWidth: '200px'}} src={worried}></img>
                    </div>
                </div>
            )
        }else if(currentUser){
            setMessage(
                <div style={{height: '100vh'}}>
                    <div className="container text-center">
                        <h1 className="text-center my-3">please contact the admin</h1>
                        <img className='w-50 my-3' style={{maxWidth: '200px'}} src={verify}></img>
                        <h1 className="text-center my-3">we just have to verify your account</h1>
                    </div>
                </div>
            )
        }
    },[isLoading, currentUser])
    
    let mapedBuildings = [];
    buildings.map((building, index) => {
        mapedBuildings.push(
            <Col key={index} xs={12} md={6}>
                <div className="card my-3 mx-lg-5 my-lg-4 text-white bg-primary">
                    <div className="card-body d-flex justify-content-between align-items-center">
                        <h5 className="card-title fontRegular m-0">{building.address}</h5>
                        <a onClick={()=> navigate(`/buildings/${building.id}`)} className="btn btn-light text-secondary">Select</a>
                    </div>
                </div>
            </Col>);       
    })
    

    return(
        <div className="container p-3 vh-100">
            <Row>
                { buildings.length === 0 ? message : mapedBuildings }
            </Row>
        </div>
    )
}

export default Buildings