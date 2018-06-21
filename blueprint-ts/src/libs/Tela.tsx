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

class UrlPattern<T = {}> {
  
  pathParts: UrlPart[] = [];
  queryParts: UrlPart[] = [];

  toLocation = (params: T) => ({
    pathname: '/' + this.pathParts.map(p => p.toUrl(params)).join('/'),
    search: '?' + this.queryParts.map(p => p.toUrl(params)).join('&')
  });

  part(part: string): UrlPattern<T> {
    this.pathParts.push(new StaticUrlPart(part));
    return this;
  }

  varNum<K extends string>(identifier: K): UrlPattern<T & WithProp<K, number>> {
    this.pathParts.push(new DynamicUrlPart(identifier, numberParser));
    return this;
  }

  varStr<K extends string>(identifier: K): UrlPattern<T & WithProp<K, string>> {
    this.pathParts.push(new DynamicUrlPart(identifier, stringParser));
    return this;
  }
}

type WithProp<K extends string, V> = {
  [P in K]: V;
};

interface ParamParser<T> {
  toString: (value: T) => string,
  fromString: (value: string) => T
}

const numberParser: ParamParser<number> = {
  toString: (value: number) => String(value),
  fromString: (value: string) => Number(value)
}

const stringParser: ParamParser<string> = {
  toString: (value: string) => value,
  fromString: (value: string) => value
}

interface UrlPart {
  toUrl(params: any): string;
  convert(rawParams: any, params: any): void
}

class StaticUrlPart implements UrlPart {
  constructor(private part: string) {}
  toUrl = () => this.part;
  convert() {}
}

class DynamicUrlPart<T> implements UrlPart {
  constructor(private identifier: string, private parser: ParamParser<T>) {}
  toUrl = (params: any) => this.parser.toString(params[this.identifier]);
  convert(rawParams: any, params: any) {
    params[this.identifier] = this.parser.fromString(rawParams[this.identifier]);
  }
}

function urlPattern() {
  return new UrlPattern();
}

let url = urlPattern().part("eventos").varNum("codigoEvento");

url.toLocation({codigoEvento: 3});
