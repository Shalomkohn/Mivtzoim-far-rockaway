
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ArrowDownShort } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';



function NextFloorBtn(props) {
    const navigate = useNavigate();
  if(props.floorNumber <= 1) return <div className='mb-2'>You finished, Congradulations!</div>
  return (
      <Button className='d-flex justify-content-center align-items-center btn-light border border-secondary btn-sm' onClick={()=> {
          navigate(`/buildings/${props.buildingNumber}/floors/${props.floorNumber - 1}`);
          window.scrollTo(0, 0);
      }}>
        <div>Next Floor</div>
        <ArrowDownShort className='ms-3' size={25}/>
      </Button>  
  )
}

export default NextFloorBtn