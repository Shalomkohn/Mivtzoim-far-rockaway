
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from "../firebase";
import { GeoAlt } from 'react-bootstrap-icons';
import worried from '../images/worried.png';
import verify from '../images/verify.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';



const Buildings = ({ buildings, isLoading }) => {
    const [message, setMessage] = useState(null);
    const emailToAddRef = useRef()
    const currentUser = useAuth();
    const navigate = useNavigate();
    let buildingPic;
    
    useEffect(() => {
        if(isLoading){
            setMessage(<div className="container text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
            )
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
            <Col key={index} md={6} xl={4}>
                <div className="card my-3 mx-lg-5 my-lg-4 text-white  overflow-hidden shadow border-white mx-auto" style={{width: '320px'}}>
                    <div className="card-body d-flex justify-content-between align-items-center p-0" style={{height: '60px', cursor: 'pointer'}}>
                        <img src={building.picture} alt="a building"  className="h-100" onClick={()=> navigate(`/buildings/${building.id}`)}/>
                        <h5 className="card-title text-secondary fontRegular fs-6 m-0 flex-fill align-self-stretch d-flex align-items-center justify-content-center" onClick={()=> navigate(`/buildings/${building.id}`)}>{building.address}</h5>
                        <a className='d-flex align-items-center justify-content-center text-decoration-none text-dark border-start h-100'  style={{width: '60px'}} href={building.addressLink}>
                            <GeoAlt className='fs-1 shadow-effect'/>
                        </a>
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