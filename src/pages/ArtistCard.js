import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Img = styled.img`
width: 200px;
height: 150px;
background: #023031;
border-bottom: 1px solid rgba(255, 255, 255, 0.4);
border-radius: 10px 10px 0px 0px;
`;

class ArtistCard extends React.Component {
  render() {
    const { collectionName, artworkUrl100, releaseDate } = this.props;
    const LENGTH = 4;
    return (
      <div>
        <Img src={ artworkUrl100 } alt={ collectionName } />
        <p>{ collectionName }</p>
        <br />
        <p>{ releaseDate.substr(0, LENGTH) }</p>
      </div>
    );
  }
}

ArtistCard.propTypes = {
  // artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
};

export default ArtistCard;

// Queria só o ano, aí usei substr https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/substr, exemplos bastaram para aplicar
