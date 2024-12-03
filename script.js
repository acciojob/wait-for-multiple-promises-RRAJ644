const output = document.querySelector('#output')
const loadingRow = document.createElement('tr');
loadingRow.innerHTML = `<td colspan="2" class="text-center">Loading...</td>`;
output.appendChild(loadingRow);

function createRandomPromise(promiseNumber) {
	return new Promise((resolve) => {
		const time = (Math.random() * 2 + 1).toFixed(3)
		setTimeout(()=>resolve({
			promiseNumber, time: parseFloat(time)
		}))
	})
}

const promises = [
	createRandomPromise(1),
	createRandomPromise(2),
	createRandomPromise(3)	
]

const startTime = performance.now()
Promise.all(promises).then((results) => {
	const endTime = performance.now()
	const totalTIme = ((endTime - startTime) / 1000).toFixed(3);

	output.removeChild(loadingRow)

	results.forEach((result, idx) => {

		const row = document.createElement('tr')
		row.innerHTML = `
		          <td>Promise ${result.promiseNumber}</td>
				  <td>${result.time}s</td>
		`

		output.appendChild(row);
	})

	  // Add the total time row
  const totalRow = document.createElement('tr');
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime}s</td>
  `;
  output.appendChild(totalRow);
})
