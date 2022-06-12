import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isChecked: false,
      isLoading: false,
    };
  }

  componentDidMount = () => {
    const { checked, trackId } = this.props;
    // console.log(checked);
    this.setState({
      isChecked: checked.some((favoriteId) => favoriteId === trackId), // Muito mais lógico passar aqui essa informação após a renderização da página, ao invés de ter dois no checked, como havia feito, pra manter o favorito ali salvo ao entrar novamente no álbum
    });
  }

  handleChange = (event) => {
    event.preventDefault();
    // console.log('funcionando?'); // Ok
    // console.log(this.props); // Informações da música selecionada, preciso do id da música específica para passar de param para a getMusics

    const { target: { checked } } = event;
    // Pegando o checked do próprio input selecionado para repassar ao meu estado, usando true/false como inicial não funcionava porque a ideia é se manter salva a informação após reload, então é variável quem inicia true e quem inicia false
    // console.log(event.target);
    // console.log(checked);

    this.setState({
      isChecked: checked,
      isLoading: true,
    }, async () => {
      const { isChecked } = this.state;
      const { trackId } = this.props;
      const getMusic = await getMusics(trackId); // Retorna um ARRAY e eu preciso do OBJETO e a posição um apenas, se não dá erro, cismei que o retorno era objeto, então conserto o requisito 8 com esse update.
      // console.log(getMusic);
      const arrayToObject = { ...getMusic[0] }; // Object assign o lint não permitiu
      // console.log(arrayToObject);

      if (isChecked === true) {
        await addSong(arrayToObject);
        this.setState({
          isLoading: false,
        });
      } else {
        await removeSong(arrayToObject);
        this.setState({
          isLoading: false,
        });
      }
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isChecked, isLoading } = this.state;

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
  checked: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;

// SOURCE
// Requisito 8
//  https://stackoverflow.com/questions/11599666/get-the-value-of-checked-checkbox
// https://stackoverflow.com/questions/6358673/javascript-checkbox-onchange

// Requisito 9
// Jensem dá a luz sobre eu enviar pra cá o map que eu tinha feito de id-favoritas (da Album), via props, a partir disso usar alguma hof pra cruzar as informações se o id se repete, ou seja, a favorita.Para isso, vou deixar meu estado para manter dando check e o loading acontecer enquanto se espera a API. Ao fnalizar, a 8 deixava de passar e Pessini sugere o uso de condicional para que assim, o checked pegue ambos (meu isChecked que sempre foi do estado e o boolean que o some me dá), consegui mudar isso passando no didMount o boolean do meu some, evitando duplicar o checked

// Requisito 11
// Array to object https://stackoverflow.com/questions/4215737/convert-array-to-object
