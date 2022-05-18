
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Card from 'react-bootstrap/Card';
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { useNavigate } from 'react-router-dom';
import ToggleButton from "react-bootstrap/ToggleButton";
import { ArrowLeft, ArrowDown } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Door from './Door'
import NextFloorBtn from './NextFloorBtn';




const Floor = (props) => {
    const navigate = useNavigate()

    let jay = [];
    let i = 1;
    for(let door in props.updBuildings[props.building].floors[props.floor].doors){
        jay.push(
            <Door updBuildings={props.updBuildings} updateJewish={props.updateJewish} key={i} door={door} doorObj={props.updBuildings[props.building].floors[props.floor].doors[door]} />
        )
        i++
    }
    
    return (
        <section className='pt-4 bg-light'>
            <Container>
                <Button onClick={()=> navigate('/floors')}>
                    <ArrowLeft size={25}/> Floors
                </Button>
                <Container className="my-3 text-center">
                    <Card body className="display-4 my-4 bg-light">{props.updBuildings[props.building].floors[props.floor].name}</Card>
                    <Row>
                        {jay}
                    </Row>
                    <NextFloorBtn nextFloor={()=>props.nextFloor(props.floor)} updBuildings={props.updBuildings} floor={props.floor}/>
                </Container>  
            </Container>
        </section>
    )
}

export default Floor