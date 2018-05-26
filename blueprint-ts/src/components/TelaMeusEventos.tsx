import * as React from "react";
import { Link } from "react-router-dom";
import { DtoMeusEventos, eventos } from "../backend";
import { tela } from "./Tela";
import { TelaDetalhesEvento } from "./TelaDetalhesEvento";

const MeusEventos: React.StatelessComponent<DtoMeusEventos> = dto => (
  <div>
    {dto.eventos.map(evento => (
      <div key={evento.codigo}>
        <Link to={TelaDetalhesEvento.link({ codigoEvento: evento.codigo })}>{evento.nome}</Link>
      </div>
    ))}
  </div>
);

export const TelaMeusEventos = tela({
  url: "/eventos",
  render: MeusEventos,
  fetch: () => eventos.busca(),
  link: () => "/eventos"
});
