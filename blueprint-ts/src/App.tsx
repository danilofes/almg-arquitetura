import * as React from 'react';

import logo from './marca-almg.svg';

class App extends React.Component {
  public render() {
    return (
      <div>
        <AlmgMenu />
        <AlmgConteudo />
      </div>
    );
  }
}

const AlmgMenu = () => (
  <div className="almg-menu">
    <div>
      <img src={logo} alt="ALMG" className="almg-logo" />
    </div>
  </div>
);

const AlmgConteudo = () => (
  <div className="almg-conteudo">
    <AlmgBarraTitulo />
    <div className="interno">
      Conteúdo
    </div>
  </div>
);

const AlmgBarraTitulo = () => (
  <div className="almg-barra-titulo">
    Título
  </div>
);

export default App;
