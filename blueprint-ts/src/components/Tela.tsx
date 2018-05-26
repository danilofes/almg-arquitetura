import * as React from "react";
import { RouteComponentProps } from "react-router-dom";


export class Tela<T> extends React.Component<RouteComponentProps<T>> {

  public componentDidMount() {
    //
    // console.log("componentDidMount");
    // console.log(JSON.stringify(this.props.match));
  }

  public componentWillUnmount() {
    //
  }

  public componentDidUpdate(prevProps: RouteComponentProps<T>) {
    //
    // console.log("componentDidUpdate");
    // console.log(JSON.stringify(this.props.match));
  }

  public render() {
    return <div />
  }
}

export function tela<T, U>(comp: React.Component<U>): React.Component<RouteComponentProps<T>> {
  return Tela;
}