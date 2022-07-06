import styled from 'styled-components';

const Input = styled.input`
display: flex;
flex-direction: column;
align-items: flex-start;
padding: 12px 16px;
gap: 10px;
position: relative;
width: 300px;
height: 30px;
left: 30px;
top: 20px;
background: #FFFFFF;
border: 1px solid #3D495C;
border-radius: 6px;
`;

const Button = styled.button`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 32px;
gap: 10px;
position: relative;
width: 104px;
height: 45px;
left: 406px;
top: -27px;
background: #003BE5;
color: #FFFFFF;
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
flex-wrap: wrap;
`;

const Card = styled.div`
width: 200px;
height: 230px;
background: #023031;
border: 0px solid rgba(0, 0, 0, 0.4);
border-radius: 10px;
margin-top: 30px;
justify-content: center;
align-items: center;
text-align: center;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
transition: 0.3s;
a {
  color: white;
  text-decoration: none;
}
overflow: hidden;

:hover {
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.4);
}
`;

export { Input, Button, Wrapper, Card };
