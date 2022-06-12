import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      isLoading: false,
      isDisabled: true,
    };
  }

  componentDidMount() {
    this.getAllInfosOfUser();
  }

  getAllInfosOfUser = async () => {
    const getInfoUsers = await getUser();
    const { name, email, description, image } = getInfoUsers;
    this.setState({
      name,
      email,
      description,
      image,
      isLoading: false,
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  validate = () => {
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const { name, email, description, image } = this.state;

    const validation = [name.length > 0,
      email.length > 0, checkEmail.test(email),
      description.length > 0, image.length > 0,
    ];
    console.log(validation);

    this.setState({
      isDisabled: !validation.every((element) => element === true),
    });
  }

  getUserInfos = async () => {
    const userInfos = await getUser();

    this.setState({
      name: userInfos.name,
      email: userInfos.email,
      image: userInfos.image,
      description: userInfos.description,
      isLoading: false,
      isDisabled: true,
    });
  };

  handleClick = async () => {
    const { name, image, email, description, isDisabled } = this.state;
    const { history } = this.props;
    this.setState({
      isLoading: true,
    });

    const updateInfosUser = {
      name,
      email,
      image,
      description,
    };

    if (isDisabled === false) {
      await updateUser(updateInfosUser);

      this.setState({
        isLoading: false,
      });

      history.push('/profile');
    }
  }

  render() {
    const { name, email, description, isLoading, image, isDisabled } = this.state;

    return (
      <div data-testid="page-profile-edit">

        <h1>Editar perfil</h1>

        {isLoading ? (
          <Loading />
        ) : (
          <form>

            <label htmlFor="name">
              Name
              <input
                id="name"
                data-testid="edit-input-name"
                name="name"
                type="text"
                value={ name }
                onChange={ this.handleChange }
                required
              />
            </label>

            <label htmlFor="image">
              Image
              <input
                id="image"
                data-testid="edit-input-image"
                type="text"
                name="image"
                value={ image }
                onChange={ this.handleChange }

              />
            </label>

            <label htmlFor="email">
              Email
              <input
                id="email"
                data-testid="edit-input-email"
                type="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>

            <label htmlFor="description">
              Descrição
              <textarea
                id="description"
                data-testid="edit-input-description"
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>

            <button
              type="button"
              data-testid="edit-button-save"
              onClick={ this.handleClick }
              disabled={ isDisabled }
            >
              Salvar
            </button>

          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
};
