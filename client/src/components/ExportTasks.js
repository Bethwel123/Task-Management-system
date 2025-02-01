import React from 'react';
import { Button } from 'react-bootstrap';

function ExportTasks({ tasks }) {
  const exportToCSV = () => {
    const headers = ['Title', 'Description', 'Priority', 'Due Date', 'Status'];
    const csvContent = [
      headers.join(','),
      ...tasks.map(task => [
        task.title,
        task.description,
        task.priority,
        task.due_date,
        task.completed ? 'Completed' : 'Pending'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.csv';
    a.click();
  };

  return (
    <Button className="export-add" variant="outline-secondary" onClick={exportToCSV}>
      Export Tasks
    </Button>
  );
}

export default ExportTasks;
