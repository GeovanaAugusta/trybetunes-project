import React from 'react';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      inputValue: '',
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

  render() {
    const { isDisabled, inputValue } = this.state;
    return (
      <div data-testid="page-search">
        <input
          data-testid="search-artist-input"
          placeholder="Digite o nome da banda ou do artista"
          onChange={ this.onInputChange }
          value={ inputValue }
          name="inputValue"
        />
        <button
          data-testid="search-artist-button"
          type="submit"
          disabled={ isDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
