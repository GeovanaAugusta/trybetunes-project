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
     const { inputName } = this.state;
     const { history } = this.props;
     this.setState((
       {
         isEntering: true,
       }));
     await createUser({ name: inputName });
     history.push('/search');
   }

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
