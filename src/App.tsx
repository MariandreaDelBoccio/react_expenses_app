import { Helmet } from "react-helmet-async";
import { Header, Title, HeaderContainer, ButtonContainer } from "./elements/Header";
import Button from "./elements/Button";
import LogoutButton from "./elements/LogoutBtn";

function App() {

  return (
    <>
      <Helmet>
        <title>Agregar gasto</title>
        <link rel="icon" type="image/x-icon" href='../public/favicon.ico' />
      </Helmet>
      <Header>
        <HeaderContainer>
          <Title>Agregar gasto</Title>
          <ButtonContainer>
            <Button to="/categories">Categorías</Button>
            <Button to="/list">Lista de gastos</Button>
            <LogoutButton />

          </ButtonContainer>
        </HeaderContainer>
      </Header>
    </>
  )
}

export default App
