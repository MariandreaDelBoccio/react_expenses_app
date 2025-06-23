import { Helmet } from "react-helmet-async";
import { Header, Title } from "../elements/Header";
import BackBtn from "../elements/BackBtn";
import TotalBar from "./totalBar";

function ExpensesList() {
    return (
        <>
            <Helmet>
                <title>Expenses list</title>
                <link rel="icon" type="image/x-icon" href='../public/favicon.ico' />
            </Helmet>
            <Header>
                <BackBtn />
                <Title>Expenses list</Title>
            </Header>

            <TotalBar />
        </>
    )
}

export default ExpensesList