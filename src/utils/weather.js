const request = require('request');

const weather = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/dd7d684a0de037b71fa8b49eab2104ac/' + latitude + ',' + longitude + '?units=si';
	request({ url, json: true }, (error, {body}) => {
		if(error) {
			callback('Something went wrong :(', undefined);
		} else {
			const rainProb = body.currently.precipProbability;
			const temp = body.currently.temperature;
			callback(undefined, body.daily.data[0].summary + ' It is currently ' + temp + ' degrees. Chance of rain is ' + rainProb + '%. Highest temperature recorded today is ' + body.daily.data[0].temperatureHigh + ' degrees, and the lowest temperature recorded is ' + body.daily.data[0].temperatureLow + ' degrees.');
		}
	});
};

module.exports = weather;





// const weather = (latitude, longitude, callback) => {
// 	const url = 'https://api.darksky.net/forecast/dd7d684a0de037b71fa8b49eab2104ac/' + latitude + ',' + longitude + '?units=si';
// 	request({ url: url, json: true }, (error, response) => {
// 		if(error) {
// 			callback('something went wrong :(', undefined);
// 		} else {
// 			const rainProb = response.body.currently.precipProbability;
// 			const temp = response.body.currently.temperature;
// 			callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + temp + ' degrees and chance of rain is ' + rainProb + ' %');
// 		}
// 	});
// };
