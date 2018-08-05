const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');
const startDate = localStorage.getItem('__startDate');
const endDate = localStorage.getItem('__endDate');

startDateInput.setAttribute('min', moment().format(moment.HTML5_FMT.DATE));

startDateInput.addEventListener('change', () => {
	endDateInput.setAttribute('min', moment(startDateInput.value).format(moment.HTML5_FMT.DATE));
});

document.getElementById('saveDates').addEventListener('click', () => {
	localStorage.setItem('__startDate', startDateInput.value);
	localStorage.setItem('__endDate', endDateInput.value);
	window.location.reload();
});

if(startDate && endDate) {
	document.getElementById('votingUnscheduled').classList.toggle('hidden');
	document.getElementById('votingScheduled').classList.toggle('hidden');

	//populate start date
	document.getElementById('startDateFiller').innerHTML = moment(startDate).format('DD MMM YYYY');

	//populate end date
	document.getElementById('endDateFiller').innerHTML = moment(endDate).format('DD MMM YYYY');

	//compute and populate voting status
	const todayUTC = moment().valueOf();
	const startDateUTC = moment(startDate).valueOf();
	const endDateUTC = moment(endDate).valueOf();
	const votingStatusSection = document.getElementById('votingStatus');

	if(todayUTC >= startDateUTC && todayUTC <= endDateUTC) {
		votingStatusSection.innerHTML = 'Voting is in progress ...';
	} else {
		votingStatusSection.innerHTML = `Voting begins ${moment(startDate).fromNow()}`;
	}

	//populate vote results
	populateVoteResults();
}

function populateVoteResults() {
	const resultsTable = document.getElementById('resultsTable');
	let resultsHTML = '';

	Array.from(Array(localStorage.length).keys()).forEach((index) => {
		const recordName = localStorage.key(index);
		if (recordName.indexOf('__') === 0) return;

		const candidateDetail = JSON.parse(localStorage.getItem(recordName));

		resultsHTML += `<tr><td>${candidateDetail.name}</td> <td>${candidateDetail.presentation}</td> <td>${candidateDetail.votes || ''}</td></tr>`
	});

	resultsTable.querySelector('tbody').innerHTML = resultsHTML;
}

