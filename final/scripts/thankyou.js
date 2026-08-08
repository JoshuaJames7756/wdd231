// thankyou.js — ES Module
// Reads the query string from the order form submission and displays it.

const summary = document.querySelector('#submission-summary');
const params = new URLSearchParams(window.location.search);

const fieldLabels = {
  name: 'Name',
  email: 'Email',
  bookTitle: 'Book Title',
  requestType: 'Request Type',
  notes: 'Notes',
  newsletter: 'Newsletter Signup'
};

const requestTypeLabels = {
  preorder: 'Pre-Order',
  pickup: 'In-Store Pickup Request'
};

function renderSummary() {
  if ([...params].length === 0) {
    summary.innerHTML = `<p>No submission data was found. Please fill out the <a href="contact.html">form</a> first.</p>`;
    return;
  }

  const rows = Object.entries(fieldLabels)
    .map(([key, label]) => {
      let value = params.get(key);

      if (!value && key !== 'newsletter') return '';

      if (key === 'requestType') {
        value = requestTypeLabels[value] || value;
      }

      if (key === 'newsletter') {
        value = value === 'yes' ? 'Yes' : 'No';
      }

      // template literal building each summary row
      return `
        <div class="summary-row">
          <span class="summary-label">${label}:</span>
          <span class="summary-value">${value}</span>
        </div>
      `;
    })
    .join('');

  summary.innerHTML = rows;
}

renderSummary();