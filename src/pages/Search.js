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
      artistInfos: [], // a searchAlbumsAPI me retorna um array, assim como fiz o objeto vazio para receber o retorno da getUser, faço aqui array vazio
      receiveInputValue: '',
      // Pessini disse que preciso de duas propriedades: uma inputValue e outra pra receber essa inputValue, aí funcionará
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
    // console.log('click'); OK funciona
    const { inputValue } = this.state;
    this.setState({
      showInputBtn: true,
      inputValue: '',
      receiveInputValue: inputValue,
    });
    const response = await searchAlbumsAPI(inputValue);
    // console.log(response); // Retorna um array, digito o nome e aparece sua discografia, sendo assim o inputValue passado como param, como é array, só um map para fazer a listagem?
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
        // Enquanto aguarda a resposta da API, esconda o input e o botão de pesquisa e exiba a mensagem Carregando... na tela.
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
        {
        /* Após receber a resposta exibir na tela o texto
        Resultado de álbuns de: <artista> */}

        {artistInfos.length === 0
          ? (<h1>Nenhum álbum foi encontrado</h1>)
          // Se nenhum álbum for encontrado para o nome pesquisado, a API irá retornar um array vazio. Nesse caso, a mensagem Nenhum álbum foi encontrado deverá ser exibida. E se nada for encontrado como vem com array vazio, .length resolve

          : artistInfos.map((element, index) => (
            <Card key={ index }>
              <Link
                data-testid={ `link-to-album-${element.collectionId}` }
                to={ `/album/${element.collectionId}` }

              >
                {/* link em cada card para redirecionar para a página do álbum, com o atributo data-testid={`link-to-album-${collectionId}`}. Onde collectionId é o valor da propriedade de cada Álbum.
              Redireciona para a rota /album/:id(valor da propriedade collectionId) */}

                <ArtistCard
                  artistName={ element.artistName }
                  collectionName={ element.collectionName }
                  artworkUrl100={ element.artworkUrl100 }
                  releaseDate={ element.releaseDate }
                  key={ index }
                // Liste os álbuns retornados.
                />

              </Link>
            </Card>
            // Só consegui assim, usando div para encapsular queixava de key, mas usando o Link como a tag pai foi
          )) }
      </Wrapper>
    );
  }
}

export default Search;

// SOURCE
// Requisito 6
// https://github.com/tryber/sd-020-a-live-lectures/pull/19/commits/f13344369ac76aa97d591fc2f4e2cdf7eb980a8a#diff-12cd98d2cad1d4dde28b1ab2afcbaf21110bd596c3613ecd09ae1dec56aa6f25
//  Para uso do map: Missions e MissionsCard do SolarSystem bastaram para relembrar
