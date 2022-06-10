
import {Link, useNavigate} from 'react-router-dom'
import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { useAuth, logout} from "../firebase";
import { useState } from 'react';

const Navbar = () => {
    const [loading, setLoading] = useState(false)
    const currentUser = useAuth()
    const navigate = useNavigate()

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
            <nav className="navbar navbar-light bg-light fixed-top border-bottom border-primary ">
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
                    <span className="navbar-text">
                        בס״ד
                    </span>
                </div>
            </nav>

            {/* to push down */}
            <nav className="navbar border-bottom">
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