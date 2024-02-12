import { exec } from "child_process";
import { dirname, join } from "path";
import { existsSync, mkdirSync, readdirSync, statSync, copyFileSync, unlinkSync } from "fs"; // Import unlinkSync from fs module
import { startServer } from "./index.js";

// Function to ensure that the output directory exists
function ensureDirectoryExistence(filePath) {
  const directory = dirname(filePath);
  if (directory !== "" && !existsSync(directory)) {
    mkdirSync(directory, {
      recursive: true
    });
  }
}

// Function to minify HTML
function minifyHTML(inputFile, outputFile, callback) {
  console.log(`Minimizing HTML file: ${inputFile}`);
  const tempFile = outputFile + ".temp"; // Temporary file
  copyFileSync(inputFile, tempFile); // Make a copy
  const htmlMinifyCommand = `html-minifier --collapse-whitespace --minify-css true --minify-js true ${tempFile} -o ${outputFile}`;
  exec(htmlMinifyCommand, (error, stdout, stderr) => {
    if (error) {
      callback(error, stdout, stderr);
    } else {
      // Remove the temporary file after minification is completed
      unlinkSync(tempFile);
      callback(null, stdout, stderr);
    }
  });
}

// Function to minify CSS
function minifyCSS(inputFile, outputFile, callback) {
  console.log(`Minimizing CSS file: ${inputFile}`);
  const tempFile = outputFile + ".temp"; // Temporary file
  copyFileSync(inputFile, tempFile); // Make a copy
  const cssMinifyCommand = `uglifycss ${tempFile} > ${outputFile}`;
  exec(cssMinifyCommand, (error, stdout, stderr) => {
    if (error) {
      callback(error, stdout, stderr);
    } else {
      // Remove the temporary file after minification is completed
      unlinkSync(tempFile);
      callback(null, stdout, stderr);
    }
  });
}

// Function to minify JavaScript
function minifyJS(inputFile, outputFile, callback) {
  console.log(`Minimizing JavaScript file: ${inputFile}`);
  const tempFile = outputFile + ".temp"; // Temporary file
  copyFileSync(inputFile, tempFile); // Make a copy
  const jsMinifyCommand = `uglifyjs ${tempFile} -o ${outputFile}`;
  exec(jsMinifyCommand, (error, stdout, stderr) => {
    if (error) {
      callback(error, stdout, stderr);
    } else {
      // Remove the temporary file after minification is completed
      unlinkSync(tempFile);
      callback(null, stdout, stderr);
    }
  });
}

// Recursive function to find files with specific extensions
function findFiles(directory, extension, fileList = []) {
  const files = readdirSync(directory);
  files.forEach(file => {
    const filePath = join(directory, file);
    const stats = statSync(filePath);
    if (stats.isDirectory()) {
      findFiles(filePath, extension, fileList);
    } else if (stats.isFile() && file.endsWith(extension)) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

// Process HTML, CSS, and JS files
async function processFiles() {
  const startDirectory = process.cwd(); // Get current working directory

  const htmlFiles = findFiles(startDirectory, '.html');
  const cssFiles = findFiles(startDirectory, '.css');
  const jsFiles = findFiles(startDirectory, '.js');

  const startTime = Date.now(); // Start time

  // Process HTML files
  await Promise.all(htmlFiles.map(async (file) => {
    const outputFilePath = file.replace(startDirectory, join(startDirectory, "dist"));
    ensureDirectoryExistence(outputFilePath); // Ensure directory exists
    await new Promise((resolve) => {
      minifyHTML(file, outputFilePath, (error, stdout, stderr) => {
        if (error) {
          console.error(`${RED_COLOR}HTML Minify Error: ${error.message}${RESET_COLOR}`);
        } else if (stderr) {
          console.error(`${RED_COLOR}HTML Minify stderr: ${stderr}${RESET_COLOR}`);
        }
        resolve();
      });
    });
  }));

  // Process CSS files
  await Promise.all(cssFiles.map(async (file) => {
    const outputFilePath = file.replace(startDirectory, join(startDirectory, "dist"));
    ensureDirectoryExistence(outputFilePath); // Ensure directory exists
    await new Promise((resolve) => {
      minifyCSS(file, outputFilePath, (error, stdout, stderr) => {
        if (error) {
          console.error(`${RED_COLOR}CSS Minify Error: ${error.message}${RESET_COLOR}`);
        } else if (stderr) {
          console.error(`${RED_COLOR}CSS Minify stderr: ${stderr}${RESET_COLOR}`);
        }
        resolve();
      });
    });
  }));

  // Process JS files
  await Promise.all(jsFiles.map(async (file) => {
    const outputFilePath = file.replace(startDirectory, join(startDirectory, "dist"));
    ensureDirectoryExistence(outputFilePath); // Ensure directory exists
    await new Promise((resolve) => {
      minifyJS(file, outputFilePath, (error, stdout, stderr) => {
        if (error) {
          console.error(`${RED_COLOR}JS Minify Error: ${error.message}${RESET_COLOR}`);
        } else if (stderr) {
          console.error(`${RED_COLOR}JS Minify stderr: ${stderr}${RESET_COLOR}`);
        }
        resolve();
      });
    });
  }));

  const endTime = Date.now(); // End time
  const elapsedTime = (endTime - startTime) / 1000; // in seconds
  console.log(`\nTotal time taken: ${elapsedTime} seconds`);
  // Start server
  startServer();
}

// Entry point
processFiles();
