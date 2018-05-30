import * as H from 'history';
import { parse } from "query-string";
import * as React from "react";
import { Route, RouteComponentProps } from "react-router-dom";


interface TelaProps {
  params: any,
  history: H.History
}

export function tela<T>(params: {
  url: string,
  render: (props: TelaProps) => React.ReactNode,
  link: (params: T) => H.LocationDescriptorObject
}) {
  return {
    rota: <Route exact path={params.url} render={(props) => params.render(parseParams(props))} />,
    link: params.link
  }
}

function parseParams(props: RouteComponentProps<any>) {
  return {
    params: { ...props.match.params, ...parse(props.location.search) },
    history: props.history
  };
}