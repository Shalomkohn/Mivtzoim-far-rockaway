
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar';
import Buildings from './components/Buildings';
import Floors from './components/Floors';
import Floor from './components/Floor';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ErrorPage from './components/ErrorPage';
import { useState, useEffect} from 'react'
import React from 'react'
import db from "./firebase"
import { collection, onSnapshot} from "firebase/firestore";
import { LogInPage, CreateAccountPage } from './components/LogInPage';

  
  function App() {
    const [buildings, setBuildings] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      getBuildings()
    },[])

    const getBuildings = () => {
      setIsLoading(true)
      const unsub = onSnapshot(collection(db, "buildings"),(snapshot) => {
          setBuildings(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
      },
      (error) => {
        setIsLoading(false)
      })
      return unsub;
    }
    
  return (
    <div className="App bg-light">
      <Router>
        <Navbar/>
            <Routes>
              <Route path='/' element={<Buildings isLoading={isLoading} buildings={buildings}/>}/>
              <Route path='/sign-in' element={<LogInPage getBuildings={getBuildings}/>}/>
              <Route path='/create-account' element={<CreateAccountPage />}/>
              <Route path='/buildings/:buildingNumber' element={<Floors buildings={buildings}/>}/>
              <Route path='/buildings/:buildingNumber/floors/:floorNumber' element={<Floor/>}/>  
              <Route path='*' element={<ErrorPage/>}/>
            </Routes>
      </Router>
    </div>
  );
}

export default App;
