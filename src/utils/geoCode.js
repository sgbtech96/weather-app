const request = require('request');

const geoCode = (address, callback) => {
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2didGVjaDk2IiwiYSI6ImNrNXRuYTJxbjB4dmozZW1sODFvMjJqMXIifQ.8_t-krSyRbqlusAq2aIVGg&limit=1'
	request({ url, json: true }, (error, {body} = {}) => {
		if(error) {
			callback('Bad connection :(', undefined);
		} else if(body.features.length === 0) {
			callback('No matching location found! :(', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			});
		}
	});
};


module.exports = geoCode;










// const geoCode = (address, callback) => {
// 	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2didGVjaDk2IiwiYSI6ImNrNXRuYTJxbjB4dmozZW1sODFvMjJqMXIifQ.8_t-krSyRbqlusAq2aIVGg&limit=1'
// 	request({ url: url, json: true }, (error, response) => {
// 		if(error) {
// 			callback('bad connection :(', undefined);
// 		} else if(response.body.features.length === 0) {
// 			callback('no matching location found! :(', undefined);
// 		} else {
// 			callback(undefined, {
// 				latitude: response.body.features[0].center[1],
// 				longitude: response.body.features[0].center[0],
// 				location: response.body.features[0].place_name
// 			});
// 		}
// 	});
// };