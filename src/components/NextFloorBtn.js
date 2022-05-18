
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowDown } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';



function NextFloorBtn(props) {
    const navigate = useNavigate();
  if(props.floor == 'floor1') return <div className='mb-2'>You finished, Congradulations!</div>
  return (
    <div className="d-grid">
      <Button variant="primary" size="lg" onClick={()=> {
          props.nextFloor();
          // navigate('/floor');
      }}>
          Next Floor<ArrowDown className='ms-3' size={25}/>
      </Button>  
    </div>     
  )
}

export default NextFloorBtn