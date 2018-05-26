import * as React from "react";
import { DtoEvento, eventos } from "../backend";
import { tela } from "./Tela";

export const DetalhesEvento: React.StatelessComponent<DtoEvento> = evento => (
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

interface Params {
  codigoEvento: number
}

export const TelaDetalhesEvento = tela<Params, DtoEvento>({
  url: "/eventos/:codigoEvento",
  render: DetalhesEvento,
  fetch: ({ codigoEvento }) => eventos.obtem(codigoEvento),
  link: ({ codigoEvento }) => `/eventos/${codigoEvento}`
});
