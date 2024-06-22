import React from 'react';
import './css/Home.css';

import Carousel from 'react-bootstrap/Carousel';
import CarouselImage from './CarouselImage';

import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

function Home() {
  return (
    <div>
      <Carousel fade>
        <Carousel.Item>
          <CarouselImage
            imageUrl="/images/carousel/slide_1.jpg"
            altText="first slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <CarouselImage
            imageUrl="/images/carousel/slide_2.jpg"
            altText="second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <CarouselImage
            imageUrl="/images/carousel/slide_3.jpg"
            altText="third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <Container>
        <Row className="justify-content-center custom-row">
          <Col className="custom-col">
            <Image src="/images/category/category_1.jpg" roundedCircle />
            <h6>Category 1</h6>
          </Col>
          <Col className="custom-col">
            <Image src="/images/category/category_1.jpg" roundedCircle />
            <h6>Category 2</h6>
          </Col>
          <Col className="custom-col">
            <Image src="/images/category/category_1.jpg" roundedCircle />
            <h6>Category 3</h6>
          </Col>
          <Col className="custom-col">
            <Image src="/images/category/category_1.jpg" roundedCircle />
            <h6>Category 4</h6>
          </Col>
          <Col className="custom-col">
            <Image src="/images/category/category_1.jpg" roundedCircle />
            <h6>Category 5</h6>
          </Col>
        </Row>
      </Container>

      <Card className="bg-dark text-grey custom-card">
        <Card.Img src="/images/banner/banner_1.jpg" alt="Card image" />
        <Card.ImgOverlay className="custom-overlay">
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.ImgOverlay>
      </Card>

      <CardGroup>
        <Card className="custom-card-group">
          <Card.Img variant="top" src="/images/product/product_1.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Card className="custom-card-group">
          <Card.Img variant="top" src="/images/product/product_1.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Card className="custom-card-group">
          <Card.Img variant="top" src="/images/product/product_1.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Card className="custom-card-group">
          <Card.Img variant="top" src="/images/product/product_1.jpg" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}

export default Home