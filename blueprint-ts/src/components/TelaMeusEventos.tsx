import * as React from "react";
import { tela } from "./Tela";
import { eventos } from "../backend";

export const MeusEventos = () => (
  <div>MeusEventos</div>
);

export const TelaMeusEventos = tela(MeusEventos, () => eventos.busca());
