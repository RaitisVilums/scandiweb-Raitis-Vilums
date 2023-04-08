import "./attribute-set.styles.scss";
import React, { PureComponent, Fragment } from "react";

export class AttributeSet extends PureComponent {
  render() {
    const { attribute, item, selectedAttribute, handleChange } = this.props;

    return (
      <Fragment>
        {attribute.type === "text" && (
          <Fragment>
            <input
              id={`${attribute.id}-${item.value}`}
              className="input-checkbox"
              type="checkbox"
              name={attribute.id}
              value={item.value}
              checked={selectedAttribute[attribute.id] === item.value}
              onChange={handleChange}
            />
            <label
              htmlFor={`${attribute.id}-${item.value}`}
              className="input-attribute"
            >
              {item.value}
            </label>
          </Fragment>
        )}
        {attribute.type === "swatch" && (
          <Fragment>
            <input
              id={`${attribute.id}-${item.value}`}
              className="input-checkbox"
              type="checkbox"
              name={attribute.id}
              value={item.value}
              checked={selectedAttribute[attribute.id] === item.value}
              onChange={handleChange}
            />
            <label
              htmlFor={`${attribute.id}-${item.value}`}
              className="input-color"
            >
              <div style={{ backgroundColor: item.value }} />
            </label>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default AttributeSet;
