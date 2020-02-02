const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const para1 = document.querySelector('#msg1');
const para2 = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();
	const query = search.value;
	para1.textContent = 'Loading....';
	para2.textContent = '';
	fetch('http://localhost:3000/weather?address=' + query).then((response) => {
		response.json().then((data) => {
			if(data.error) {
				para1.textContent = data.error; 
			} else {
				para1.textContent = data.location;
				para2.textContent = data.forecast;
			}
			
		});
	});
});