import React from 'react';
import PropTypes from 'prop-types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import Trybetunes from '../images/try.png';
import { Img, Input, Div, Button } from '../CSS/login';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      inputName: '',
      isEntering: false,
    };
  }

  validationCaracteres = () => {
    const { inputName } = this.state;
    const MIN_CARACTER = 3;

    return inputName.length >= MIN_CARACTER;
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    // console.log(value);
    this.setState((
      {
        [name]: value,
      }), () => {
      if (this.validationCaracteres() === true) {
        this.setState({
          isDisabled: false,
        });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  }

   onSubmit = async () => {
     // console.log('click');
     const { inputName } = this.state;
     const { history } = this.props;
     this.setState((
       {
         isEntering: true,
       }));
     await createUser({ name: inputName });
     history.push('/search');
   }

   // Lembrar:
   // Pessini disse  que o redirect acontece DEPOIS do await da CreateUser

   render() {
     const { isDisabled, inputName, isEntering } = this.state;
     return (
       <Div>
         <div data-testid="page-login">
           {isEntering ? <Loading />
             : (
               <div>
                 <Img src={ Trybetunes } alt="Profile trybetunes" />
                 <Input
                   data-testid="login-name-input"
                   onChange={ this.onInputChange }
                   value={ inputName }
                   name="inputName"
                   placeholder="Nome"
                 />
                 <Button
                   data-testid="login-submit-button"
                   onClick={ this.onSubmit }
                   type="submit"
                   disabled={ isDisabled }
                 >
                   Entrar
                 </Button>
                 <AccountCircleIcon />
               </div>
             )}
         </div>
       </Div>
     );
   }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

// SOURCE
// Requisito 2, pra importar a função não estava indo por falta do { }
// 2 https://stackoverflow.com/questions/54199264/how-can-i-use-a-function-from-another-file-in-react
// Jensen na mentoria me explicou sobre o uso de history e enviou essa thread para eu consertar o warning do Redirect sobre unmounted https://trybecourse.slack.com/archives/C02T5FNGN07/p1650312298351669
// Aprendendo a usar o history
// 396 https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4
// 0 https://stackoverflow.com/questions/69217690/reactjs-router-how-to-use-history-push-within-function-component-with-parameter
// https://www.telerik.com/blogs/programmatically-navigate-with-react-router
// https://codesource.io/how-to-use-this-props-history-push-on-your-react-project/
// Como fazer propTypes de history
// 3 propTypes https://stackoverflow.com/questions/52109592/react-router-the-prop-history-is-undefined
// history é objeto com forma específica https://app.betrybe.com/course/front-end/introducao-a-react/componentes-react/0115c033-cfc0-48bc-bcf5-812b599ee79a/conteudos/7ec6a909-3e9e-45d8-82a3-bce51cff846d/proptypes-checagem-de-tipos/22b51038-0c41-44c2-99c1-0123b0c5cc27?use_case=side_bar
// push(path, [state]) - (function) Pushes a new entry onto the history stack https://v5.reactrouter.com/web/api/history
