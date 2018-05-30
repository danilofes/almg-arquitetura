import * as H from 'history';
import * as React from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import { TelaDetalhesEvento } from "./components/TelaDetalhesEvento";
import { TelaHome } from "./components/TelaHome";
import { TelaMeusEventos } from "./components/TelaMeusEventos";
import logo from "./marca-almg.svg";


class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <AlmgApp>
          <AlmgMenu>
            <AlmgMenuItem to={TelaHome.link({})} label="Home" />
            <AlmgMenuItem to={TelaMeusEventos.link({ exibirFinalizados: false })} label="Meus eventos" />
          </AlmgMenu>
          <AlmgConteudo>
            <Switch>
              <Route exact path='/' component={Home} />
              {TelaMeusEventos.rota}
              {TelaDetalhesEvento.rota}
            </Switch>
          </AlmgConteudo>
        </AlmgApp>
      </BrowserRouter>
    );
  }
}

const AlmgApp: React.StatelessComponent<{}> = ({ children }) => (
  <div className="almg-app">
    {children}
  </div>
);

const AlmgMenu: React.StatelessComponent<{}> = ({ children }) => (
  <div className="almg-menu pt-elevation-3">
    <div className="almg-logo padding">
      <div className="padding"><img src={logo} alt="ALMG" /></div>
      <h1 className="padding">Gestão de Eventos</h1>
    </div>
    <div>{children}</div>
  </div>
);

const AlmgMenuItem: React.StatelessComponent<{ to: H.LocationDescriptor, label: string }> = props => (
  <NavLink exact to={props.to} activeClassName='ativo'>{props.label}</NavLink>
);

const AlmgConteudo: React.StatelessComponent<{}> = ({ children }) => (
  <div className="almg-conteudo">
    <div className="interno">{children}</div>
  </div>
);

const Home = () => (
  <div>
    Home
  </div>
);

export default App;
