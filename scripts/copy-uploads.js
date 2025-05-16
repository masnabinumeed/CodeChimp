import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

async function copyUploads() {
  const sourceDir = path.join(rootDir, 'uploads');
  const targetDir = path.join(rootDir, 'dist', 'public', 'uploads');

  try {
    // Ensure the target directory exists
    await fs.ensureDir(targetDir);
    
    // Copy the uploads directory
    await fs.copy(sourceDir, targetDir);
    
    console.log('Successfully copied uploads directory to build output');
  } catch (err) {
    console.error('Error copying uploads directory:', err);
    process.exit(1);
  }
}

copyUploads(); 