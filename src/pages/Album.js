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

  // Ao entrar na página, faça uma requisição - só pode ser na montagem com DidMount
  componentDidMount = async () => {
    // console.log(this.props); // Props React Router, preciso do id
    const { match: { params: { id } } } = this.props;
    // console.log(id); // Ok, peguei o id
    // console.log(typeof id); // string;
    const getMusic = await getMusics(id);
    // console.log(getMusic); // Ok, me dá um array com TODAS as músicas do álbum
    // console.log(getMusic[0]); // Pego o primeiro objeto do array, sabendo que tanto o nome do artista quanto do álbum é invariável
    // console.log(getMusic[0].trackName); // undefined porque nessa posição não tem trackName, então preciso remover esse 1 objeto antes de iterar, por isso fica dando erro de undefined quando itero sem remover
    // console.log(getMusic.slice(1)); // Só slice funciona no teste, apesar de shift ter o mesmo comportamento

    const getFavorite = await getFavoriteSongs();
    // console.log(getFavorite);

    this.setState({
      musics: getMusic,
      firstObject: getMusic[0],
      arrayWithoutFirstObject: getMusic.slice(1),
      isWaiting: true,
    });

    // Para quando a resposta da getFavorite chegar
    this.setState({
      getFavorites: getFavorite,
      isWaiting: false,
    });
  }

  render() {
    const { musics,
      firstObject: { artistName, collectionName },
      arrayWithoutFirstObject, isWaiting, getFavorites } = this.state;
    // console.log(artistName, collectionName); // Ok, funcionam

    const getId = getFavorites.map((favoriteElement) => favoriteElement.trackId);
    // console.log(getId);

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

// SOURCE
// Requisito 7
// https://vimeo.com/699809071 a partir de 32:00 explica bem como passar Props React Router
// propTypes https://app.betrybe.com/course/front-end/introducao-a-react/componentes-react/0115c033-cfc0-48bc-bcf5-812b599ee79a/conteudos/7ec6a909-3e9e-45d8-82a3-bce51cff846d/proptypes-checagem-de-tipos/22b51038-0c41-44c2-99c1-0123b0c5cc27?use_case=side_bar
// shift e splice não funcionam, aiai, mas slice foi
// https://bobbyhadz.com/blog/javascript-remove-first-element-from-array#:~:text=To%20remove%20the%20first%20element,and%20returns%20the%20removed%20element.
// 945 https://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript
// Para uso do map: Missions e MissionsCard do SolarSystem bastaram para relembrar

// Requisito 9
//  Muca deu ideia de que preciso pegar algo único para comparar se é ou não favorito, pegarei o id , então a partir de um array com todos os ids... depois comparo com o array com TODAS as músicas tendo meu boolean de se é ou não favorito
