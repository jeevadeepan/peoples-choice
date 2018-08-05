const startDate = localStorage.getItem('startDate');
const endDate = localStorage.getItem('endDate');

if(startDate && endDate) {
	const todayUTC = moment().valueOf();
	const startDateUTC = moment(startDate).valueOf();
	const endDateUTC = moment(endDate).valueOf();

	if (todayUTC >= startDateUTC && todayUTC <= endDateUTC) {
		document.getElementById('votingInProgress').classList.toggle('hidden');
	} else {
		document.getElementById('votingScheduled').classList.toggle('hidden');
		document.getElementById('startCountdownFiller').innerHTML = moment(startDate).fromNow();
		document.getElementById('startDateFiller').innerHTML = moment(startDate).format('DD MMM YYYY');
	}
} else {
	document.getElementById('votingClosed').classList.toggle('hidden');
}