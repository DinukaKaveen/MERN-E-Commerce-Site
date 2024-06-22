
import React from 'react';
import PropTypes from 'prop-types';

const ExampleCarouselImage = ({ imageUrl, altText }) => {
  return (
    <div className="carousel-image">
      <img
        className="d-block w-100"
        src={imageUrl}
        alt={altText}
      />
    </div>
  );
};

ExampleCarouselImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

export default ExampleCarouselImage;
