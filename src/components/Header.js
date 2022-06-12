import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

const Headers = styled.header`
width: 100%;
height: 96px;
background: #023031;
display: flex;
align-items: center;
justify-content: space-between;
color: white;
`;

const Nav = styled.nav`
a {
  color: white;
  text-decoration: none;
  font-style: normal; 
  font-weight: 600; 
  font-size: 18px; 
  line-height: 22px; 
  margin-right: 20px; 
  margin-left: 20px; 
}
`;

const NameUser = styled.div`
font-style: normal; 
font-weight: 600; 
font-size: 20px; 
line-height: 34px; 
margin-right: 3%; 
right: 13px;
`;

const User = styled.div`
margin-left: 820px;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userInfos: {}, // Objeto vazio para receber o objeto user da getUser que enquando null é {}
    };
  }

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    });
    const getUserAtFunction = await getUser();
    // console.log(getUserAtFunction); // OK, peguei aquele objeto com nome, email, imagem e descrição
    // console.log(getUserAtFunction.name); getUserAtFunction.name me dá o nome que está salvo na readUser()
    this.setState({
      isLoading: false,
      userInfos: getUserAtFunction,
    });
  }

  render() {
    const { isLoading, userInfos } = this.state;
    return (
      <Headers data-testid="header-component">
        <Nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          {' '}
          |
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          {' '}
          |
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </Nav>
        <User>
          <PersonOutlineIcon />
        </User>
        {isLoading ? <Loading />
          : (
            <NameUser>
              <h3 data-testid="header-user-name">

                { userInfos.name }

              </h3>

            </NameUser>

          )}
      </Headers>
    // Troca a tag pelo nome da const com estilo
    );
  }
}

export default Header;

// SOURCE
// Requisito 3
// Direciona bem: API de fotos aleatórias de cachorros - https://github.com/tryber/exercise-dog-image
// https://github.com/tryber/exercises-lifecycle-step-by-step/tree/master/answer_keys
