// Output the current copyright year dynamically
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Output the raw string document last modified date metadata
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;