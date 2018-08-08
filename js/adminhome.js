(function populateVoteResults() {
	const resultsTable = document.getElementById('resultsTable');
	let resultsHTML = '';

	Array.from(Array(localStorage.length).keys()).forEach((index) => {
		const recordName = localStorage.key(index);
		if (recordName.indexOf('__') === 0) return;

		const candidateDetail = JSON.parse(localStorage.getItem(recordName));

		resultsHTML += `<tr><td>${candidateDetail.name}</td> <td>${candidateDetail.presentation}</td></tr>`
	});

	resultsTable.querySelector('tbody').innerHTML = resultsHTML;
})();