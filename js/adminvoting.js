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

	//populate end date
	document.getElementById('endDateFiller').innerHTML = moment(endDate).format('DD MMM YYYY');

	//compute and populate voting status
	const todayMoment = moment().format(moment.HTML5_FMT.DATE);
	const startDateMoment = moment(startDate);
	const endDateMoment = moment(endDate);
	const votingStatusSection = document.getElementById('votingStatus');

	if(moment(todayMoment).isBetween(startDate, endDate, null, [])) {
		votingStatusSection.innerHTML = 'Voting is in progress ...';
		document.getElementById('votingScheduled').classList.remove('hidden');
	} else if(moment(startDate).isAfter(todayMoment)) {
		votingStatusSection.innerHTML = `Voting begins ${moment(startDate).fromNow()}`;
		document.getElementById('votingScheduled').classList.remove('hidden');
	} else {
		document.getElementById('votingClosed').classList.remove('hidden');
	}

	//populate vote results
	populateVoteResults();
} else {
	document.getElementById('votingUnscheduled').classList.remove('hidden');
}

document.getElementById('reschedule').addEventListener('click', () => {
	Array.from(Array(localStorage.length).keys()).forEach((index) => {
		const recordName = localStorage.key(index);
		if (recordName.indexOf('__') === 0) return;

		const candidateDetail = JSON.parse(localStorage.getItem(recordName));

		candidateDetail.votes = undefined;
		localStorage.setItem(recordName, JSON.stringify(candidateDetail));
	});
	localStorage.removeItem('__startDate');
	localStorage.removeItem('__endDate');
	window.location.reload();
});

function populateVoteResults() {
	const resultsTable = document.getElementById('resultsTable');
	let resultsHTML = '';
	let candidateVotes = [];

	Array.from(Array(localStorage.length).keys()).forEach((index) => {
		const recordName = localStorage.key(index);
		if (recordName.indexOf('__') === 0) return;

		const candidateDetail = JSON.parse(localStorage.getItem(recordName));

		const voteCount = candidateDetail.votes ? `${candidateDetail.votes.split(',').length}` : 0;
		const voteField = candidateDetail.votes ? `${candidateDetail.votes.split(',').length} (${candidateDetail.votes})` : 0;

		candidateVotes.push([candidateDetail.name, parseInt(voteCount)]);
		resultsHTML += `<tr><td>${candidateDetail.name}</td> <td>${candidateDetail.presentation}</td> <td>${voteField}</td></tr>`
	});

	resultsTable.querySelector('tbody').innerHTML = resultsHTML;
	chartPoll(candidateVotes);
}

function chartPoll(voteData) {
    google.charts.load('current', {'packages':['corechart']});

    google.charts.setOnLoadCallback(drawChart);

	function drawChart() {
	    var data = new google.visualization.DataTable();
	    data.addColumn('string', 'Candidate Name');
	    data.addColumn('number', 'Votes');
	    data.addRows(voteData);

	    // Set chart options
	    var options = {'title':'Poll Results',
	                   'width':400,
	                   'height':300};

	    // Instantiate and draw our chart, passing in some options.
	    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
	    chart.draw(data, options);
	}
}

