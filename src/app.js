const express = require('express');
const path = require('path');
const hbs = require('hbs');
const app = express();
const geoCode = require('./utils/geoCode');
const weather = require('./utils/weather');

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setting up handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
//setting up partials
hbs.registerPartials(partialsPath);

//setting up a static directory
app.use(express.static(publicPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Siddhant Gandhi'
	});
});


app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About me',
		name: 'Siddhant Gandhi'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help page',
		name: 'Siddhant Gandhi'
	});
});

app.get('/weather', (req, res) => {
	// console.log(req.query.search);
	if(!req.query.address) {
		return res.send({
			error: 'Please provide some location!'
		});
	}
	
	const text = req.query.address;
	geoCode(text, (error, {latitude, longitude, location} = {}) => {
		if(error) {
			return res.send({
				error: error
			});
		}
		weather(latitude, longitude, (error, forecastData) => {
			if(error) {
				return res.send({
					error: error
				});
			}
			res.send({
				search: text,
				location: location,
				forecast: forecastData
			});
	});
});
});

app.get('/help/*', (req, res) => {
	// res.send('help page note found!');
	res.render('error', {
		type: 'Help page not found :(',
		name: 'Siddhant Gandhi'
	});
});

app.get('*', (req, res) => {
	// res.send('404, page not found');
	res.render('error', {
		type: 'Error 404, Page not found :(',
		name: 'Siddhant Gandhi'
	});
});

app.listen(port, () => {
	console.log('listening on port ' + port);
});




















// app.get('/help', (req, res) => {
// 	// res.send({
// 	// 	name: 'siddhant',
// 	// 	age: 20
// 	// });

// 	res.send();
// });

// app.get('/about', (req, res) => {
// 	res.send([{
// 		location: 'meerut'
// 	}, {
// 		forecast: 'cloudy'
// 	}]);
// });


// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));
