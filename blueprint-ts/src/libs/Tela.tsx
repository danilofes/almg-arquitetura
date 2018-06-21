import * as H from 'history';
import { parse } from "query-string";
import * as React from "react";
import { Route, RouteComponentProps } from "react-router-dom";


interface TelaProps {
  params: any,
  history: H.History
}

class Telas {
  readonly rotas: Array<React.ReactNode> = [];
  
  telaComParametros<T>(params: {
    url: string,
    render: (props: TelaProps) => React.ReactNode,
    link: (params: T) => H.LocationDescriptorObject
  }) {
  
    this.rotas.push(<Route exact={true} path={params.url} render={(props) => params.render(parseParams(props))} />);
  
    return {
      link: params.link
    }
  }
  
  tela(params: {
    url: string,
    render: () => React.ReactNode
  }) {
  
    this.rotas.push(<Route exact={true} path={params.url} render={() => params.render()} />);
  
    return {
      link: { pathname: params.url }
    }
  }
}

function parseParams(props: RouteComponentProps<any>) {
  return {
    params: { ...props.match.params, ...parse(props.location.search) },
    history: props.history
  };
}

class PathSpec<T = {}> {
  
  pathParts: UrlPart[] = [];
  queryParts: UrlPart[] = [];

  link = (params: T) => ({
    pathname: '/' + this.pathParts.map(p => p.toUrl(params)).join('/'),
    search: '?' + this.queryParts.map(p => p.toUrl(params)).join('&')
  });

  s(part: string): PathSpec<T> {
    this.pathParts.push(new StaticUrlPart(part));
    return this;
  }

  num<K extends string>(identifier: K): PathSpec<T & Wrapped<K, number>> {
    this.pathParts.push(new NumericUrlPart(identifier));
    return this;
  }

  str<K extends string>(identifier: K): PathSpec<T & Wrapped<K, string>> {
    this.pathParts.push(new StringUrlPart(identifier));
    return this;
  }
}

type Wrapped<K extends string, V> = {
  [P in K]: V;
};

interface UrlPart {
  toUrl(params: any): string;
  convert(rawParams: any, params: any): void
}

class StaticUrlPart implements UrlPart {
  constructor(private part: string) {}
  toUrl = () => this.part;
  convert() {}
}

class NumericUrlPart implements UrlPart {
  constructor(private identifier: string) {}
  toUrl = (params: any) => String(params[this.identifier]);
  convert(rawParams: any, params: any) {
    params[this.identifier] = Number(rawParams[this.identifier]);
  }
}

class StringUrlPart implements UrlPart {
  constructor(private identifier: string) {}
  toUrl = (params: any) => String(params[this.identifier]);
  convert(rawParams: any, params: any) {
    params[this.identifier] = String(rawParams[this.identifier]);
  }
}

function path() {
  return new PathSpec();
}

let x = path().s("eventos").num("codigoEvento").str("macaco");

x.link({codigoEvento: 3, macaco: 'x'});
