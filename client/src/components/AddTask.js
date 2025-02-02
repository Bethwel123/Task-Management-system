import React, { useState } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function AddTask({onTaskAdded}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState(null);
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5555/tasks', {
        title,
        description,
        completed: false,
        priority,
        due_date: dueDate,
        category
      });
      // Reset form
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate(null);
      setCategory('');

      // Fetch the updated task list
      onTaskAdded();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Task Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Work, Personal, Shopping"
                />
              </Form.Group>
            </Col>
          </Row>
          
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <DatePicker
                  selected={dueDate}
                  onChange={(date) => setDueDate(date)}
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Select due date"
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Add Task
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default AddTask;
