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

        const regExp = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
        if((!regExp.test(mail)) || (mail === '' || password === '' || password2 === '') || (password !== password2)) return;

        try {
            await createUserWithEmailAndPassword(auth, mail, password)
            navigate('/');
        } catch(e: unknown) {
            const error = e as {code: string, message: string}
            const errString = error.message.split('/')[1].replace(')', '').replace('-', ' ')
            console.log(errString.charAt(0).toUpperCase() + errString.substring(1))
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
        </>
    )
}

export default SignUp