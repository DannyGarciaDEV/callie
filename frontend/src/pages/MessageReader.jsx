import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import '../styles/MessageReader.css';

const API_URL = '/api';

function MessageReader() {
  const { date } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchEntry();
  }, [date]);

  const fetchEntry = async () => {
    try {
      const response = await axios.get(`${API_URL}/entries/${date}`);
      setEntry(response.data);
    } catch (error) {
      console.error('Error fetching entry:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    try {
      const parsed = parseISO(dateStr);
      return format(parsed, 'EEEE, MMMM d, yyyy');
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="message-reader-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="message-reader-container">
        <div className="error-message">
          <h2>No entry found for this date</h2>
          <button onClick={() => navigate('/')} className="back-btn">
            Back to Calendar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="message-reader-container fade-in">
      <button onClick={() => navigate('/')} className="back-btn">
        ← Back to Calendar
      </button>

      <article className="message-article">
        <header className="message-header">
          <h1 className="message-date">{formatDate(entry.date)}</h1>
        </header>

        <div className="message-content">
          <p className="message-text">{entry.message}</p>
        </div>

        {entry.images && entry.images.length > 0 && (
          <div className="message-images">
            <h2 className="images-title">Photos</h2>
            <div className="image-gallery">
              {entry.images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="image-item"
                  onClick={() => setSelectedImage(imageUrl)}
                >
                  <img
                    src={imageUrl}
                    alt={`Photo ${index + 1} for ${entry.date}`}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>

      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedImage(null)}>
              ×
            </button>
            <img src={selectedImage} alt="Full size" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageReader;

