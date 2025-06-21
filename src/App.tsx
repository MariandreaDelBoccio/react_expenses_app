import { Helmet } from "react-helmet-async";
import { Header, Title, HeaderContainer, ButtonContainer } from "./elements/Header";
import Button from "./elements/Button";
import LogoutButton from "./elements/LogoutBtn";
import ExpensesForm from "./components/ExpensesForm";

function App() {

  return (
    <>
      <Helmet>
        <title>Add expenses</title>
        <link rel="icon" type="image/x-icon" href='../public/favicon.ico' />
      </Helmet>
      <Header>
        <HeaderContainer>
          <Title>Add expenses</Title>
          <ButtonContainer>
            <Button to="/categories">Categories</Button>
            <Button to="/list">Expenses list</Button>
            <LogoutButton />

          </ButtonContainer>
        </HeaderContainer>
      </Header>

      <ExpensesForm />
    </>
  )
}

export default App
