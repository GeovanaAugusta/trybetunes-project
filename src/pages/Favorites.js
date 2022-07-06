import React from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import '../index.css';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      getFavorites: [],
      isLoading: false,
      isChecked: true,
    };
  }

  componentDidMount = async () => {
    this.setState({
      isLoading: true,
    });

    const getFavorite = await getFavoriteSongs();
    console.log(getFavorite);

    this.setState({
      getFavorites: getFavorite,
      isLoading: false,
    });
  }

   handleClick = async (id) => {
     console.log(id);
     console.log('works');
     this.setState({
       isLoading: true,
       isChecked: false,
     });
     const { getFavorites, isChecked } = this.state;
     const removeTrack = getFavorites.find((favorites) => (
       favorites.trackId === id));
     const tracksLeft = getFavorites.filter((favorites) => (
       favorites.trackId !== id));
     console.log(removeTrack);
     if (isChecked === true) {
       await removeSong(removeTrack);
       this.setState({
         getFavorites: tracksLeft,
         isLoading: false,
         isChecked: true,
       });
     }
   }

   render() {
     const { isLoading, getFavorites, isChecked } = this.state;
     return (

       <div data-testid="page-favorites">
         { isLoading ? <Loading /> : (
           getFavorites.map((element, index) => (
             <div key={ index }>
               <div className="trackName">
                 <h4>{ element.trackName }</h4>
               </div>
               <audio data-testid="audio-component" src={ element.previewUrl } controls>
                 <track kind="captions" />
                 O seu navegador não suporta o elemento
                 <code>audio</code>
                 .
               </audio>
               <label htmlFor="checkbox" className="form-control">
                 <input
                   id="checkbox"
                   type="checkbox"
                   onChange={ this.handleChange }
                   checked={ isChecked }
                   onClick={ () => { this.handleClick(element.trackId); } }
                 />
                 Favorita

               </label>

             </div>
           ))
         )}
         {getFavorites.length === 0 && <h3>Nenhum favorito foi encontrado!</h3>}
       </div>

     );
   }
}

export default Favorites;
