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

export const TelaDetalhesEvento = tela(DetalhesEvento, ({ codigoEvento }) => eventos.obtem(codigoEvento));
