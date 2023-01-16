import React, { PureComponent, createRef } from "react";
import "./button.styles.scss";

export class Button extends PureComponent {
  constructor(props) {
    super(props);
    this.ref = createRef();
  }

  // Reusable btn component
  render() {
    const { href, download, target, onClick, children, className, onSubmit } =
      this.props;
    const classN = `btn ${className}`;

    return (
      <button
        ref={this.ref}
        href={href}
        download={download}
        className={classN}
        target={target}
        onClick={onClick}
        onSubmit={onSubmit}
      >
        {children}
      </button>
    );
  }
}

export default Button;
