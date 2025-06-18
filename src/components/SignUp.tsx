import { Helmet } from "react-helmet-async";
import { Header, Title, HeaderContainer } from '../elements/Header';
import Button from "../elements/Button";
import { Form, Input, ButtonContainer } from '../elements/FormElements';
import signUp from '../../src/assets/images/signup.svg'
import styled from "styled-components";

const Svg = styled.img`
    width: 100%auto;
    max-height: 6.25rem;
    margin-bottom: 1.25rem;
`

function SignUp() {

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

            <Form>
                <Input type="email" name="email" placeholder="Email" />
                <Input type="password" name="password" placeholder="Password" />
                <Input type="password" name="password2" placeholder="Repeat password" />
                <ButtonContainer>
                    <Button as="button" to="/" $primary type="submit">Sign Up</Button>
                </ButtonContainer>
            </Form>
        </>
    )
}

export default SignUp