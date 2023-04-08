import "./image-gallery.styles.scss";
import React, { PureComponent } from "react";

export class ImageGallery extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    };
  }

  handleImageClick = (index) => {
    this.setState({ currentImageIndex: index });
  };

  render() {
    const { gallery, name } = this.props;
    const { currentImageIndex } = this.state;

    return (
      <div className="image-gallery">
        <div className="image-gallery-small">
          {gallery.map((image, index) => (
            <img
              className="small"
              src={image}
              alt={name}
              key={`image-${index}`}
              onClick={() => this.handleImageClick(index)}
            />
          ))}
        </div>

        <img className="big" src={gallery[currentImageIndex]} alt={name} />
      </div>
    );
  }
}

export default ImageGallery;
