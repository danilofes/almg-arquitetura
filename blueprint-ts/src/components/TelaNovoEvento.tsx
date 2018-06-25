import * as React from "react";
import { views } from '../AppViews';
import { urlPattern } from "../libs/UrlPattern";

export const TelaNovoEvento = views.view(
  urlPattern().path("novo-evento"),
  () => <div>Novo evento</div>
);
