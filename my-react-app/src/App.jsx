import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ViewerPage from './components/ViewerPage';
import CompanyManager from './components/CompanyManager';
import JobManager from './components/JobManager';
import Auth from './components/auth/Auth'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/viewer" element={<ViewerPage />} />
        <Route path="/company-manager" element={<CompanyManager />} />
        <Route path="/job-manager" element={<JobManager />} />
        <Route path="/auth" element={<Auth/>}/>
      </Routes>
    </Router>
  );
}

export default App;


