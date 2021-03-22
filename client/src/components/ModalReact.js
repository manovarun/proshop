import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Row, Button, Col, Form, Card } from 'react-bootstrap';

class ModalReact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
  }

  handleShowModal() {
    this.setState({
      show: true,
    });
  }

  handleClose() {
    this.setState({
      show: false,
    });
  }

  renderModal() {
    return (
      <Modal show={this.state.show} onHide={this.handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to transfer funds to John Doe. Do you wish to continue?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleClose}>
            Proceed
          </Button>
          <Button variant="danger" onClick={this.handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    return (
      <Row className="justify-content-md-center">
        <Col lg={4}>
          <Card style={{ width: '20rem' }}>
            <Card.Body>
              <Card.Text>
                <Form>
                  <Form.Group controlId="formBasicName">
                    <Form.Label>Transfer Funds</Form.Label>
                    <Form.Control type="name" placeholder="Enter Name" />
                  </Form.Group>
                  <Form.Group controlId="formBasicAmount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type="number" placeholder="Amount" />
                  </Form.Group>
                  <Button variant="primary" onClick={this.handleShowModal}>
                    Transfer
                  </Button>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>{this.renderModal()}</Col>
      </Row>
    );
  }
}

export default ModalReact;
