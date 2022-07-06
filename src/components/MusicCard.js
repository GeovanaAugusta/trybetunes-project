import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import '../index.css';

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
    this.setState({
      isChecked: checked.some((favoriteId) => favoriteId === trackId),
    });
  }

  handleChange = (event) => {
    event.preventDefault();

    const { target: { checked } } = event;

    this.setState({
      isChecked: checked,
      isLoading: true,
    }, async () => {
      const { isChecked } = this.state;
      const { trackId } = this.props;
      const getMusic = await getMusics(trackId);
      const arrayToObject = { ...getMusic[0] };

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
            <div className="trackName">
              <h4>{ trackName }</h4>
            </div>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor="checkbox" className="form-control">

              <input
                id="checkbox"
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleChange }
                checked={ isChecked }
              />
              Favoritar
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
