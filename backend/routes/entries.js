import express from 'express';
import Entry from '../models/Entry.js';

const router = express.Router();

// GET all entries (sorted by date, newest first)
router.get('/', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET entry by date (format: YYYY-MM-DD)
router.get('/:date', async (req, res) => {
  try {
    const entry = await Entry.findOne({ date: req.params.date });
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET today's entry
router.get('/today/entry', async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const entry = await Entry.findOne({ date: today });
    if (!entry) {
      return res.status(404).json({ error: 'No entry for today' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

