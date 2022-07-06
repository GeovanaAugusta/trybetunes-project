import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import '../index.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      firstObject: {},
      arrayWithoutFirstObject: [],
      getFavorites: [],
      isWaiting: false,
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const getMusic = await getMusics(id);

    const getFavorite = await getFavoriteSongs();

    this.setState({
      musics: getMusic,
      firstObject: getMusic[0],
      arrayWithoutFirstObject: getMusic.slice(1),
      isWaiting: true,
    });

    this.setState({
      getFavorites: getFavorite,
      isWaiting: false,
    });
  }

  render() {
    const { musics,
      firstObject: { artistName, collectionName },
      arrayWithoutFirstObject, isWaiting, getFavorites } = this.state;

    const getId = getFavorites.map((favoriteElement) => favoriteElement.trackId);

    return (
      <div data-testid="page-album">

        {musics.length !== 0 && (

          <div>
            <h1 data-testid="artist-name" className="artistName">{artistName}</h1>
            <h3 data-testid="album-name" className="collectionName">{collectionName}</h3>

            { isWaiting ? <Loading /> : (
              arrayWithoutFirstObject.map((element, index) => (
                <div key={ index }>
                  <MusicCard
                    trackName={ element.trackName }
                    previewUrl={ element.previewUrl }
                    trackId={ element.trackId }
                    key={ index }
                    checked={ getId }
                  />

                </div>
              )))}

          </div>

        )}

      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.arrayOf(PropTypes.string).isRequired,
  params: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
};
