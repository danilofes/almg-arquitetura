import * as React from "react";
import { views } from '../AppViews';
import { DtoEvento, eventos } from "../backend";
import { NUM, urlPattern } from "../libs/UrlPattern";
import { withLoading } from "./LoadingContainer";

export const DetalhesEvento: React.SFC<{ evento: DtoEvento }> = props => (
  <div>
    <div>
      <div>Código</div>
      <div>{props.evento.codigo}</div>
    </div>
    <div>
      <div>Nome</div>
      <div>{props.evento.nome}</div>
    </div>
  </div>
);

const mapPropsToPromise = (props: { codigoEvento: number }) => eventos.obtem(props.codigoEvento).then(evento => ({ evento }));

const DetalhesEventoWithLoading = withLoading(mapPropsToPromise, DetalhesEvento);

export const TelaDetalhesEvento = views.viewWithParams(
  urlPattern().path("eventos").pathVar("codigoEvento", NUM),
  DetalhesEventoWithLoading
)