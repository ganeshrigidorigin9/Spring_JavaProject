import React, { useState } from 'react';
import axios from 'axios';
import './CompanyManager.css';

function CompanyManager() {
  const [company, setCompany] = useState({ name: '', description: '' });
  const [updateData, setUpdateData] = useState({ id: '', name: '', description: '' });
  const [deleteId, setDeleteId] = useState('');

  // For add form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompany({ ...company, [name]: value });
  };

  // For update form
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handlePost = async () => {
    try {
      await axios.post('http://localhost:8080/companies/companyPost', company);
      alert('✅ Company added!');
      setCompany({ name: '', description: '' });
    } catch (err) {
      alert('❌ Failed to add company');
    }
  };

  const handleUpdate = async () => {
    const { id, name, description } = updateData;
    if (!id) {
      alert('Please enter the Company ID to update');
      return;
    }
    try {
      await axios.put(`http://localhost:8080/companies/${id}`, { name, description });
      alert('✅ Company updated!');
      setUpdateData({ id: '', name: '', description: '' });
    } catch (err) {
      alert('❌ Update failed');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) {
      alert('Please enter the Company ID to delete');
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/companies/${deleteId}`);
      alert('✅ Company deleted!');
      setDeleteId('');
    } catch (err) {
      alert('❌ Delete failed');
    }
  };

  return (
    <div className="company-manager-container">
      <h2 className="section-title">Add Company</h2>

      <input
        className="input-field"
        type="text"
        name="name"
        placeholder="Company Name"
        value={company.name}
        onChange={handleChange}
      />

      <textarea
        className="textarea-field"
        name="description"
        placeholder="Company Description"
        value={company.description}
        onChange={handleChange}
      />

      <button className="btn btn-add" onClick={handlePost}>
        Add Company
      </button>

      <h3 className="section-subtitle">Update Company</h3>

      <input
        className="input-field"
        type="text"
        name="id"
        placeholder="Company ID to Update"
        value={updateData.id}
        onChange={handleUpdateChange}
      />

      <input
        className="input-field"
        type="text"
        name="name"
        placeholder="New Company Name"
        value={updateData.name}
        onChange={handleUpdateChange}
      />

      <textarea
        className="textarea-field"
        name="description"
        placeholder="New Company Description"
        value={updateData.description}
        onChange={handleUpdateChange}
      />

      <button className="btn btn-update" onClick={handleUpdate}>
        Update Company
      </button>

      <hr className="separator" />

      <h3 className="section-subtitle">Delete Company</h3>

      <input
        className="input-field"
        type="text"
        placeholder="Company ID to Delete"
        value={deleteId}
        onChange={(e) => setDeleteId(e.target.value)}
      />

      <button className="btn btn-delete" onClick={handleDelete}>
        Delete Company
      </button>
    </div>
  );
}

export default CompanyManager;
