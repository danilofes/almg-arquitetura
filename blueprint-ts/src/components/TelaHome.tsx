import * as React from "react";
import { tela } from "./Tela";

const Home: React.StatelessComponent<{}> = () => (
  <div>Home</div>
);

export const TelaHome = tela<{}>({
  url: "/",
  render: (props) => <Home />,
  link: () => ({ pathname: "/" })
});
