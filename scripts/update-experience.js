#!/usr/bin/env node
/**
 * updates README.md between markers <!--START_EXPERIENCE-->...<!--END_EXPERIENCE-->
 * Set START_YEAR below to your first professional year (first paid year).
 */
const fs = require('fs');
const path = require('path');

const README = path.join(__dirname, '..', 'README.md');

// Change this to your actual first paid/professional year if 2019 is not correct
const START_YEAR = 2019;

function computeYears(start) {
  const now = new Date();
  return Math.max(0, now.getFullYear() - start);
}

function updateReadme() {
  if (!fs.existsSync(README)) {
    console.error('README.md not found at', README);
    process.exit(1);
  }

  const raw = fs.readFileSync(README, 'utf8');
  const regex = /(<!--START_EXPERIENCE-->)([\s\S]*?)(<!--END_EXPERIENCE-->)/;
  const years = String(computeYears(START_YEAR));
  if (!regex.test(raw)) {
    console.error('Markers not found in README.md. Add <!--START_EXPERIENCE-->current<!--END_EXPERIENCE--> where you want the years.');
    process.exit(1);
  }
  const updated = raw.replace(regex, `$1${years}$3`);
  if (updated === raw) {
    console.log('No change needed — experience already up-to-date.');
    process.exit(0);
  }
  fs.writeFileSync(README, updated, 'utf8');
  console.log(`Updated README.md: set experience to ${years} years.`);
  process.exit(0);
}

updateReadme();
