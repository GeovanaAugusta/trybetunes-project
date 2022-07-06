import styled from 'styled-components';

const Form = styled.div`
   display: block;
   position: absolute;
   font-weigth: bold;
   align-items: center;
   justify-content: center;
`;

const DivGlobal = styled.div`
  display: flex;
  height: 90vh;
  width: 90vw;
  align-items: center;
  justify-content: center;
  background-color: #FFFFFF;
`;

const Divv = styled.div`
  width: 500px;
  height: 340px;
  border: 1px solid rgba(11, 47, 0);
  background: #FAFAFA;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #0e595b;
  border-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  form {
    input {
      border: 1px solid rgba(11, 47, 0);
      outline: none;
      width: 100%;
      height: 50%;
      margin-bottom: 14px;
      border-radius: 5px;
  }
    width: 80%;
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    button {
      margin-top: 35px;
      width: 104px;
      height: 45px;
      left: 406px;
      top: -27px;
      background: #003BE5;
      color: #FFFFFF;
      :disabled {
        background-color: #7F9C96;
      }
      :enabled {
        background-color: 003BE5;
      }
    }
 
  }
  }
`;

export { Form, DivGlobal, Divv };
