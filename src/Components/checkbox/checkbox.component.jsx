import { Fragment, PureComponent } from "react";
import "./checkbox.styles.scss";

export class Checkbox extends PureComponent {
  render() {
    const { type, value, checked, className, classNameColor } = this.props;
    // console.log(type);
    return (
      <Fragment>
        {type === "text" && (
          <div
            className={`checkbox-text ${
              checked ? "text-checked " : ""
            } ${className} `}
          >
            <p>{value}</p>
          </div>
        )}
        {type === "swatch" && (
          <div
            className={`checkbox-color ${
              checked ? "color-checked " : ""
            } ${className} `}
          >
            <div
              className={
                classNameColor ? classNameColor : "checkbox-color-value"
              }
              style={{ backgroundColor: value }}
            ></div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Checkbox;
// className={`checkbox-color-value ${classNameColor}`}
