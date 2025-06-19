import { Helmet } from "react-helmet-async";
import { Header, Title, HeaderContainer } from '../elements/Header';
import Button from "../elements/Button";
import { Form, Input, ButtonContainer } from '../elements/FormElements';
import login from '../../src/assets/images/login.svg'
import styled from "styled-components";

const Svg = styled.img`
    width: fit-content;
    max-height: 8.25rem;
    margin: 0 auto;
`

function Login() {

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>

            <Header>
                <HeaderContainer>
                    <Title>Login</Title>
                    <div>
                        <Button to="/sign-up">Sign up</Button>
                    </div>
                </HeaderContainer>
            </Header>

            <Svg src={login} alt="" />

            <Form>
                <Input type="email" name="email" placeholder="Email" />
                <Input type="password" name="password" placeholder="Password" />
                <ButtonContainer>
                    <Button as="button" to="/" $primary type="submit">Login</Button>
                </ButtonContainer>
            </Form>
        </>
    )
}

export default Login