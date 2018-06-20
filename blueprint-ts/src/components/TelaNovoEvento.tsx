import * as React from "react";
import { tela } from "./Tela";

export const TelaNovoEvento = tela<{}>({
  url: "/novo-evento",
  render: (props) => <div>Novo evento</div>,
  link: () => ({ pathname: "/novo-evento" })
});
