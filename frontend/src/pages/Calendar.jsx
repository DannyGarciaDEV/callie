import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, parseISO, isBefore, startOfDay } from 'date-fns';
import axios from 'axios';
import '../styles/Calendar.css';

const API_URL = '/api';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const [todayEntry, setTodayEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEntries();
    fetchTodayEntry();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${API_URL}/entries`);
      setEntries(response.data);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodayEntry = async () => {
    try {
      const response = await axios.get(`${API_URL}/entries/today/entry`);
      setTodayEntry(response.data);
    } catch (error) {
      // No entry for today is okay
      setTodayEntry(null);
    }
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get entries as a map for quick lookup
  const entriesMap = new Map(entries.map(entry => [entry.date, entry]));

  const handleDateClick = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    const today = startOfDay(new Date());
    const clickedDate = startOfDay(date);

    // Only allow clicking on today or past dates
    if (!isBefore(clickedDate, today) && !isToday(date)) {
      return; // Future dates are locked
    }

    navigate(`/entry/${dateStr}`);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isDateLocked = (date) => {
    const today = startOfDay(new Date());
    const checkDate = startOfDay(date);
    return isBefore(today, checkDate) && !isToday(date);
  };

  const hasEntry = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return entriesMap.has(dateStr);
  };

  if (loading) {
    return (
      <div className="calendar-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <h1 className="calendar-title">Callie's Love Calendar</h1>
        {todayEntry && (
          <div className="today-message-preview fade-in">
            <h2>Today's Message</h2>
            <p className="preview-text">{todayEntry.message.substring(0, 150)}...</p>
            <button 
              className="read-today-btn"
              onClick={() => navigate(`/entry/${todayEntry.date}`)}
            >
              Read Full Message
            </button>
          </div>
        )}
      </header>

      <div className="calendar-wrapper">
        <div className="calendar-nav">
          <button onClick={goToPreviousMonth} className="nav-btn">‹</button>
          <h2 className="month-year">{format(currentDate, 'MMMM yyyy')}</h2>
          <button onClick={goToNextMonth} className="nav-btn">›</button>
        </div>

        <div className="calendar-grid">
          <div className="calendar-weekdays">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>

          <div className="calendar-days">
            {daysInMonth.map((day, index) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const locked = isDateLocked(day);
              const hasEntryForDate = hasEntry(day);
              const isTodayDate = isToday(day);

              return (
                <div
                  key={index}
                  className={`calendar-day ${locked ? 'locked' : ''} ${hasEntryForDate ? 'has-entry' : ''} ${isTodayDate ? 'today' : ''}`}
                  onClick={() => !locked && handleDateClick(day)}
                  style={{ cursor: locked ? 'not-allowed' : 'pointer' }}
                >
                  <span className="day-number">{format(day, 'd')}</span>
                  {hasEntryForDate && <span className="entry-indicator">♥</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calendar;

