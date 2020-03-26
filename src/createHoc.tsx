import React, { ComponentType } from "react";

export function DragDropHOC<P>(WrappedComponent: WrappedComponent<P>) : React.ComponentClass<P> {
    return class MyComponent extends React.Component<P> {
      render() {
        return (
          <WrappedComponent {...this.props as P}>
            {this.props.children}
          </WrappedComponent>
        );
      }
    }
}


export type WrappedComponentFactory<P> = (props: P) => JSX.Element;

export type WrappedComponent<P> = React.ComponentClass<P> | WrappedComponentFactory<P>;

// const hoc = <P extends object>(Component: React.ComponentType<P>) =>
//   class WithLoading extends React.Component<P> {
//     render() {
//         return (
//         <div>
//         <Component {...this.props as P}>
//             { this.props.children}
//         </Component>
//     </div>);
//     }
//   };

