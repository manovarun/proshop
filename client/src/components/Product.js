import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product, match }) => {
  const { _id, name, image, rating, numReviews, price } = product;
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} variant="top" className="img-fluid"></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/product/${_id}`}>
          <Card.Title as="div" style={{ height: '42px' }}>
            <strong>{name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            {rating} from {numReviews} reviews
          </div>
          <Rating value={rating} text={`${numReviews} reviews`} />
        </Card.Text>
        <Card.Text as="h3" className="py-3">
          ${price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default withRouter(Product);
