let newCandidate = {};
//saveName
document.getElementById('saveName').addEventListener('click', () => {
	document.getElementById('candidateName').focus();
	newCandidate.name = document.getElementById('candidateName').value;
	document.getElementById('askName').classList.toggle('hidden');
	document.getElementById('askPresentation').classList.toggle('hidden');
	localStorage.setItem('__userName', newCandidate.name);
	document.getElementById('candidateNameFiller').innerHTML = newCandidate.name;
});


//savePresentation
document.getElementById('savePresentation').addEventListener('click', () => {
	newCandidate.presentation = document.getElementById('candidatePresentation').value;

	localStorage.setItem(newCandidate.name, JSON.stringify(newCandidate));
	window.alert('Candidate details saved!');

	window.location.href = "/peoples-choice/adminhome.html";
});