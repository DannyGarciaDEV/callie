#!/usr/bin/env node

import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Verifying Callie Love Calendar Setup...\n');

const checks = [];

// Check 1: Backend server.js
const backendServer = join(__dirname, 'backend', 'server.js');
if (existsSync(backendServer)) {
  const content = readFileSync(backendServer, 'utf-8');
  if (content.includes('Callie Love Calendar API')) {
    checks.push({ name: 'Backend server.js', status: '✅', message: 'Correct' });
  } else {
    checks.push({ name: 'Backend server.js', status: '❌', message: 'Wrong content' });
  }
} else {
  checks.push({ name: 'Backend server.js', status: '❌', message: 'File missing' });
}

// Check 2: Frontend App.jsx
const frontendApp = join(__dirname, 'frontend', 'src', 'App.jsx');
if (existsSync(frontendApp)) {
  const content = readFileSync(frontendApp, 'utf-8');
  if (content.includes('Calendar') && content.includes('AdminPanel')) {
    checks.push({ name: 'Frontend App.jsx', status: '✅', message: 'Correct' });
  } else {
    checks.push({ name: 'Frontend App.jsx', status: '❌', message: 'Wrong content' });
  }
} else {
  checks.push({ name: 'Frontend App.jsx', status: '❌', message: 'File missing' });
}

// Check 3: Calendar page
const calendarPage = join(__dirname, 'frontend', 'src', 'pages', 'Calendar.jsx');
if (existsSync(calendarPage)) {
  checks.push({ name: 'Calendar.jsx', status: '✅', message: 'Exists' });
} else {
  checks.push({ name: 'Calendar.jsx', status: '❌', message: 'Missing' });
}

// Check 4: AdminPanel page
const adminPanel = join(__dirname, 'frontend', 'src', 'pages', 'AdminPanel.jsx');
if (existsSync(adminPanel)) {
  checks.push({ name: 'AdminPanel.jsx', status: '✅', message: 'Exists' });
} else {
  checks.push({ name: 'AdminPanel.jsx', status: '❌', message: 'Missing' });
}

// Check 5: .env file
const envFile = join(__dirname, 'backend', '.env');
if (existsSync(envFile)) {
  checks.push({ name: 'Backend .env', status: '✅', message: 'Exists' });
} else {
  checks.push({ name: 'Backend .env', status: '⚠️', message: 'Missing - create it!' });
}

// Check 6: node_modules
const backendNodeModules = join(__dirname, 'backend', 'node_modules');
const frontendNodeModules = join(__dirname, 'frontend', 'node_modules');
if (existsSync(backendNodeModules)) {
  checks.push({ name: 'Backend node_modules', status: '✅', message: 'Installed' });
} else {
  checks.push({ name: 'Backend node_modules', status: '❌', message: 'Run: npm run install-all' });
}
if (existsSync(frontendNodeModules)) {
  checks.push({ name: 'Frontend node_modules', status: '✅', message: 'Installed' });
} else {
  checks.push({ name: 'Frontend node_modules', status: '❌', message: 'Run: npm run install-all' });
}

// Print results
console.log('Results:\n');
checks.forEach(check => {
  console.log(`${check.status} ${check.name}: ${check.message}`);
});

const allGood = checks.every(c => c.status === '✅');
const hasErrors = checks.some(c => c.status === '❌');

console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('✅ All checks passed! You can run: npm run dev');
} else if (hasErrors) {
  console.log('❌ Some issues found. Please fix them before running.');
  console.log('\nQuick fix:');
  console.log('  1. Run: npm run install-all');
  console.log('  2. Create backend/.env file (see SETUP.md)');
} else {
  console.log('⚠️  Some warnings. Check the messages above.');
}
console.log('='.repeat(50));

