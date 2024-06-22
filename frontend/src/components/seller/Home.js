import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage';

function Home() {
  return (
    <div>
      <Carousel fade>
        <Carousel.Item>
          <CarouselImage
            imageUrl="https://via.placeholder.com/800x400?text=first+slide"
            altText="first slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <CarouselImage
            imageUrl="https://via.placeholder.com/800x400?text=second+slide"
            altText="second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <CarouselImage
            imageUrl="https://via.placeholder.com/800x400?text=third+slide"
            altText="third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Home