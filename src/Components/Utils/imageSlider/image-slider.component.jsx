import React, { PureComponent } from "react";

export class ProductImageSlider extends PureComponent {
  state = {
    currentIndex: 0,
  };

  handleIncrement = (increment) => {
    this.setState((prevState) => {
      let newIndex = prevState.currentIndex + increment;
      const { gallery } = this.props;

      if (newIndex < 0) {
        newIndex = 0;
      } else if (newIndex >= gallery.length) {
        newIndex = gallery.length - 1;
      }

      return { currentIndex: newIndex };
    });
  };

  render() {
    const { gallery, name } = this.props;

    return (
      <div className="checkout-product-image">
        <img src={gallery[this.state.currentIndex]} alt={name} />
        <div>
          <button
            className="btn-next left"
            onClick={() => this.handleIncrement(1)}
          ></button>
          <button
            className="btn-next right"
            onClick={() => this.handleIncrement(-1)}
          ></button>
        </div>
      </div>
    );
  }
}

export default ProductImageSlider;
