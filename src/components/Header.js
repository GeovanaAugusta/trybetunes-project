import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <header data-testid="header-component">
        {isLoading ? <Loading />
          : (
            <div>
              <h1 data-testid="header-user-name">
                { userInfos.name }
              </h1>
            </div>
          )}
      </header>

    );
  }
}

export default Header;

// SOURCE
// Requisito 3
// Direciona bem: API de fotos aleatórias de cachorros - https://github.com/tryber/exercise-dog-image
// https://github.com/tryber/exercises-lifecycle-step-by-step/tree/master/answer_keys
