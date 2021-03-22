import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './FormContainer';
import {
  createProduct,
  listProductDetails,
  updateProduct,
} from '../redux/actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
} from '../redux/constants/productConstants';
import axios from 'axios';

const CreateEditProductScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector(({ UserLogin }) => UserLogin);
  const {
    userInfo: { isAdmin },
  } = userLogin;

  const productCreate = useSelector(({ ProductCreate }) => ProductCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;

  const productUpdate = useSelector(({ ProductUpdate }) => ProductUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const productDetails = useSelector(({ ProductDetails }) => ProductDetails);
  const {
    loading: loadingDetail,
    error: errorDetail,
    success: successDetail,
    product,
  } = productDetails;

  useEffect(() => {
    if (!isAdmin) {
      history.push('/');
    }

    if (successCreate || successUpdate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push(`/admin/productlist`);
    } else {
      if (productId) {
        if (!product.name || product._id !== productId) {
          dispatch(listProductDetails(productId));
        } else {
          setName(product.name);
          setPrice(product.price);
          setImage(product.image);
          setBrand(product.brand);
          setCountInStock(product.countInStock);
          setCategory(product.category);
          setDescription(product.description);
        }
      }
    }
  }, [
    dispatch,
    product,
    history,
    productId,
    successCreate,
    successUpdate,
    isAdmin,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!productId) {
      dispatch(
        createProduct({
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          description,
        })
      );
    } else {
      dispatch(
        updateProduct({
          _id: productId,
          name,
          price,
          image,
          brand,
          category,
          countInStock,
          description,
        })
      );
      dispatch(listProductDetails(productId));
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'mulitpart/form-data',
        },
      };

      const { data } = await axios.post(`/api/upload`, formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Link to={`/admin/productlist`} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>{productId ? 'Update' : 'Create'} Product</h1>
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {successCreate && <Message variant="success">Product Created</Message>}
        {loadingCreate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {successUpdate && <Message variant="success">Product Updated</Message>}
        {loadingUpdate && <Loader />}
        {errorDetail && <Message variant="danger">{errorDetail}</Message>}
        {successDetail && <Message variant="success">Product Loaded</Message>}
        {loadingDetail && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.File
              id="image-file"
              label="Choose File"
              custom
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            {productId ? 'Update' : 'Create'} Product
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default CreateEditProductScreen;
