import * as React from "react";

import logo from "./marca-almg.svg";

import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="almg-app">
          <AlmgMenu>
            <NavLink exact to='/' activeClassName='ativo'>Home</NavLink>
            <NavLink to='/eventos' activeClassName='ativo'>Meus eventos</NavLink>
          </AlmgMenu>
          <AlmgConteudo>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/eventos' component={MeusEventos} />
            </Switch>
          </AlmgConteudo>
        </div>
      </BrowserRouter>
    );
  }
}

const AlmgMenu: React.StatelessComponent<{}> = ({ children }) => (
  <div className="almg-menu">
    <div>
      <img src={logo} alt="ALMG" className="almg-logo" />
    </div>
    <div>{React.Children.map(children, child => (
      <div>{child}</div>
    ))}</div>
  </div>
);

const AlmgConteudo: React.StatelessComponent<{}> = ({ children }) => (
  <div className="almg-conteudo">
    <AlmgBarraTitulo />
    <div className="interno">{children}</div>
  </div>
);

const AlmgBarraTitulo = () => (
  <div className="almg-barra-titulo"></div>
);

const Home = () => (
  <div>
    Home
  </div>
);

const MeusEventos = () => (
  <div>
    Meus Eventos
  </div>
);

export default App;
