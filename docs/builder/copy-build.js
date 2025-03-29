/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs-extra';

// Get the current directory (equivalent to __dirname in CommonJS)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to React build and Jekyll assets folder
const reactBuildPath = path.join(__dirname, 'dist', 'assets');
const jekyllAssetsPath = path.join(__dirname, '../assets/builder');

// clear Jekyll assets folder
fs.emptyDir(jekyllAssetsPath);

// Copy React build files to Jekyll assets folder
fs.copy(reactBuildPath, jekyllAssetsPath, (err) => {
    if (err) throw err;
    console.log('React build files copied to Jekyll assets folder');
});

// update the hash in the Jekyll resume.html file
const resumeHtmlPath = path.join(__dirname, '../resume.html');

// Find the hashed JS and CSS files in the dist folder
const files = fs.readdirSync(reactBuildPath);

// Find the hashed JS and CSS filenames
const mainJs = files.find((file) => file.endsWith('.js'));
console.log('mainJs', mainJs);
const mainCss = files.find((file) => file.endsWith('.css'));

if (mainJs || mainCss) {
    let resumeHtml = fs.readFileSync(resumeHtmlPath, 'utf-8');

    // Replace the old JS and CSS filenames with the new hashed ones
    resumeHtml = resumeHtml.replace(/\/assets\/builder\/.*\.js/, `/assets/builder/${mainJs}`);
    resumeHtml = resumeHtml.replace(/\/assets\/builder\/.*\.css/, `/assets/builder/${mainCss}`);

    fs.writeFileSync(resumeHtmlPath, resumeHtml);
    console.log('Updated bundled hash in resume.html.');
} else {
    console.error('Hashed JS or CSS files not found in the dist folder. Skipping hash update.');
}