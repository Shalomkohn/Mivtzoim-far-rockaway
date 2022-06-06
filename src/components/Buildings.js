
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../firebase";

import React from 'react'



const Buildings = ({ buildings }) => {
    const currentUser = useAuth()
    const navigate = useNavigate();

    let jay = [];
    buildings.map((building, index) => {
        jay.push(
            <div key={index} className="card bg-primary text-white text-center building-card col-sm-6 m-auto my-4">
                <div className="card-body">
                    <h5 className="card-title">{building.address}</h5>
                    <a onClick={()=> {
                        navigate(`/buildings/${building.id}`);
                    }} className="btn btn-light">Select</a>
                </div>
            </div>);
    })

    const message = currentUser ? <h1 className="text-center">your account is not yet varified</h1> : <h1 className="text-center">Please Log In</h1>;

    return(
        <div className="container pb-3">
            { buildings.length === 0 ? message : jay }
        </div>
    )
}

export default Buildings