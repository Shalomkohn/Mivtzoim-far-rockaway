

import ListGroup  from "react-bootstrap/ListGroup"
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';




const Floors = (props) => {
    const navigate = useNavigate();


    let jay = []
    let i = 1
    for (let floor in props.updBuildings[props.buildingVar].floors){
        jay.unshift(<ListGroup.Item onClick={()=> {
            props.determineFloor(floor);
            navigate(`/floor`);
        }} key={i}>{props.updBuildings[props.buildingVar].floors[floor].name}</ListGroup.Item>);
        i++
    }

    return (
        <div className="container mt-3">
            <Button onClick={()=> navigate('/')}>
                <ArrowLeft size={25}/> Buildings
            </Button>
            <ListGroup className="pt-5">
                <ListGroup.Item className="display-5 text-center">{props.updBuildings[props.buildingVar].address}</ListGroup.Item>
                <div>
                    {jay}
                </div>    
            </ListGroup>
        </div>      
    )
}

export default Floors
