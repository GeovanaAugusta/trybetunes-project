import React from 'react';
import { Link } from 'react-router-dom';
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import { Headers, Nav, User, NameUser, Name } from '../CSS/headerCss';

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
          <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
          {' '}
          |
          <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
          {' '}
          |
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>

        </Nav>
        <User />
        {isLoading ? <Loading />
          : (
            <NameUser>
              <h5 data-testid="header-user-name">

                <Name>
                  {' '}
                  {userInfos.name}
                  {' '}
                </Name>

              </h5>
              {/* <PersonOutlineIcon /> */}

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
