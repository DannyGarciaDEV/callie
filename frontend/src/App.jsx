import { Routes, Route } from 'react-router-dom';
import Calendar from './pages/Calendar';
import MessageReader from './pages/MessageReader';
import AdminPanel from './pages/AdminPanel';
import './App.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/entry/:date" element={<MessageReader />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;

