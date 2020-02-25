import React from "react";
import { Transition } from "react-transition-group";

export const duration = 50;

export const defaultStyle = {
  transition: `opacity ${duration}ms ease-in`,
  opacity: 0
};

export const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
};

const Fade = ({ in: inProp, children }) => (
  <Transition in={inProp} timeout={duration} unmountOnExit>
    {state => (
      <div
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}
      >
        {children}
      </div>
    )}
  </Transition>
);

export default Fade;
