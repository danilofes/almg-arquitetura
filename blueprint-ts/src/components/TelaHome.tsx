import * as React from "react";
import { views } from '../AppViews';
import { urlPattern } from "../libs/UrlPattern";

const Home: React.SFC<{}> = () => (
  <div>Home</div>
);

export const TelaHome = views.view(
  urlPattern(),
  Home
)