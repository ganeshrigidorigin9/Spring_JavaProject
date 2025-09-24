import React, { useState } from 'react';
import axios from 'axios';
import './JobManager.css';

function JobManager() {
  const [job, setJob] = useState({
    title: '',
    description: '',
    location: '',
    minSalary: '',
    maxSalary: '',
    companyId: ''
  });
  const [updateId, setUpdateId] = useState('');
  const [deleteId, setDeleteId] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handlePost = async () => {
    try {
      const payload = {
        title: job.title,
        description: job.description,
        location: job.location,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary,
        company: { id: Number(job.companyId) }
      };
      await axios.post('http://localhost:8080/jobsPost', payload);
      alert('✅ Job added!');
      setJob({ title: '', description: '', location: '', minSalary: '', maxSalary: '', companyId: '' });
    } catch (error) {
      alert('❌ Failed to add job');
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    if (!updateId.trim()) {
      alert('Please enter Job ID to update');
      return;
    }
    try {
      const payload = {
        title: job.title,
        description: job.description,
        location: job.location,
        minSalary: job.minSalary,
        maxSalary: job.maxSalary,
        company: { id: Number(job.companyId) }
      };
      await axios.put(`http://localhost:8080/updateJob/${updateId}`, payload);
      alert('✅ Job updated!');
      setJob({ title: '', description: '', location: '', minSalary: '', maxSalary: '', companyId: '' });
      setUpdateId('');
    } catch (error) {
      alert('❌ Failed to update job');
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!deleteId.trim()) {
      alert('Please enter Job ID to delete');
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/deleteJob/${deleteId}`);
      alert('✅ Job deleted!');
      setDeleteId('');
    } catch (error) {
      alert('❌ Failed to delete job');
      console.error(error);
    }
  };

  return (
    <div className="job-manager-container">
      <h2>Add New Job</h2>

      <input
        className="input-field"
        type="text"
        name="title"
        placeholder="Job Title"
        value={job.title}
        onChange={handleChange}
      />

      <textarea
        className="textarea-field"
        name="description"
        placeholder="Job Description"
        value={job.description}
        onChange={handleChange}
      />

      <input
        className="input-field"
        type="text"
        name="location"
        placeholder="Location"
        value={job.location}
        onChange={handleChange}
      />

      <input
        className="input-field"
        type="number"
        name="minSalary"
        placeholder="Min Salary"
        value={job.minSalary}
        onChange={handleChange}
      />

      <input
        className="input-field"
        type="number"
        name="maxSalary"
        placeholder="Max Salary"
        value={job.maxSalary}
        onChange={handleChange}
      />

      <input
        className="input-field"
        type="text"
        name="companyId"
        placeholder="Company ID"
        value={job.companyId}
        onChange={handleChange}
      />

      <button className="btn btn-add" onClick={handlePost}>Add Job</button>

      <h3>Update Job</h3>

      <input
        className="input-field"
        type="text"
        placeholder="Job ID to Update"
        value={updateId}
        onChange={(e) => setUpdateId(e.target.value)}
      />

      {/* Reuse same inputs for update */}
      <input
        className="input-field"
        type="text"
        name="title"
        placeholder="Job Title"
        value={job.title}
        onChange={handleChange}
      />

      <textarea
        className="textarea-field"
        name="description"
        placeholder="Job Description"
        value={job.description}
        onChange={handleChange}
      />

      <input
        className="input-field"
        type="text"
        name="location"
        placeholder="Location"
        value={job.location}
        onChange={handleChange}
      />

      <input
        className="input-field"
        type="number"
        name="minSalary"
        placeholder="Min Salary"
        value={job.minSalary}
        onChange={handleChange}
      />

      <input
        className="input-field"
        type="number"
        name="maxSalary"
        placeholder="Max Salary"
        value={job.maxSalary}
        onChange={handleChange}
      />

      <input
        className="input-field"
        type="text"
        name="companyId"
        placeholder="Company ID"
        value={job.companyId}
        onChange={handleChange}
      />

      <button className="btn btn-update" onClick={handleUpdate}>Update Job</button>

      <hr className="separator" />

      <h3>Delete Job</h3>

      <input
        className="input-field"
        type="text"
        placeholder="Job ID to Delete"
        value={deleteId}
        onChange={(e) => setDeleteId(e.target.value)}
      />

      <button className="btn btn-delete" onClick={handleDelete}>Delete Job</button>
    </div>
  );
}

export default JobManager;
