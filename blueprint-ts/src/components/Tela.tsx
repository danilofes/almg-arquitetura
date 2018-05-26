import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Spinner } from "@blueprintjs/core";

export function tela<T, U>(WrappedComponent: React.ComponentType<U>, fetchFn: (params: T) => Promise<U>) {
  return class extends React.Component<RouteComponentProps<T>, { loading: boolean, dto?: U }> {

    constructor(props: RouteComponentProps<T>) {
      super(props);
      this.state = {
        loading: true,
        dto: undefined
      };
    }

    public componentDidMount() {
      fetchFn(this.props.match.params)
        .then(dto => this.setState({
          loading: false,
          dto: dto
        }));
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
      if (this.state.dto) {
        if (this.state.loading) {
          return <div>
            <Spinner />
            <WrappedComponent {...this.state.dto!} />
          </div>;
        } else {
          return <WrappedComponent {...this.state.dto!} />
        }
      } else {
        return <Spinner />;
      }
    }
  };
}