import React, { useState } from 'react';
import axios from 'axios';
import './JobViewer.css'; // Reuse the same CSS

function JobViewer() {
  const [jobs, setJobs] = useState([]);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchedJob, setSearchedJob] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    setSearchedJob([]);
    setSearched(false);
    try {
      const res = await axios.get('http://localhost:8080/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchJobByTitle = async () => {
    if (!searchTitle.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await axios.get(`http://localhost:8080/searchJob?title=${searchTitle}`);
      if (Array.isArray(res.data) && res.data.length > 0) {
        setSearchedJob(res.data);
        setJobs([]);
      } else {
        setSearchedJob([]);
      }
    } catch (err) {
      console.error('Job search error', err);
      setSearchedJob([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Job-list-container">
      <h2 className="Job-heading">Job Viewer</h2>

      <button className="load-button" onClick={fetchJobs}>
        Load All Jobs
      </button>

      {loading && <p>Loading jobs...</p>}

      {jobs.length > 0 && (
        <div className="Jobs-grid">
          {jobs.map((job) => (
            <div className="Job-card" key={job.id}>
              <h3>{job.title}</h3>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> ₹{job.minSalary} - ₹{job.maxSalary}</p>
              <div className="CompanyInfo">
              <p><strong>Company:</strong> {job.company?.name}</p>
              <p><strong>Company_Description:</strong> {job.company?.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h3>Search Job by Name</h3>
      <input
        type="text"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        placeholder="Enter Job Role"
        className="company-id-input"
      />
      <button onClick={fetchJobByTitle} className="load-button">Search</button>

      {searchedJob.length > 0 ? (
        <div className="Jobs-grid">
          {searchedJob.map((job) => (
            <div className="Job-card" key={job.id}>
              <h3>{job.title}</h3>
              <p><strong>Description:</strong> {job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Salary:</strong> ₹{job.minSalary} - ₹{job.maxSalary}</p>
            
              <div className="CompanyInfo">
              <p><strong>Company:</strong> {job.company?.name}</p>
              <p><strong>Company_Description:</strong>
               {job.company?.description}
              </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        searched && searchedJob.length === 0 && (
          <p className="error-text">No jobs found for "{searchTitle}"</p>
        )
      )}
    </div>
  );
}

export default JobViewer;
