import React, { useEffect } from 'react';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { deleteProduct, listProducts } from '../redux/actions/productActions';

const ProductListScreen = ({ match, history }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const userLogin = useSelector(({ UserLogin }) => UserLogin);
  const { userInfo } = userLogin;

  const productList = useSelector(({ ProductList }) => ProductList);
  const { loading, error, products, pages, page } = productList;

  const productDelete = useSelector(({ ProductDelete }) => ProductDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts('', pageNumber));
    } else {
      history.push('/');
    }
  }, [dispatch, userInfo, history, successDelete, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id));
    }
  };

  const editHandler = () => {
    history.push(`/admin/createproduct`);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={() => editHandler()}>
            <i className="fa fa-plus mr-2"></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead className="bg-dark text-light">
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>CONTROLS</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <Link to={`/product/${product._id}`}>{product._id}</Link>
                    </td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button
                          variant="primary"
                          type="button"
                          className="btn btn-sm mr-2"
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        type="button"
                        className="btn btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
