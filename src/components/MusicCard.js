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
    // console.log(getMusic); // Objeto com todas as informações da música com o checked
    const getSong = await addSong(getMusic);
    console.log(getSong);

    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId, checked } = this.props;
    const { isChecked, isLoading } = this.state;
    // console.log(typeof trackName); //string
    // console.log(typeof previewUrl); // string
    // console.log(isChecked);
    const isFavorite = checked.some((favoriteId) => favoriteId === trackId);
    // console.log(isFavorite);

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
              Favoritar
              <input
                id="checkbox"
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleChange }
                // Mudei pra change porque deu warning usando click
                checked={ (isFavorite) || (isChecked) }
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
  checked: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;

// SOURCE
// Requisito 8
//  https://stackoverflow.com/questions/11599666/get-the-value-of-checked-checkbox
// https://stackoverflow.com/questions/6358673/javascript-checkbox-onchange

// Requisito 9
// Jensem dá a luz sobre eu enviar pra cá o map que eu tinha feito de id-favoritas (da Album), via props, a partir disso usar alguma hof pra cruzar as informações se o id se repete, ou seja, a favorita.Para isso, vou deixar meu estado para manter dando check e o loading acontecer enquanto se espera a API. Ao fnalizar, a 8 deixava de passar e Pessini sugere o uso de condicional para que assim, o checked pegue ambos (meu isChecked que sempre foi do estado e o boolean que o some me dá)
