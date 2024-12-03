// Reference to the table body
const output = document.getElementById('output');

// Add a row that spans 2 columns with "Loading..." text
const loadingRow = document.createElement('tr');
loadingRow.setAttribute('id', 'loading'); // Added id for easier targeting in tests
loadingRow.innerHTML = `<td colspan="2" class="text-center">Loading...</td>`;
output.appendChild(loadingRow);

// Function to create a promise that resolves after a random time between 1 and 3 seconds
function createRandomPromise(promiseNumber) {
  return new Promise((resolve) => {
    const time = (Math.random() * 2 + 1).toFixed(3); // Random time between 1 and 3 seconds
    setTimeout(() => resolve({ promiseNumber, time: parseFloat(time) }), time * 1000);
  });
}

// Create an array of 3 promises
const promises = [
  createRandomPromise(1),
  createRandomPromise(2),
  createRandomPromise(3),
];

// Start the timer to track the total time
const startTime = performance.now();

// Wait for all promises to resolve using Promise.all()
Promise.all(promises).then((results) => {
  // Calculate the total time after all promises are resolved
  const endTime = performance.now();
  const totalTime = ((endTime - startTime) / 1000).toFixed(3); // Total time in seconds

  // Remove the "Loading..." row
  output.removeChild(loadingRow);

  // Populate the table with resolved values
  results.forEach((result) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>Promise ${result.promiseNumber}</td>
      <td>${result.time}s</td>
    `;
    output.appendChild(row);
  });

  // Add the total time row
  const totalRow = document.createElement('tr');
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime}s</td>
  `;
  output.appendChild(totalRow);
}).catch((error) => {
  console.error('Error handling promises:', error);
});
