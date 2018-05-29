import { Spinner } from "@blueprintjs/core";
import * as React from "react";
import "./LoadingContainer.css";


export function withLoading<T, U>(mapPropsToPromise: (props: T) => Promise<U>, WrappedComponent: React.ComponentType<U>) {
  return class extends React.Component<T, { loading: boolean, wrappedProps?: U }> {

    constructor(props: T) {
      super(props);
      this.state = {
        loading: true,
        wrappedProps: undefined
      };
    }

    public componentDidMount() {
      mapPropsToPromise(this.props)
        .then(wrappedProps => this.setState({
          loading: false,
          wrappedProps: wrappedProps
        }));
    }

    public componentWillUnmount() {
      //
    }

    public componentDidUpdate(prevProps: T) {
      //
      // console.log("componentDidUpdate");
      // console.log(JSON.stringify(this.props.match));
    }

    public render() {
      return <div className="almg-loading-ct">
        {this.state.loading ? <div className="almg-loading pt-elevation-2"><Spinner /></div> : null}
        {this.state.wrappedProps ? <WrappedComponent {...this.state.wrappedProps} /> : null}
      </div>;
    }
  };
}
