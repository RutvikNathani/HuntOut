import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-primary text-light py-4'>
      <Container>
        <Row>
          <Col xs={12} md={3} className='mb-4'>
            <h5>Get to Know Us</h5>
            <ul className='list-unstyled'>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press Releases</li>
            </ul>
          </Col>
          <Col xs={12} md={3} className='mb-4'>
            <h5>Make Money with Us</h5>
            <ul className='list-unstyled'>
              <li>Sell on Huntout</li>
              <li>Sell under Huntout</li>
              <li>Become an Affiliate</li>
              <li>Fulfilment by Huntout</li>
            </ul>
          </Col>
          <Col xs={12} md={3} className='mb-4'>
            <h5>Huntout Payment Products</h5>
            <ul className='list-unstyled'>
              <li>Huntout Business Card</li>
              <li>Shop with Points</li>
              <li>Reload Your Balance</li>
            </ul>
          </Col>
          <Col xs={12} md={3} className='mb-4'>
            <h5>Let Us Help You</h5>
            <ul className='list-unstyled'>
              <li>Your Account</li>
              <li>Your Orders</li>
              <li>Shipping Rates & Policies</li>
              <li>Returns & Replacements</li>
              <li>Manage Your Content and Devices</li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className='text-center py-3'>
            <p> Huntout Shoppig website &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
