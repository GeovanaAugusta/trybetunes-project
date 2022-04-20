import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      firstObject: {},
      arrayWithoutFirstObject: [],
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

    this.setState({
      musics: getMusic,
      firstObject: getMusic[0],
      arrayWithoutFirstObject: getMusic.slice(1),
    });
  }

  render() {
    const { musics,
      firstObject: { artistName, collectionName },
      arrayWithoutFirstObject } = this.state;
    // console.log(artistName, collectionName); // Ok, funcionam

    return (
      <div data-testid="page-album">

        {musics.length !== 0 && (

          <div>
            <h3 data-testid="artist-name">{artistName}</h3>
            <h3 data-testid="album-name">{collectionName}</h3>

            {arrayWithoutFirstObject.map((element, index) => (

              <MusicCard
                trackName={ element.trackName }
                previewUrl={ element.previewUrl }
                trackId={ element.trackId }
                key={ index }
              />

            ))}

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
