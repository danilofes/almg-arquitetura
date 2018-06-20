import * as H from 'history';
import { parse } from "query-string";
import * as React from "react";
import { Route, RouteComponentProps } from "react-router-dom";


interface TelaProps {
  params: any,
  history: H.History
}

export const rotas: Array<React.ReactNode> = [];

export function telaComParametros<T>(params: {
  url: string,
  render: (props: TelaProps) => React.ReactNode,
  link: (params: T) => H.LocationDescriptorObject
}) {

  rotas.push(<Route exact={true} path={params.url} render={(props) => params.render(parseParams(props))} />);

  return {
    link: params.link
  }
}

export function tela(params: {
  url: string,
  render: () => React.ReactNode
}) {

  rotas.push(<Route exact={true} path={params.url} render={() => params.render()} />);

  return {
    link: { pathname: params.url }
  }
}

function parseParams(props: RouteComponentProps<any>) {
  return {
    params: { ...props.match.params, ...parse(props.location.search) },
    history: props.history
  };
}