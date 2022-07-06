import styled from 'styled-components';

const Headers = styled.header`
  align-items: center;
  color: white;
  background: #023031;
  display: flex;
  height: 96px;
  justify-content: space-between;
  width: 100%;
`;

const Nav = styled.nav`a {
    color: white;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 22px;
    margin-left: 20px;
    margin-right: 20px;
    text-decoration: none;
    :hover {
      color: #96ffba;
    }
  }
`;

const NameUser = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 34px;
  margin-right: 5%;
  right: 43px;
  display: flex;
color: green;
  background: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  justify-content: center;
width: 110px;
height: 35.65px;
`;

const Name = styled.h4`
`;

const User = styled.div`
margin-left: 820px;
`;

export { Headers, Nav, User, NameUser, Name };
