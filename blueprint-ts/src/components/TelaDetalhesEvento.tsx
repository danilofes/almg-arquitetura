import * as React from "react";
import { DtoEvento, eventos } from "../backend";
import { withLoading } from "./LoadingContainer";
import { telaComParametros } from "./Tela";

export const DetalhesEvento: React.SFC<DtoEvento> = evento => (
  <div>
    <div>
      <div>Código</div>
      <div>{evento.codigo}</div>
    </div>
    <div>
      <div>Nome</div>
      <div>{evento.nome}</div>
    </div>
  </div>
);

const mapPropsToPromise = (props: {codigoEvento: number}) => eventos.obtem(props.codigoEvento);

const DetalhesEventoWithLoading = withLoading(mapPropsToPromise, DetalhesEvento);

interface DetalhesEventoParams {
  codigoEvento: number
}

export const TelaDetalhesEvento = telaComParametros<DetalhesEventoParams>({
  url: "/eventos/:codigoEvento",
  render: (props) => <DetalhesEventoWithLoading codigoEvento={props.params.codigoEvento} />,
  link: ({ codigoEvento }) => ({ pathname: `/eventos/${codigoEvento}` })
});
