import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

function Dashboard({ tasks }) {
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    highPriority: tasks.filter(t => t.priority === 'high').length,
    dueToday: tasks.filter(t => {
      const today = new Date().toISOString().split('T')[0];
      return t.due_date?.split('T')[0] === today;
    }).length
  };

  return (
    <Row className="mb-4">
      <Col md={3}>
        <Card className="text-center bg-light mb-2" >
          <Card.Body>
            <h3>{stats.total}</h3>
            <p>Total Tasks</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center bg-success text-white mb-2">
          <Card.Body>
            <h3>{stats.completed}</h3>
            <p>Completed</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center bg-danger text-white mb-2">
          <Card.Body>
            <h3>{stats.highPriority}</h3>
            <p>High Priority</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default Dashboard;
