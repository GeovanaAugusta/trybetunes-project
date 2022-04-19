import React from 'react';
import PropTypes from 'prop-types';

class ArtistCard extends React.Component {
  render() {
    const { artistName, collectionName, artworkUrl100, releaseDate } = this.props;
    const LENGTH = 4;
    return (
      <div>
        <p>{ artistName }</p>
        <p>{ collectionName }</p>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <p>{ releaseDate.substr(0, LENGTH) }</p>
      </div>
    );
  }
}

ArtistCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
};

export default ArtistCard;

// Queria só o ano, aí usei substr https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/substr, exemplos bastaram para aplicar
