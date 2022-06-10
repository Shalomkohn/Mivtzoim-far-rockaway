import { signup, useAuth, login } from "../firebase";
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button';



export const LogInPage = ({ getBuildings }) => {
    const [loading, setLoading] = useState(false)
    const [errorMessageVisible, setErrorMessageVisible] = useState('none')
    const navigate = useNavigate()
    const emailRef = useRef();
    const passwordRef = useRef();
    const currentUser = useAuth();
 
    async function handleLogin(){
        setLoading(true)
        setErrorMessageVisible('none')
        try {
          await login(emailRef.current.value, passwordRef.current.value)
          getBuildings()
          navigate(`/`)
        }
        catch {
          setErrorMessageVisible('visible')
        }
        setLoading(false)
      }
  


    return (
        <div className="container p-4 vh-100" style={{maxWidth: '500px'}}>      
            <Form>
                <h3 className="mb-3">Log in with your account</h3>
                    <div bg="light" className={`my-2 mx-auto px-2 pt-1 text-center border border-primary text-primary w-75 rounded d-${errorMessageVisible}`}>
                        <p>We can't log in to your account,</p>
                        <p>Please make sure you entered the currect email and password.</p>
                    </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" onClick={handleLogin} disabled={loading || currentUser}>
                    Log In
                </Button>
                <h3 className="mt-5">First time using Meevo?</h3>
                <Button variant="secondary" onClick={()=> navigate('/create-account')} disabled={loading || currentUser}>
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}

export const CreateAccountPage = ({ getBuildings}) => {
    const [loading, setLoading] = useState(false)
    const [passwordMessage, setPasswordMessage] = useState('')
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('')
    const navigate = useNavigate()
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const currentUser = useAuth();

    async function handleSignUp(){
        setLoading(true)
        if(passwordRef.current.value.length < 8 ){
            setPasswordMessage('password must be at least 8 characters')
            setLoading(false)
            return
        }else {
            setPasswordMessage(null)
        }
        if(passwordRef.current.value != confirmPasswordRef.current.value){
            setConfirmPasswordMessage("your passwords don't match")
            setLoading(false)
            return
        }else {
            setConfirmPasswordMessage(null)
        }
        try {
          await signup(emailRef.current.value, passwordRef.current.value)
          navigate(`/`)
        }
        catch {
            alert('error signing up')
        }
        setLoading(false)
      }


    return (
        <div className="container p-3 vh-100" style={{maxWidth: '500px'}}>      
            <Form>
                <h3 className="mb-3">Create your account</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" />
                    <p className="text-danger">{passwordMessage}</p>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control ref={confirmPasswordRef} type="password" placeholder="Password" />
                    <p className="text-danger">{confirmPasswordMessage}</p>
                </Form.Group>
                <Button variant="primary" onClick={handleSignUp} disabled={loading || currentUser}>
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}
