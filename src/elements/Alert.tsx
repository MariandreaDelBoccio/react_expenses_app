import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import theme from "../theme";
import type { AlertComponentProps } from "../types/types";

const slideDown = keyframes`
    0% {
        transform: translateY(-1.25rem); /* 20px */
        opacity: 0;
    }
 
    10% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
    
    90% {
        transform: translateY(1.25rem);
        opacity: 1;
    }
 
    100% {
        transform: translateY(1.25rem);
        opacity: 0;
    }
`;
 
const AlertContainer = styled.div<{$type: string}>`
    z-index: 1000;
    width: 100%;
    left: 0;
    top: 1.25rem; /* 20px */
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${slideDown} 4s ease forwards;
 
    p {
        background: ${(props) => {
            if(props.$type === 'error'){
                return theme.rojo;
            } else if (props.$type === 'success') {
                return theme.verde;
            } else {
                return '#000';
            }
        }};
        color: #fff;
        padding: 1.25rem 2.5rem; /* 20px 40px */
        border-radius: 0.31rem; /* 5px */
        box-shadow: 0px 0px 15px rgba(0,0,0,.1);
        text-align: center;
    }
`;

const Alert = ({$type, $message, $alertStatus, $changeAlertStatus}: AlertComponentProps) => {
	useEffect(() => {
		let time: ReturnType<typeof setTimeout>;;

		if($alertStatus === true){
			time = setTimeout(() => {
				$changeAlertStatus(false);
			}, 4000);
		}

		return(() => clearTimeout(time));
        // Execute only when alert status changes
	}, [$alertStatus, $changeAlertStatus]);

	return (
		<>
			{$alertStatus &&
				<AlertContainer $type={$type}>
					<p>{$message}</p>
				</AlertContainer>
			}
		</>
	);
}
 
export default Alert;
