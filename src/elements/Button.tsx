import styled from "styled-components";
import { Link } from 'react-router-dom';
import type { ButtonProps } from "../types/types";

const Button = styled(Link)<ButtonProps>`
    background: ${(props) => props.$primary ? '#5B69E2' : '#000'};
    width: ${(props) => props.$hasIcon ? 'fit-content' : 'auto'}; /* 250px */
    border: none;
    border-radius: 0.625rem; /* 10px */
    color: #fff;
    font-family: 'Work Sans', sans-serif;
    height: 3.75rem; /* 60px */
    padding: 1.25rem 1.87rem; /* 20px 30px */
    font-size: 1.25rem; /* 20px */
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    outline: none;
    margin: 5px;
 
    svg {
        height: ${(props) => props.$bigIcon ? '100%' : '0.75rem;'};  /* 12px */
        fill: white;
    }
`;

export default Button;
