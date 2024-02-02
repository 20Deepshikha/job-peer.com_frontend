import './signup.css'
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import api from '../../config/axios'
import { useNavigate } from 'react-router-dom';
import Particles from "react-tsparticles";
import particlesConfig from '../particles/particlesConfig.json'; 

function Signup() {

    const [status, setStatus] = useState(null);
    const [name, setName]= useState();
    const [email, setEmail]= useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const navigate = useNavigate()

    async function HandleSubmit(e){
        e.preventDefault();
        setStatus(null);
        let userInfo = {
            'username' : username,
            'name' : name,
            'email' : email,
            'password' : password,
        }
        console.log(userInfo)
        try{
            const createUser = await api.post('/register', userInfo);
            console.log('user created successfully, Status: ', createUser.status);
            setStatus(true);
            console.log(status);
            navigate('/login');
        }catch(error){
            setStatus(false);
            console.log('error: ',error)
        }
    }

    return (
        <div className='main'>
            <Particles options={particlesConfig} className="particles" />
            <h1>Signup</h1>
            <Form className='main-container' onSubmit={HandleSubmit}>
                <Row className="row-container">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="First name   Last name" 
                        onChange={(e)=>{
                            setName(e.target.value);
                        }}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type="email" 
                        placeholder="email@mail.com" 
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}/>
                    </Form.Group>
                </Row>

                <Row className="row-container">
                    {<Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label className={status === false ? 'error-label' : ''}>Username</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="username" 
                        className={status === false ? 'error-control' : ''}
                        onChange={(e)=>{
                            setUsername(e.target.value)
                        }}/>
                        {status === false && (
                            <div className='error-message'>
                                Username already exists! Please choose another username
                            </div>
                        )}
                    </Form.Group>}

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type="password" 
                        placeholder="password" 
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}/>
                    </Form.Group>
                </Row>
                <Button 
                className='submit-btn' 
                type='submit'>
                    Sign Up
                </Button>
            </Form>
        </div>
    )
}

export default Signup;