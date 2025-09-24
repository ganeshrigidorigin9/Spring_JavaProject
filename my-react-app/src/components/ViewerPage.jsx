import React, { useState } from 'react';
import CompanyViewer from './CompanyViewer';
import JobViewer from './JobViewer';
import './ViewerPage.css';

function ViewerPage() {
  const [activeView, setActiveView] = useState('companies'); // 'companies' or 'jobs'

  return (
    <div className="viewer-page-container">
      <div className="viewer-buttons">
        <button
          className={activeView === 'companies' ? 'active' : ''}
          onClick={() => setActiveView('companies')}
        >
          Company Viewer
        </button>
        <button
          className={activeView === 'jobs' ? 'active' : ''}
          onClick={() => setActiveView('jobs')}
        >
          Job Viewer
        </button>
      </div>

      <div className="viewer-content">
        {activeView === 'companies' && <CompanyViewer />}
        {activeView === 'jobs' && <JobViewer />}
      </div>
    </div>
  );
}

export default ViewerPage;
