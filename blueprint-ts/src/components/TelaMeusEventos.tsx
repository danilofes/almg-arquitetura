import { Switch } from "@blueprintjs/core";
import * as H from 'history';
import * as React from "react";
import { Link } from "react-router-dom";
import { DtoMeusEventos, FiltrosEventos, eventos } from "../backend";
import { withLoading } from "./LoadingContainer";
import { tela } from "./Tela";
import { TelaDetalhesEvento } from "./TelaDetalhesEvento";


const MeusEventos: React.SFC<FiltrosEventos & { history: H.History }> = props => {
  const history = props.history;
  const onChangeExibirFinalizados = (event: React.FormEvent<HTMLInputElement>) =>
    history.push(TelaMeusEventos.link({ exibirFinalizados: event.currentTarget.checked }))

  return <div>
    <ul className="pt-breadcrumbs">
      <li><span className="pt-breadcrumb pt-breadcrumb-current">Meus eventos</span></li>
    </ul>
    <div>
      <Switch checked={props.exibirFinalizados} label="Exibir finalizados" onChange={onChangeExibirFinalizados} />
    </div>
    <ListaEventosWithLoading exibirFinalizados={props.exibirFinalizados} />
  </div>
};

const ListaEventos: React.SFC<DtoMeusEventos> = props => (
  <div>
    {props.eventos.map(evento => (
      <div key={evento.codigo}>
        <Link to={TelaDetalhesEvento.link({ codigoEvento: evento.codigo })}>{evento.nome}</Link>
      </div>
    ))}
  </div>
);

const ListaEventosWithLoading = withLoading<FiltrosEventos, DtoMeusEventos>((filtros) => eventos.busca(filtros), ListaEventos);

export const TelaMeusEventos = tela<FiltrosEventos>({
  url: "/eventos",
  render: (props) => <MeusEventos exibirFinalizados={props.params.exibirFinalizados == 'true'} history={props.history} />,
  link: (filtros) => ({
    pathname: "/eventos",
    search: `?exibirFinalizados=${filtros.exibirFinalizados}`
  })
});
