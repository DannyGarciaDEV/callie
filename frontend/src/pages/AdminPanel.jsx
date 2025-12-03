import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminPanel.css';

const API_URL = '/api';
const ADMIN_SECRET = 'dannylovescallie'; // Should be set via env in production

function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    date: '',
    message: '',
    images: [],
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Check if already authenticated (stored in sessionStorage)
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === ADMIN_SECRET) {
      setAuthenticated(true);
      fetchEntries();
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_SECRET) {
      setAuthenticated(true);
      sessionStorage.setItem('adminAuth', ADMIN_SECRET);
      fetchEntries();
    } else {
      alert('Incorrect password');
    }
  };

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/admin/entries`, {
        headers: {
          Authorization: `Bearer ${ADMIN_SECRET}`,
        },
      });
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
      alert('Error fetching entries');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images', file);
      });

      const response = await axios.post(`${API_URL}/upload/events/multiple`, formData, {
        headers: {
          Authorization: `Bearer ${ADMIN_SECRET}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...response.data.urls],
      }));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.message) {
      alert('Date and message are required');
      return;
    }

    try {
      if (editingEntry) {
        // Update existing entry
        await axios.put(
          `${API_URL}/admin/entries/${editingEntry._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${ADMIN_SECRET}`,
            },
          }
        );
        alert('Entry updated successfully');
      } else {
        // Create new entry
        await axios.post(
          `${API_URL}/admin/entries`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${ADMIN_SECRET}`,
            },
          }
        );
        alert('Entry created successfully');
      }

      // Reset form
      setFormData({ date: '', message: '', images: [] });
      setEditingEntry(null);
      fetchEntries();
    } catch (error) {
      console.error('Error saving entry:', error);
      alert(error.response?.data?.error || 'Error saving entry');
    }
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData({
      date: entry.date,
      message: entry.message,
      images: entry.images || [],
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/admin/entries/${id}`, {
        headers: {
          Authorization: `Bearer ${ADMIN_SECRET}`,
        },
      });
      alert('Entry deleted successfully');
      fetchEntries();
    } catch (error) {
      console.error('Error deleting entry:', error);
      alert('Error deleting entry');
    }
  };

  if (!authenticated) {
    return (
      <div className="admin-login">
        <div className="login-box">
          <h1>Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="password-input"
            />
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <button
          onClick={() => {
            setAuthenticated(false);
            sessionStorage.removeItem('adminAuth');
          }}
          className="logout-btn"
        >
          Logout
        </button>
      </header>

      <div className="admin-content">
        <section className="entry-form-section">
          <h2>{editingEntry ? 'Edit Entry' : 'Create New Entry'}</h2>
          <form onSubmit={handleSubmit} className="entry-form">
            <div className="form-group">
              <label>Date (YYYY-MM-DD)</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                disabled={!!editingEntry}
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows="10"
                placeholder="Write your love message here..."
              />
            </div>

            <div className="form-group">
              <label>Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              {uploading && <p className="upload-status">Uploading...</p>}

              {formData.images.length > 0 && (
                <div className="image-preview-list">
                  {formData.images.map((url, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={url} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="remove-image-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                {editingEntry ? 'Update Entry' : 'Create Entry'}
              </button>
              {editingEntry && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingEntry(null);
                    setFormData({ date: '', message: '', images: [] });
                  }}
                  className="cancel-btn"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="entries-list-section">
          <h2>All Entries ({entries.length})</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="entries-list">
              {entries.map((entry) => (
                <div key={entry._id} className="entry-card">
                  <div className="entry-card-header">
                    <h3>{entry.date}</h3>
                    <div className="entry-actions">
                      <button onClick={() => handleEdit(entry)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(entry._id)} className="delete-btn">
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="entry-preview">{entry.message.substring(0, 100)}...</p>
                  {entry.images && entry.images.length > 0 && (
                    <p className="entry-images-count">{entry.images.length} image(s)</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminPanel;

