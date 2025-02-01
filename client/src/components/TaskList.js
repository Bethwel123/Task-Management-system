import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ListGroup,
  Button,
  Card,
  Form,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import EditTaskModal from "./EditTaskModal";
import axios from "axios";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [filterPriority, setFilterPriority] = useState("all");
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5555/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const toggleComplete = async (taskId) => {
    try {
      const task = tasks.find((t) => t.id === taskId);
      const updatedTask = { ...task, completed: !task.completed };
      await axios.put(`http://localhost:5555/tasks/${taskId}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await axios.put(
        `http://localhost:5555/tasks/${updatedTask.id}`,
        updatedTask
      );
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setShowEditModal(true);
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5555/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "danger",
      medium: "warning",
      low: "info",
    };
    return colors[priority] || "secondary";
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const sortTasks = (tasksToSort) => {
    return tasksToSort.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case "due_date":
          return new Date(a.due_date) - new Date(b.due_date);
        default:
          return new Date(b.created_at) - new Date(a.created_at);
      }
    });
  };

  const filterTasks = () => {
    let filtered = [...tasks];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Priority filter
    if (filterPriority !== "all") {
      filtered = filtered.filter((task) => task.priority === filterPriority);
    }

    return sortTasks(filtered);
  };

  return (
    <Card>
      <Card.Body>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Control
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Col>
          <Col md={4}>
            <Form.Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="created_at">Sort by Date Created</option>
              <option value="due_date">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </Form.Select>
          </Col>
        </Row>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ListGroup>
            {filterTasks().map((task) => (
              <ListGroup.Item
                key={task.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="task-content">
                  <h5
                    style={{
                      textDecoration: task.completed ? "line-through" : "none",
                    }}
                  >
                    {task.title}
                    <Badge
                      bg={getPriorityColor(task.priority)}
                      className="ms-2"
                    >
                      {task.priority}
                    </Badge>
                    {task.category && (
                      <Badge bg="secondary" className="ms-2">
                        {task.category}
                      </Badge>
                    )}
                  </h5>
                  <p className="mb-1">{task.description}</p>
                  {task.due_date && (
                    <small className="text-muted">
                      Due: {formatDate(task.due_date)}
                    </small>
                  )}
                </div>
                <div className="task-actions">
                  <Button
                    variant={task.completed ? "success" : "outline-success"}
                    className="me-2"
                    onClick={() => toggleComplete(task.id)}
                  >
                    ✓
                  </Button>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEditClick(task)}
                  >
                    ✎
                  </Button>
                  <Button variant="danger" onClick={() => deleteTask(task.id)}>
                    ×
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </motion.div>

        {selectedTask && (
          <EditTaskModal
            show={showEditModal}
            handleClose={() => setShowEditModal(false)}
            task={selectedTask}
            handleUpdate={handleUpdateTask}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default TaskList;
