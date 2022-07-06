import styled from 'styled-components';

const Input = styled.input`
display: flex;
flex-direction: column;
position: absolute;
align-items: flex-start;
gap: 10px;
text-align: left;
width: 519px;
height: 45px;
left: 184px;
top: 125px;
background: #FFFFFF;
border: 1px solid #E1E5EB;
border-radius: 0px;
`;

const Div = styled.div`
position: relative;
width: 100%;
height: 334px;
left: 272px;
top: 101px;
background: #FAFAFA;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 10px;
`;

const Img = styled.img`
width: 200px;
height: 100px;
background: #023031;
border-bottom: 1px solid rgba(255, 255, 255, 0.4);
border-radius: 35px 35px 0px 0px;
position: relative;
left: 350px
`;

const Button = styled.button`
display: flex;
font-size: 20px;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 8px 32px;
gap: 10px;
width: 519px;
height: 40px;
left: 184px;
top: 197px;
background: #003BE5;
color: #FFFFFF;
position: absolute;
:disabled {
  background-color: #7F9C96;
}
:enabled {
  background-color: 003BE5;
}
`;

export { Input, Div, Button, Img };
