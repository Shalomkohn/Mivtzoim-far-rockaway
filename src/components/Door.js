
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import DropdownBotton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState, useEffect} from 'react';

const Door = ({door, doorObj, updateJewish}) => {
    const [color, setColor] = useState('bg-secondary')

    useEffect(()=>{if(doorObj.jewish == 'Jewish'){
                setColor('bg-success')
            }else if(doorObj.jewish == 'Unknown'){
                setColor('bg-secondary')
            }else if(doorObj.jewish == 'Not Jewish'){
                setColor('bg-danger')
            }}
    ,[doorObj])

    return (
        <Col xs={6} className="mb-4">
            <Card bg="light">
                <Card.Header><h1>{doorObj.name}</h1></Card.Header>
                <Card.Body  className={`${color} text-light`}>
                    <Card.Text>{doorObj.jewish}</Card.Text>
                    <DropdownBotton variant='light' key={doorObj.name} title='UPDATE'>
                        <Dropdown.Item onClick={()=> {
                                updateJewish(door ,'Not Jewish')
                            }} eventKey="1">Not Jewish</Dropdown.Item>
                        <Dropdown.Item onClick={()=> {
                                updateJewish(door,'Unknown')
                            }} eventKey="2">Unknown</Dropdown.Item>
                        <Dropdown.Item onClick={()=> {
                                updateJewish(door,'Jewish')
                            }} eventKey="3">Jewish</Dropdown.Item>
                    </DropdownBotton>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Door