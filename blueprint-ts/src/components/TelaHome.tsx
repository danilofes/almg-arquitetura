import * as React from "react";
import { tela } from "./Tela";

const Home: React.SFC<{}> = () => (
  <div>Home</div>
);

export const TelaHome = tela({
  url: "/",
  render: () => <Home />
});
