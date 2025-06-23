import { Helmet } from "react-helmet-async";
import { Header, Title } from "../elements/Header";
import BackBtn from "../elements/BackBtn";
import TotalBar from "./totalBar";

function CategoryExpenses() {

    return (
        <>
            <Helmet>
                <title>Category expenses</title>
                <link rel="icon" type="image/x-icon" href='../public/favicon.ico' />
            </Helmet>
            <Header>
                <BackBtn />
                <Title>Category expenses</Title>
            </Header>

            <TotalBar />
        </>
    )
}

export default CategoryExpenses