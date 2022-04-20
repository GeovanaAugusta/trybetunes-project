import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      isLoading: false,
    };
  }

  handleChange = async (event) => {
    event.preventDefault();
    // console.log('funcionando?'); // Ok
    // console.log(this.props); // Informações da música selecionada, preciso do id da música específica para passar de param para a getMusics
    const { trackId } = this.props;

    this.setState({
      isChecked: true,
      isLoading: true,
    });

    const getMusic = await getMusics(trackId);
    console.log(getMusic); // Objeto com todas as informações da música com o checked
    const getSong = await addSong(getMusic);
    console.log(getSong);

    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isChecked } = this.state;
    // console.log(typeof trackName); //string
    // console.log(typeof previewUrl); // string
    return (
      <div>
        {isLoading ? <Loading /> : (
          <div>
            <h4>{ trackName }</h4>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor="checkbox">
              <input
                id="checkbox"
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleChange }
                // Mudei pra change porque deu warning usando click
                checked={ isChecked }
              />
            </label>
          </div>
        ) }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;

// SOURCE
// Requisito 8
//  https://stackoverflow.com/questions/11599666/get-the-value-of-checked-checkbox
// https://stackoverflow.com/questions/6358673/javascript-checkbox-onchange
