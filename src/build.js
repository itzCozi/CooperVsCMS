import { exec } from "child_process";
import { dirname } from "path";
import { existsSync, mkdirSync, copyFileSync } from "fs";
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
    callback(error, stdout, stderr);
  });
}

// Function to minify CSS
function minifyCSS(inputFile, outputFile, callback) {
  console.log(`Minimizing CSS file: ${inputFile}`);
  const tempFile = outputFile + ".temp"; // Temporary file
  copyFileSync(inputFile, tempFile); // Make a copy
  const cssMinifyCommand = `uglifycss ${tempFile} > ${outputFile}`;
  exec(cssMinifyCommand, (error, stdout, stderr) => {
    callback(error, stdout, stderr);
  });
}

// Function to minify JavaScript
function minifyJS(inputFile, outputFile, callback) {
  console.log(`Minimizing JavaScript file: ${inputFile}`);
  const tempFile = outputFile + ".temp"; // Temporary file
  copyFileSync(inputFile, tempFile); // Make a copy
  const jsMinifyCommand = `uglifyjs ${tempFile} -o ${outputFile}`;
  exec(jsMinifyCommand, (error, stdout, stderr) => {
    callback(error, stdout, stderr);
  });
}

// Process HTML, CSS, and JS files
async function processFiles() {
  const htmlFiles = [ // SO MANY
    "static/internal/extensions/index.html", "static/internal/extensions/marketplace.html", "static/internal/flow-field/index.html",
    "static/internal/newTab/main.html", "static/internal/wiki/index.html", "static/internal/wiki/wiki.html", "static/internal/wiki/eula.html",
    "static/internal/wiki/philosophy.html", "static/index.html", "static/auth/anon/anon-login.html", "static/auth/register/register-page.html",
    "static/auth/user-agent/index.html", "static/auth/login-page.html"
  ];

  const cssFiles = [
    "static/auth/anon/anon-theme.css", "static/auth/register/register-theme.css", "static/auth/user-agent/style.css", "static/auth/login-theme.css",
    "static/css/chrome-tabs-dark-theme.css", "static/css/chrome-tabs-dark-theme.styl", "static/css/chrome-tabs.css", "static/css/chrome-tabs.styl",
    "static/css/css.css", "static/css/main.css", "static/internal/wiki/wiki-theme.css", "static/skin/xp/debugger.css", "static/skin/xp/html.css"
  ];

  const jsFiles = [
    "src/build.js", "src/index.js", "static/bare-client.js", "static/inobounce.min.js", "static/auth/auth-script.js", "static/auth/popup.js",
    "static/auth/register/popup.js", "static/auth/user-agent/handler.js", "static/internal/manager.js", "static/js/bookmarks.js",
    "static/js/chrome-tabs.js", "static/js/draggabilly.pkgd.min.js", "static/js/extensions.js", "static/js/js.js", "static/js/xor.js",
    "static/js/x/core.js", "static/js/x/DarkMode.js", "static/js/x/demoex.js", "static/uv/sw.js", "static/uv/uv.bundle.js", "static/uv/uv.config.js",
    "static/uv/uv.handler.js", "static/uv/uv.sw.js"
  ];

  const startTime = Date.now(); // Start time

  const RED_COLOR = "\x1b[31m"; // ANSI escape code for red color
  const RESET_COLOR = "\x1b[0m"; // ANSI escape code to reset color

  // Process HTML files
  await Promise.all(htmlFiles.map(async (file) => {
    const outputFilePath = file.replace("static", "dist");
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
    const outputFilePath = file.replace("static", "dist");
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
    const outputFilePath = file.replace("src", "dist");
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
