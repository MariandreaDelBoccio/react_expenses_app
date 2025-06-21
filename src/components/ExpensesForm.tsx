import { useState } from "react";
import { Input, ButtonContainer, BigInput, FilterContainer, Form } from "../elements/FormElements";
import Button from "../elements/Button";
import PlusIcon from '../assets/images/plus.svg?react'
import CategoriesSelect from "./CategoriesSelect";

const ExpensesForm = () => {
    const [descInput, changeDescInput] = useState('');
    const [valueInput, changeValueInput] = useState('');
    const [category, changeCategory] = useState('home');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === 'description') {
            changeDescInput(e.target.value)
        } else {
            changeValueInput(e.target.value)
        }
    }

    return (
        <Form>
            <FilterContainer>
                <CategoriesSelect category={category} changeCategory={changeCategory}  />
                <p>Date picker</p>
            </FilterContainer>

            <div>
                <Input
                    type="text"
                    name="description"
                    id="description"
                    placeholder="Description"
                    value={descInput}
                    onChange={handleChange}
                />
                <BigInput 
                    type="number"
                    name="value"
                    id="value"
                    placeholder="0.00€"
                    value={valueInput}
                    onChange={handleChange}
                />
            </div>
            <ButtonContainer>
                <Button as="button" to="#" $primary $hasIcon type="submit">
                    Add
                    <PlusIcon />
                </Button>
            </ButtonContainer>
        </Form>
    )
}

export default ExpensesForm