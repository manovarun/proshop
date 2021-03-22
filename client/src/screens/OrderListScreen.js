import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Table } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listOrders } from '../redux/actions/orderActions';
import { LinkContainer } from 'react-router-bootstrap';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(({ UserLogin }) => UserLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector(({ OrderList }) => OrderList);
  const { loading, error, orders } = orderList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead className="bg-dark text-light">
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>VIEW</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((order) => (
                <tr key={order._id}>
                  <td style={{ width: '200px' }}>
                    <Link to={`/order/${order._id}`}>{order._id}</Link>
                  </td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{ color: 'red', pointer: 'cursor' }}
                      ></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{ color: 'red', pointer: 'cursor' }}
                      ></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
