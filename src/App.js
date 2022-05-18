
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'
import Navbar from './components/Navbar';
import Buildings from './components/Buildings';
import Floors from './components/Floors';
import Floor from './components/Floor';
import { BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom'
import ErrorPage from './components/ErrorPage';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, ChangeEvent} from 'react'
import Container from 'react-bootstrap/Container'

  
  function App() {
    const [building, setBuilding] = useState(0)
    const [floor, setFloor] = useState('')
    const [updBuildings, setUpdBuildings] = useState(
      {
        building1:{
          index: 0,
          address: '123 green rd',
          floors: {
            floor1: {
              name: 'Floor 1',
              doors:{
                doorA:{
                  name: "A",
                  jewish: 'Unknown'
                },
                doorB:{
                  name: "B",
                  jewish: 'Unknown'
                },
                doorC:{
                  name: "C",
                  jewish: 'Unknown'
                },
              },
            },
            floor2: {
              name: 'Floor 2',
              doors: {
                doorA:{
                  name: "A",
                  jewish: 'Unknown'
                },
                doorB:{
                  name: "B",
                  jewish: 'Unknown'
                },
                doorC:{
                  name: "C",
                  jewish: 'Unknown'
                }
             }
            },
            floor3: {
              name: 'Floor 3',
              doors: {
                doorA:{
                  name: "A",
                  jewish: 'Unknown'
                },
                doorB:{
                  name: "B",
                  jewish: 'Unknown'
                },
                doorC:{
                  name: "C",
                  jewish: 'Unknown'
                }
             }
            }
          }
        },
        building2: {
          index: 1,
          address: '456 blue street',
          floors: {
            floor1: {
              name: 'Floor 1',
              doors:{
                doorA:{
                  name: "A",
                  jewish: 'Unknown'
                },
                doorB:{
                  name: "B",
                  jewish: 'Unknown'
                },
                doorC:{
                  name: "C",
                  jewish: 'Unknown'
                },
              },
            },
            floor2: {
              name: 'Floor 2',
              doors: {
                doorA:{
                  name: "A",
                  jewish: 'Unknown'
                },
                doorB:{
                  name: "B",
                  jewish: 'Unknown'
                },
                doorC:{
                  name: "C",
                  jewish: 'Unknown'
                }
             }
            },
            floor3: {
              name: 'Floor 3',
              doors: {
                doorA:{
                  name: "A",
                  jewish: 'Unknown'
                },
                doorB:{
                  name: "B",
                  jewish: 'Unknown'
                },
                doorC:{
                  name: "C",
                  jewish: 'Unknown'
                }
             }
            },
            floor4: {
              name: 'Floor 4',
              doors: {
                doorA:{
                  name: "A",
                  jewish: 'Unknown'
                },
                doorB:{
                  name: "B",
                  jewish: 'Unknown'
                },
                doorC:{
                  name: "C",
                  jewish: 'Unknown'
                }
             }
            },
            floor5: {
              name: 'Floor 5',
              doors: {
                doorA:{
                  name: "A",
                  jewish: 'Unknown'
                },
                doorB:{
                  name: "B",
                  jewish: 'Unknown'
                },
                doorC:{
                  name: "C",
                  jewish: 'Unknown'
                }
             }
            }
          }
        }
      }
    )
    
    function determineBuilding(index){
      setBuilding(index)
    }
    
    function determineFloor(index){
      setFloor(index)
    }

    function updateJewish(door, isJewish){
      setUpdBuildings({...updBuildings,
          [building]: {
            ...updBuildings[building],
            floors: {
              ...updBuildings[building].floors,
              [floor]: {
                ...updBuildings[building].floors[floor],
                doors: {
                  ...updBuildings[building].floors[floor].doors,
                  [door]: {
                    ...updBuildings[building].floors[floor].doors[door],
                    jewish: isJewish
                  }
                }
              }
            } 
          }
        }
      )
    }

    

    let newFloor;
    function nextFloor(e){
      let lastLetter = e.slice(e.length - 1, e.length)
      let newLetter = parseInt(lastLetter) - 1;
      newFloor = e.slice(0, e.length - 1) + newLetter;
      determineFloor(newFloor);
    }

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Container className='p-3 bg-light'>
            <Routes>
              <Route path='/' element={<Buildings updBuildings={updBuildings} determineBuilding={determineBuilding}/>}/>
              <Route path='/floors' element={<Floors buildingVar={building} updBuildings={updBuildings} determineFloor={determineFloor}/>}/>
              <Route path='/floor' element={<Floor building={building} floor={floor}  updateJewish={updateJewish} updBuildings={updBuildings} nextFloor={nextFloor}/>}/>  
              <Route path='*' element={<ErrorPage/>}/>
            </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
