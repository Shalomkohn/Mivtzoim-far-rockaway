
import {Link, useNavigate} from 'react-router-dom'
import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { useAuth, logout} from "../firebase";
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [loading, setLoading] = useState(false)
    const [adminIsSignedIn, setAdminIsSignedIn] = useState(false)
    const currentUser = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(!currentUser){
            return
        } 
        if(currentUser.email == 'sbk5775@gmail.com'){
            setAdminIsSignedIn(true)
        }
        if(currentUser.email == 'chezykohn@gmail.com'){
            setAdminIsSignedIn(true)
        }
    },[currentUser])

    //Log Out
    async function handleLogOut(){
        setLoading(true)
        try {
          await logout()
          navigate('/')
          document.location.reload()
        } catch {
            alert('Error logging out')
        }
        setLoading(false)
      }
    
    return (
        <>
            <nav className="navbar navbar-light bg-light fixed-top border-bottom border-secondary p-0">
                <div className="container">
                    <Link className="navbar-brand" to="/"><span style={{fontFamily: 'georgia'}}>M</span>eevo</Link>
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                           {currentUser ? 
                                <DropdownButton className='fontRegular' variant="light" id="dropdown-basic-button" title={currentUser.email}>
                                    <Dropdown.Item onClick={handleLogOut} disabled={loading || !currentUser }>
                                        Log Out
                                    </Dropdown.Item>
                                </DropdownButton>
                            : <Link className='nav-link' to="/sign-in">Log In</Link>} 
                        </li>
                    </ul>
                    {adminIsSignedIn && <Link to={"/verify-user"} className="btn btn-small p-0 me-2 text-secondary">verify</Link>}
                    <span className="navbar-text">
                        בס״ד
                    </span>
                </div>
            </nav>

            {/* to push down */}
            <nav className="navbar border-bottom border-light p-0">
                <div className="container">
                    <a className="navbar-brand text-light" href="#">Meevo</a>
                    <span className="navbar-text text-light">
                        בס״ד
                    </span>
                </div>
            </nav>
        </>
    )
}

export default Navbar