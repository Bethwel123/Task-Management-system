import React from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';

function Dashboard({ tasks }) {
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    highPriority: tasks.filter((t) => t.priority === 'high').length,
    dueToday: tasks.filter((t) => {
      const today = new Date().toISOString().split('T')[0];
      return t.due_date?.split('T')[0] === today;
    }).length,
  };

  return (
    <Container>
      <Row className="g-3 justify-content-center">
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center bg-light">
            <Card.Body>
              <h3>{stats.total}</h3>
              <p>Total Tasks</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center bg-success text-white">
            <Card.Body>
              <h3>{stats.completed}</h3>
              <p>Completed</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center bg-danger text-white">
            <Card.Body>
              <h3>{stats.highPriority}</h3>
              <p>High Priority</p>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Card className="text-center bg-warning text-dark">
            <Card.Body>
              <h3>{stats.dueToday}</h3>
              <p>Due Today</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
