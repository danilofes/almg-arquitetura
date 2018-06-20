import * as H from 'history';
import * as React from "react";
import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom";
import { TelaDetalhesEvento } from "./components/TelaDetalhesEvento";
import { TelaHome } from "./components/TelaHome";
import { TelaMeusEventos } from "./components/TelaMeusEventos";
import { TelaNovoEvento } from './components/TelaNovoEvento';
import logo from "./marca-almg.svg";
import { rotas } from "./components/Tela";


class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <AlmgApp>
          <AlmgMenu>
            <AlmgMenuItem to={TelaHome.link} label="Home" />
            <AlmgMenuItem to={TelaMeusEventos.link({ exibirFinalizados: false })} label="Meus eventos" />
          </AlmgMenu>
          <AlmgConteudo>
            <Switch>
              {rotas}
            </Switch>
          </AlmgConteudo>
        </AlmgApp>
      </BrowserRouter>
    );
  }
}


const AlmgApp: React.SFC<{}> = ({ children }) => (
  <div className="almg-app">
    {children}
  </div>
);

const AlmgMenu: React.SFC<{}> = ({ children }) => (
  <div className="almg-menu pt-elevation-3">
    <div className="almg-logo padding">
      <div className="padding"><img src={logo} alt="ALMG" /></div>
      <h1 className="padding">Gestão de Eventos</h1>
    </div>
    <div>{children}</div>
  </div>
);

const AlmgMenuItem: React.SFC<{ to: H.LocationDescriptor, label: string }> = props => (
  <NavLink exact={true} to={props.to} activeClassName='ativo'>{props.label}</NavLink>
);

const AlmgConteudo: React.SFC<{}> = ({ children }) => (
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
