import * as React from "react";
import { Link } from "react-router-dom";
import { DtoMeusEventos, eventos } from "../backend";
import { tela } from "./Tela";

export const MeusEventos: React.StatelessComponent<DtoMeusEventos> = dto => (
  <div>
    {dto.eventos.map(evento => (
      <div><Link to={`/eventos/${evento.codigo}`}>{evento.nome}</Link></div>
    ))}
  </div>
);

export const TelaMeusEventos = tela(MeusEventos, () => eventos.busca());
