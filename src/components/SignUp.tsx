import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header, Title, HeaderContainer } from '../elements/Header';
import Button from "../elements/Button";
import { Form, Input, ButtonContainer } from '../elements/FormElements';
import signUp from '../../src/assets/images/signup.svg'
import styled from "styled-components";
import { auth } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Alert from "../elements/Alert";

const Svg = styled.img`
    width: 100%auto;
    max-height: 6.25rem;
    margin-bottom: 1.25rem;
`

function SignUp() {
    const navigate = useNavigate()
    const [mail, changeMail] = useState('');
    const [password, changePassword] = useState('');
    const [password2, changePassword2] = useState('');
    const [alertStatus, changeAlertStatus] = useState(false);
    const [alert, changeAlert] = useState('');
    const [alertType, changeAlertType] = useState('error');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch(e.target.name){
            case 'email':
                changeMail(e.target.value);
                break;
            case 'password':
                changePassword(e.target.value);
                break;
            case 'password2':
                changePassword2(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        changeAlertStatus(false);
        changeAlert('');

        const regExp = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if((!regExp.test(mail)) || (mail === '' || password === '' || password2 === '') || (password !== password2)) {
            changeAlertStatus(true);
            changeAlert('Please check the email and if passwords are equal.')
            return
        }

        try {
            await createUserWithEmailAndPassword(auth, mail, password)
            changeAlertStatus(true)
            changeAlert('User successfully created.')
            changeAlertType('success')

            // Wait for the alert to show up
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch(e: unknown) {
            console.log(e);
            
            changeAlertStatus(true);
            const error = e as {code: string, message: string}
            const errString = error.message.split('/')[1].replace(')', '').replace(/-/g, ' ')
            changeAlert(errString.charAt(0).toUpperCase() + errString.substring(1))
        } 
        
    }


    return (
        <>
            <Helmet>
                <title>Sign Up</title>
            </Helmet>

            <Header>
                <HeaderContainer>
                    <Title>Sign Up</Title>
                    <div>
                        <Button to="/login">Login</Button>
                    </div>
                </HeaderContainer>
            </Header>

            <Svg src={signUp} alt="" />

            <Form onSubmit={handleSubmit}>
                <Input type="email" name="email" placeholder="Email" value={mail} onChange={handleChange} />
                <Input type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
                <Input type="password" name="password2" placeholder="Repeat password" value={password2} onChange={handleChange} />
                <ButtonContainer>
                    <Button as="button" to="/" $primary type="submit">Sign Up</Button>
                </ButtonContainer>
            </Form>

            <Alert $type={alertType} $message={alert} $alertStatus={alertStatus} $changeAlertStatus={changeAlertStatus} />
        </>
    )
}

export default SignUp