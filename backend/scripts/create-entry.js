import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Entry from '../models/Entry.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

const message = `My beautiful Callie,

Today I want to tell you how incredibly proud I am of you. You are not just pretty—you are absolutely stunning, inside and out. Your beauty radiates from your soul, and every day I'm amazed by the person you are.

You are so strong, so kind, and so incredibly special. I'm so proud to be yours, and I'm so proud of everything you do. You light up my world in ways I never knew were possible.

You are beautiful, you are loved, and you are so very important to me.

Forever yours,
Danny ❤️`;

async function createEntry() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if entry already exists
    const existingEntry = await Entry.findOne({ date: '2025-12-03' });
    if (existingEntry) {
      console.log('⚠️  Entry for December 3, 2025 already exists!');
      console.log('Current message:', existingEntry.message.substring(0, 50) + '...');
      console.log('\nTo update it, use the admin panel or delete it first.');
      process.exit(0);
    }

    // Create new entry
    const entry = new Entry({
      date: '2025-12-03',
      message: message,
      images: [],
    });

    await entry.save();
    console.log('✅ Successfully created entry for December 3, 2025!');
    console.log('\nEntry details:');
    console.log('Date:', entry.date);
    console.log('Message length:', entry.message.length, 'characters');
    console.log('Images:', entry.images.length);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating entry:', error);
    process.exit(1);
  }
}

createEntry();

