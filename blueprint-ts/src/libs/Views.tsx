import { parse } from "query-string";
import * as React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import { UrlPattern } from './UrlPattern';

export class Views {
  readonly routes: Array<React.ReactNode> = [];

  viewWithParams<T>(url: UrlPattern<T>, Component: React.ComponentType<T>) {
    let view = new View(url, Component);
    this.routes.push(view.route);
    return view;
  }

  view(url: UrlPattern<{}>, Component: React.ComponentType<{}>) {
    let view = new SimpleView(url, Component);
    this.routes.push(view.route);
    return view;
  }

}

class View<T> {
  constructor(private url: UrlPattern<T>, private Component: React.ComponentType<T>) { }

  readonly route: React.ReactNode = <Route exact={true} key={this.url.toPathPattern()} path={this.url.toPathPattern()} render={(props) => <this.Component {...parseParams(props, this.url)} />} />;

  link(params: T) {
    return this.url.toLocation(params);
  }
}

class SimpleView extends View<{}> {
  constructor(url: UrlPattern<{}>, Component: React.ComponentType<{}>) {
    super(url, Component);
  }

  link(params: {} = {}) {
    return super.link(params);
  }
}

function parseParams<T>(props: RouteComponentProps<any>, url: UrlPattern<T>): T {
  let rawParams = { ...props.match.params, ...parse(props.location.search) };
  return url.parseParams(rawParams);
}

