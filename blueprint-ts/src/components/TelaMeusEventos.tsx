import { Switch } from "@blueprintjs/core";
import * as React from "react";
import { Link } from "react-router-dom";
import { history, views } from '../AppViews';
import { DtoMeusEventos, eventos, FiltrosEventos } from "../backend";
import { BOOL, urlPattern } from "../libs/UrlPattern";
import { withLoading } from "./LoadingContainer";
import { TelaDetalhesEvento } from "./TelaDetalhesEvento";


const MeusEventos: React.SFC<FiltrosEventos> = props => {
  
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

export const TelaMeusEventos = views.viewWithParams(
  urlPattern().path("eventos").queryParam("exibirFinalizados", BOOL),
  MeusEventos
)
