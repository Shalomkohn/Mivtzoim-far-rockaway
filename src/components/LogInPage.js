import { signup, useAuth, login } from "../firebase";
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';



export const LogInPage = ({ getBuildings }) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const emailRef = useRef();
    const passwordRef = useRef();
    const currentUser = useAuth();
 
    async function handleLogin(){
        setLoading(true)
        try {
          await login(emailRef.current.value, passwordRef.current.value)
          getBuildings()
          navigate(`/`)
        }
        catch {
          alert('error logging in')
        }
        setLoading(false)
      }
  


    return (
        <div style={{height: '100vh'}}>      
            <Form>
                <h3 className="mb-3">Log in with your account</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" onClick={handleLogin} disabled={loading || currentUser}>
                    Log In
                </Button>
                <h3 className="mt-5">Don't have an account?</h3>
                <Button variant="primary" onClick={()=> navigate('/create-account')} disabled={loading || currentUser}>
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}

export const CreateAccountPage = ({ getBuildings }) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const currentUser = useAuth();

    async function handleSignUp(){
        if(passwordRef.current.value != confirmPasswordRef.current.value){
            alert("passwords don't match")
            return
        }
        setLoading(true)
        try {
          await signup(emailRef.current.value, passwordRef.current.value)
          //getBuildings()
          navigate(`/`)
        }
        catch {
          alert('error signing up')
        }
        setLoading(false)
      }


    return (
        <div style={{height: '100vh'}}>      
            <Form>
                <h3 className="mb-3">Create your account</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control ref={confirmPasswordRef} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" onClick={handleSignUp} disabled={loading || currentUser}>
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}
