import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import { Headers, Nav, User, NameUser, Name } from '../CSS/headerCss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      userInfos: {},
    };
  }

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    });
    const getUserAtFunction = await getUser();
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

            </NameUser>

          )}
      </Headers>
    );
  }
}

export default Header;
