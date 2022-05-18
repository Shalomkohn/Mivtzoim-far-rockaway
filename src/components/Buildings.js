
import { queryHelpers } from "@testing-library/react"
import { useNavigate } from 'react-router-dom';



const Buildings = (props) => {


    const navigate = useNavigate();


    let jay = []
    let i = 100
    for (let building in props.updBuildings){
        jay.push(
            <div key={i} className="card bg-primary text-white text-center building-card col-sm-6 m-auto my-4">
                <div className="card-body">
                    <h5 className="card-title">{props.updBuildings[building].address}</h5>
                    <a onClick={()=> {
                        props.determineBuilding(building);
                        navigate(`/floors`);
                    }} className="btn btn-light">Select</a>
                </div>
            </div>);
        i++
    }

    return(
        <>
            {jay}
        </>
    )
}

export default Buildings