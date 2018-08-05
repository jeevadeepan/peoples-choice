const userName = localStorage.getItem('__userName');
const candidates = [];

function getUserVote() {
	let userVote = false;
	Array.from(Array(localStorage.length).keys()).forEach((index) => {
		const recordName = localStorage.key(index);
		if (recordName.indexOf('__') === 0) return;

		const candidateDetail = JSON.parse(localStorage.getItem(recordName));

		if (candidateDetail.votes && candidateDetail.votes.includes(userName)) {
			userVote = candidateDetail;
		}

		candidates.push(candidateDetail);
	});

	return userVote;
}

function populateCandidates() {
	const castVoteSection = document.getElementById('castVote').querySelector('fieldset');
	let candidateOptions = '<legend>Select candidate</legend>';

	candidates.forEach((candidate) => {
		candidateOptions += `<input type="radio" name="candidateSelection" id="${candidate.name}" value="${candidate.name}"/>`;
		candidateOptions += `<label for="${candidate.name}">${candidate.presentation} by ${candidate.name}</label>`;
	});

	castVoteSection.innerHTML = candidateOptions;
}

let userVote = getUserVote();
if (userVote) {
	document.getElementById('changeVote').classList.remove('hidden');
	document.getElementById('currentVoteFiller').innerHTML = `${candidateDetail.presentation} by ${candidateDetail.name}`;
} else {
	document.getElementById('castVote').classList.remove('hidden');
	populateCandidates();
}

document.getElementById('submitVote').addEventListener('click', (evt) => {
	evt.preventDefault();
	const votedFor = document.getElementById('votingForm').candidateSelection.value;

	const votedCandidate = candidates.find(candidate => candidate.name === votedFor);
	votedCandidate.votes = votedCandidate.votes ? `${votedCandidate.votes},${userName}` : userName;

	localStorage.setItem(votedCandidate.name, JSON.stringify(votedCandidate));
	window.alert('Thank you, your vote has been registered');
	window.location.reload();
});