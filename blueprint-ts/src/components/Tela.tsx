import { Spinner } from "@blueprintjs/core";
import * as React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { withLoading } from "./LoadingContainer";

export function tela<T, U>(params: {
  url: string,
  component: React.ComponentType<U>,
  link: (params: T) => string,
  fetch: (params: T) => Promise<U>
}) {
  let mapPropsToPromise = (props: RouteComponentProps<T>) => params.fetch(props.match.params);
  return {
    rota: <Route exact path={params.url} component={withLoading(mapPropsToPromise, params.component)} />,
    link: params.link
  }
}
