import React from 'react';
import { Container } from 'react-bootstrap';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import Dashboard from './components/Dashboard';
import TaskProgress from './components/ProgressBar';
import ExportTasks from './components/ExportTasks';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [categories] = React.useState([]);




  const refreshTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5555/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } 
  };

  React.useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Task Management System</h1>
      
      <Dashboard tasks={tasks} />
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <TaskProgress tasks={tasks} />
        <ExportTasks tasks={tasks} />
      </div>


      <AddTask onTaskAdded={refreshTasks} categories={categories} />
      
      <TaskList 
        tasks={tasks} 
        onTasksUpdated={refreshTasks}
        categories={categories}
      />
    </Container>
  );
}

export default App;
