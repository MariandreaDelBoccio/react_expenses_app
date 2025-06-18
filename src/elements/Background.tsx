import styled from "styled-components";
import puntos from '../assets/images/puntos.svg'; 

const Svg = styled.svg`
    height: 50vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 0;
    path {
        fill: rgba(135,182,194, .15);
    }
`;

const PuntosImg = styled.img`
  position: fixed;
  z-index: 1;
  width: auto;
  height: auto;
`;

const PuntosArriba = styled(PuntosImg)`
  top: 2.5rem;
  left: 2.5rem;
`;

const PuntosAbajo = styled(PuntosImg)`
  bottom: 2.5rem;
  right: 2.5rem;
`;

const Background = () => (
  <>
    <PuntosArriba src={puntos} alt="" />
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path 
            fillOpacity="1" 
            d="M0,32L60,64C120,96,240,160,360,192C480,224,600,224,720,186.7C840,149,960,75,1080,58.7C1200,43,1320,85,1380,106.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
    </Svg>
    <PuntosAbajo src={puntos} alt="" />
  </>
);

export default Background;
