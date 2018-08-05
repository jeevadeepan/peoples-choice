let newCandidate = {};
//saveName
document.getElementById('saveName').addEventListener('click', () => {
	newCandidate.name = document.getElementById('candidateName').value;
	document.getElementById('askName').classList.toggle('hidden');
	document.getElementById('askPresentation').classList.toggle('hidden');
});


//savePresentation
document.getElementById('savePresentation').addEventListener('click', () => {
	newCandidate.presentation = document.getElementById('candidatePresentation').value;

	localStorage.setItem(newCandidate.name, JSON.stringify(newCandidate));
	window.alert('Candidate details saved!');

	window.location.href = "/adminhome.html";
});