import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import { DivGlobal, Form, Divv, Nav } from '../CSS/profile';
import '../index.css';

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
      <DivGlobal data-testid="page-profile">
        {isWaiting ? <Loading /> : (
          <Divv>
            <Form>
              <div className="profile">
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt="My profile phto"
                />
                <Nav className="img-profile-button">
                  <Link to="/profile/edit">Editar perfil</Link>
                </Nav>
              </div>
              <div className="infosUsers">
                <h2>{ name }</h2>
                <h4>{ email }</h4>
                <p>{ description }</p>
              </div>
            </Form>
          </Divv>
        )}
      </DivGlobal>
    );
  }
}

export default Profile;
