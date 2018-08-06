const startDate = localStorage.getItem('__startDate');
const endDate = localStorage.getItem('__endDate');

if(startDate && endDate) {
	const todayMoment = moment().format(moment.HTML5_FMT.DATE);

	if (moment(todayMoment).isBetween(startDate, endDate, null, [])) {
		document.getElementById('userVotingInProgress').classList.toggle('hidden');
		document.getElementById('endCountdownFiller').innerHTML = moment(endDate).format('DD MMM YYYY');
	} else {
		document.getElementById('userVotingScheduled').classList.toggle('hidden');
		document.getElementById('startCountdownFiller').innerHTML = moment(startDate).fromNow();
		document.getElementById('startDateFiller').innerHTML = moment(startDate).format('DD MMM YYYY');
	}
} else {
	document.getElementById('userVotingClosed').classList.toggle('hidden');
}

//savePresentation
document.getElementById('saveUserName').addEventListener('click', () => {

	localStorage.setItem('__userName', document.getElementById('userName').value);

	window.location.href = "/uservoting.html";
});