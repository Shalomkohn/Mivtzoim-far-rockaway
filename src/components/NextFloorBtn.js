
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowDown } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';



function NextFloorBtn(props) {
    const navigate = useNavigate();
  if(props.floorNumber <= 1) return <div className='mb-2'>You finished, Congradulations!</div>
  return (
    <div className="d-grid">
      <Button variant="primary" size="lg" onClick={()=> {
          navigate(`/buildings/${props.buildingNumber}/floors/${props.floorNumber - 1}`);
          window.scrollTo(0, 0);
      }}>
          Next Floor<ArrowDown className='ms-3' size={25}/>
      </Button>  
    </div>     
  )
}

export default NextFloorBtn