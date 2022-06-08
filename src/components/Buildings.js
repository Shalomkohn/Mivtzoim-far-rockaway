
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../firebase";
import worried from '../images/worried.png'
import verify from '../images/verify.png'

import React from 'react'



const Buildings = ({ buildings }) => {
    const currentUser = useAuth()
    const navigate = useNavigate();

    let jay = [];
    buildings.map((building, index) => {
        jay.push(
            <div key={index} className="card text-white text-center building-card col-sm-6 mx-2 my-5">
                <div className="card-body bgLightBlue d-flex justify-content-between align-items-center">
                    <h5 className="card-title fontRegular m-0">{building.address}</h5>
                    <a onClick={()=> navigate(`/buildings/${building.id}`)} className="btn btn-light text-secondary">Select</a>
                </div>
            </div>);
    })

    const message = currentUser ? 
    <div className="container text-center">
        <h1 className="text-center my-3">please contact the admin</h1>
        <img className='w-50 my-3' src={verify}></img>
        <h1 className="text-center my-3">we just have to verify your account</h1>
    </div>
     :
    <div className="container text-center">
        <h1 className="text-center">oh...<br/> you have to log in</h1>
        <img className='w-50' src={worried}></img>
    </div>

    return(
        <div className="container p-3">
            { buildings.length === 0 ? <div style={{height: '100vh'}}>{message}</div> : jay }
        </div>
    )
}

export default Buildings