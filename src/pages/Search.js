import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import ArtistCard from './ArtistCard';
import '../index.css';
import { Input, Button, Wrapper, Card } from '../CSS/search';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      inputValue: '',
      showInputBtn: false,
      artistInfos: [],
      receiveInputValue: '',
    };
  }

  validationCaracteres = () => {
    const { inputValue } = this.state;
    const MIN_CARACTER = 2;

    return inputValue.length >= MIN_CARACTER;
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState((
      {
        [name]: value,
      }), () => {
      if (this.validationCaracteres() === true) {
        this.setState({
          isDisabled: false,
        });
      } else {
        this.setState({
          isDisabled: true,
        });
      }
    });
  }

  handleClick = async () => {
    const { inputValue } = this.state;
    this.setState({
      showInputBtn: true,
      inputValue: '',
      receiveInputValue: inputValue,
    });
    const response = await searchAlbumsAPI(inputValue);

    this.setState({
      showInputBtn: false,
      artistInfos: response,
    });
  }

  render() {
    const { isDisabled, inputValue, showInputBtn, artistInfos,
      receiveInputValue } = this.state;
    return (
      <Wrapper data-testid="page-search">

        {showInputBtn ? <Loading />

          : (
            <div>
              <Input
                data-testid="search-artist-input"
                placeholder="Digite o nome da banda ou do artista"
                onChange={ this.onInputChange }
                value={ inputValue }
                name="inputValue"
              />
              <Button
                data-testid="search-artist-button"
                type="submit"
                disabled={ isDisabled }
                onClick={ this.handleClick }
              >
                Pesquisar
              </Button>
            </div>
          )}

        { artistInfos.length !== 0
              && <h1>{`Resultado de álbuns de: ${receiveInputValue}`}</h1>}

        {artistInfos.length === 0
          ? (<h1>Nenhum álbum foi encontrado</h1>)

          : artistInfos.map((element, index) => (
            <Card key={ index }>
              <Link
                data-testid={ `link-to-album-${element.collectionId}` }
                to={ `/album/${element.collectionId}` }
              >

                <ArtistCard
                  artistName={ element.artistName }
                  collectionName={ element.collectionName }
                  artworkUrl100={ element.artworkUrl100 }
                  releaseDate={ element.releaseDate }
                  key={ index }
                />

              </Link>
            </Card>
          )) }
      </Wrapper>
    );
  }
}

export default Search;
