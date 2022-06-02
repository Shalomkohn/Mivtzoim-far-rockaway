
import { queryHelpers } from "@testing-library/react"
import { useNavigate } from 'react-router-dom';
import React from 'react'




const Buildings = (props) => {


    const navigate = useNavigate();

    let jay = []
    for (let building in props.buildings){
        jay.push(
            <div key={building} className="card bg-primary text-white text-center building-card col-sm-6 m-auto my-4">
                <div className="card-body">
                    <h5 className="card-title">{props.buildings[building].address}</h5>
                    <a onClick={()=> {
                        navigate(`/buildings/${building}`);
                    }} className="btn btn-light">Select</a>
                </div>
            </div>);
    }

    return(
        <div style={{height: "100vh"}}>
            {jay}
        </div>
    )
}

export default Buildings