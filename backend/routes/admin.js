import express from 'express';
import Entry from '../models/Entry.js';
import { authenticateAdmin } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require authentication
router.use(authenticateAdmin);

// POST create new entry
router.post('/entries', async (req, res) => {
  try {
    const { date, message, images } = req.body;

    if (!date || !message) {
      return res.status(400).json({ error: 'Date and message are required' });
    }

    // Check if entry already exists for this date
    const existingEntry = await Entry.findOne({ date });
    if (existingEntry) {
      return res.status(400).json({ error: 'Entry already exists for this date' });
    }

    const entry = new Entry({
      date,
      message,
      images: images || [],
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update entry by ID
router.put('/entries/:id', async (req, res) => {
  try {
    const { message, images } = req.body;
    const entry = await Entry.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    if (message) entry.message = message;
    if (images) entry.images = images;

    entry.updatedAt = Date.now();
    await entry.save();

    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE entry by ID
router.delete('/entries/:id', async (req, res) => {
  try {
    const entry = await Entry.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all entries (admin view with IDs)
router.get('/entries', async (req, res) => {
  try {
    const entries = await Entry.find().sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET entry by ID (admin view)
router.get('/entries/:id', async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ error: 'Entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;

