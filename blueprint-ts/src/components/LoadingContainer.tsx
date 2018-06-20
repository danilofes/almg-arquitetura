import { Spinner } from "@blueprintjs/core";
import * as React from "react";
import "./LoadingContainer.css";


export function withLoading<T, U>(mapPropsToPromise: (props: T) => Promise<U>, WrappedComponent: React.ComponentType<U>) {
  return class extends React.Component<T, { loading: boolean, wrappedProps?: U }> {

    constructor(props: T) {
      super(props);
      this.state = {
        loading: false,
        wrappedProps: undefined
      };
    }

    public componentDidMount() {
      this.fetchData();
    }

    public componentDidUpdate(prevProps: T) {
      if (this.props !== prevProps) {
        this.fetchData();
      }
    }

    public render() {
      return <div className="almg-loading-ct">
        {this.state.loading ? <div className="almg-loading pt-elevation-2"><Spinner /></div> : null}
        {this.state.wrappedProps ? <WrappedComponent {...this.state.wrappedProps} /> : null}
      </div>;
    }

    private fetchData() {
      if (!this.state.loading) {
        this.setState({ loading: true });
        mapPropsToPromise(this.props)
          .then(wrappedProps => this.setState({
            loading: false,
            wrappedProps
          }));
      }
    }
  };
}
