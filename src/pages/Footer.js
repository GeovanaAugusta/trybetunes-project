import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (

      <footer className="rodape-prin">
        <span>&copy; Compilado por Geovana, 2022.</span>
        <ul className="icones-sociais">
          <li>
            <a alt="iconLink" href="https://github.com/GeovanaAugusta" rel="noopener noreferrer" target="_blank">
              <img alt="iconLink" width="40px" src="https://image.similarpng.com/very-thumbnail/2021/01/Illustration-of-Linkedin-icon-on-transparent-background-PNG.png" />
            </a>
          </li>

          <li>
            <a href="https://www.linkedin.com/in/geovana-augusta-46017a151/" rel="noopener noreferrer" target="_blank">
              <img alt="iconLink" width="40px" src="  https://www.pngkey.com/png/detail/178-1787508_github-icon-download-at-icons8-white-github-icon.png" />
            </a>
          </li>
        </ul>
      </footer>

    );
  }
}

export default Footer;
