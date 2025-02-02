import React from 'react';
import { ProgressBar } from 'react-bootstrap';

function TaskProgress({ tasks }) {
  const calculateProgress = () => {
    if (tasks.length === 0) return 0;
    return Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);
  };

  return (
    <div className="mb-4">
      <h5 className='overal-progress'>Overall Progress</h5>
      <ProgressBar>
        <ProgressBar variant="success" now={calculateProgress()} label={`${calculateProgress()}%`} />
      </ProgressBar>
    </div>
  );
}

export default TaskProgress;
