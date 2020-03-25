import React, { ComponentType } from "react";

const hoc = <P extends object>(Component: React.ComponentType<P>) =>
  class WithLoading extends React.Component<P> {
    render() {
        return (
        <div>
        <Component {...this.props as P}>
            { this.props.children}
        </Component>
    </div>);
    }
  };

const Username = class Username extends React.Component {
    public render() {
        return (
        <div>{this.props.children}</div>
        );
    }
} 

export const UpperCaseName = hoc(Username);