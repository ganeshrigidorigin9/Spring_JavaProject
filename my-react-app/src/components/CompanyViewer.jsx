import React, { useState } from 'react';
import axios from 'axios';
import './CompanyViewer.css'; // reuse the same styles

function CompanyViewer() {
  const [companies, setCompanies] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchedCompany, setSearchedCompany] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/companies');
      setCompanies(res.data);
    } catch (err) {
      console.error('Error fetching companies', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyById = async () => {
    if (!searchId.trim()) return;
    try {
      const res = await axios.get(`http://localhost:8080/companies/${searchId}`);
      setSearchedCompany(res.data);
    } catch (err) {
      console.error('Company not found', err);
      setSearchedCompany({ error: `Company with ID ${searchId} not found.` });
    }
  };

  return (
    <div className="company-list-container">
      <h2 className="company-heading">Company Viewer</h2>

      <button className="load-button" onClick={fetchCompanies}>
        Load All Companies
      </button>

      {loading && <p>Loading companies...</p>}

      {companies.length > 0 && (
        <div className="companies-grid">
          {companies.map((company) => (
            <div className="company-card" key={company.id}>
              <h3>{company.name}</h3>
              <p>{company.description}</p>

              {company.jobs && company.jobs.length > 0 ? (
                <ul className="job-list">
                  {company.jobs.map((job) => (
                    <li key={job.id}>
                      <strong>{job.title}</strong> — {job.location}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontStyle: 'italic' }}>No jobs posted.</p>
              )}
            </div>
          ))}
        </div>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h3>Search Company by ID</h3>
      <input
        type="text"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="Enter Company ID"
        style={{ padding: '0.5rem', marginRight: '1rem' }}
      />
      <button onClick={fetchCompanyById} className="load-button">Search</button>

      {searchedCompany && (
        <div style={{ marginTop: '1rem' }}>
          {searchedCompany.error ? (
            <p style={{ color: 'red' }}>{searchedCompany.error}</p>
          ) : (
            <div className="company-card">
              <h3>{searchedCompany.name}</h3>
              <p>{searchedCompany.description}</p>
              {searchedCompany.jobs && searchedCompany.jobs.length > 0 ? (
                <ul className="job-list">
                  {searchedCompany.jobs.map((job) => (
                    <li key={job.id}>
                      <strong>{job.title}</strong> — {job.location}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ fontStyle: 'italic' }}>No jobs posted.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CompanyViewer;

