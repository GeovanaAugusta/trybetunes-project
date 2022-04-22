import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      isWaiting: false,
    };
  }

  componentDidMount = async () => {
    this.setState({
      isWaiting: true,
    });

    const getUserInfos = await getUser();
    // console.log(getUserInfos);

    this.setState({
      name: getUserInfos.name,
      email: getUserInfos.email,
      image: getUserInfos.image,
      description: getUserInfos.description,
      isWaiting: false,
    });
  }

  render() {
    const { name, email, description, image, isWaiting } = this.state;

    return (
      <div data-testid="page-profile">
        {isWaiting ? <Loading /> : (
          <div>
            <h1>Profile</h1>
            <img
              data-testid="profile-image"
              src={ image }
              alt={ `${name} in a beauty pic` }
            />
            <h2>{ name }</h2>
            <h4>{ email }</h4>
            <p>{ description }</p>
            <Link to="/profile/edit">Editar perfil</Link>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
