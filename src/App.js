
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'
import Navbar from './components/Navbar';
import Buildings from './components/Buildings';
import Floors from './components/Floors';
import Floor from './components/Floor';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useParams} from 'react-router-dom'
import ErrorPage from './components/ErrorPage';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, ChangeEvent} from 'react'
import Container from 'react-bootstrap/Container'
import React from 'react'
import db from "./firebase"
import { collection, onSnapshot, addDoc, doc, setDoc, deleteDoc} from "firebase/firestore";

  
  function App() {
    const [buildings, setBuildings] = useState([])

    useEffect(() => {
      const unsub = onSnapshot(collection(db, "buildings"),(snapshot) => {setBuildings(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))})
      
      return unsub;
    },[])


  return (
    <div className="App bg-light">
      <Router>
        <Navbar/>
        <Container className='p-3'>
            <Routes>
              <Route path='/' element={<Buildings buildings={buildings}/>}/>
              <Route path='/buildings/:buildingNumber' element={<Floors buildings={buildings}/>}/>
              <Route path='/buildings/:buildingNumber/floors/:floorNumber' element={<Floor/>}/>  
              <Route path='*' element={<ErrorPage/>}/>
            </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
