import * as React from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import { TelaDetalhesEvento } from "./components/TelaDetalhesEvento";
import { TelaMeusEventos } from "./components/TelaMeusEventos";
import logo from "./marca-almg.svg";



class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="almg-app">
          <AlmgMenu>
            <NavLink exact to='/' activeClassName='ativo'>Home</NavLink>
            <NavLink to={TelaMeusEventos.link({})} activeClassName='ativo'>Meus eventos</NavLink>
          </AlmgMenu>
          <AlmgConteudo>
            <Switch>
              <Route exact path='/' component={Home} />
              {TelaMeusEventos.rota}
              {TelaDetalhesEvento.rota}
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
  <div className="almg-barra-titulo" />
);

const Home = () => (
  <div>
    Home
  </div>
);

export default App;
