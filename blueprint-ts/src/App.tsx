import * as H from 'history';
import * as React from "react";
import { NavLink, Router, Switch } from "react-router-dom";
import { history, views } from './AppViews';
import { TelaHome } from "./components/TelaHome";
import { TelaMeusEventos } from "./components/TelaMeusEventos";
import logo from "./marca-almg.svg";


class App extends React.Component {
  public render() {
    return (
      <Router history={history}>
        <AlmgApp>
          <AlmgMenu>
            <AlmgMenuItem to={TelaHome.link()} label="Home" />
            <AlmgMenuItem to={TelaMeusEventos.link({ exibirFinalizados: false })} label="Meus eventos" />
          </AlmgMenu>
          <AlmgConteudo>
            <Switch>
              {views.routes}
            </Switch>
          </AlmgConteudo>
        </AlmgApp>
      </Router>
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
