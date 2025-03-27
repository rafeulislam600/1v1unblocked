
const fs = require('fs');
const path = require('path');

// Function to walk through directories recursively
function walkDir(dir) {
  const results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results.push(...walkDir(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

// Function to process HTML files
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove the og:image meta tag
    const newContent = content.replace(/<meta property="og:image" content="https:\/\/1v1-lol-online\.github\.io\/img\/[^"]+"\s*>/g, '');
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err);
  }
}

// Start processing files
console.log('Starting to process HTML files...');
const htmlFiles = walkDir('.');
htmlFiles.forEach(processFile);
console.log('Finished processing all HTML files.');
