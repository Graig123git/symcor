'use strict';
const express = require('express');
const axios = require('axios').default;
let router = express.Router();
const https = require('https');

router.post('/create', async (req, res) => {
	/*try {
		const Url = 'xxx';
		let axiosConfig = {
			headers: {
				'x-api-key': 'xx',
				Host: 'xx',
				'x-request-id': 'xxx',
				'x-fapi': 'xxx',
				'x-app-cat-id': 'xxx',
			},
		};
		const base64String = await axios.post(Url, req.body, axiosConfig);
		return res.send({ statusCode: 200, data: base64String });
	} catch (error) {
		res.send({ err: error.message, status: 500 });
	}*/

	//using request for now

	const options = {
		hostname: 'whatever.com',
		port: 443,
		path: '/todos',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': data.length,
			'x-api-key': 'xx',
			'x-request-id': 'xxx',
			'x-fapi': 'xxx',
			'x-app-cat-id': 'xxx',
		},
	};

	const req = https.request(options, (res) => {
		console.log(`statusCode: ${res.statusCode}`);

		res.on('data', (d) => {
			console.info(d);
			res.send({ data: error, status: 200 });
		});
	});

	req.on('error', (error) => {
		console.error(error);
		res.send({ err: error, status: 500 });
	});

	req.write(data);
	req.end();
});

router.post('/getToken', async (req, res) => {
	try {
		const Url = 'xxx';
		let axiosConfig = {
			headers: {
				'x-api-key': 'xx',
				Host: 'xx',
				'x-request-id': 'xxx',
				'x-fapi': 'xxx',
				'x-app-cat-id': 'xxx',
			},
		};
		const base64String = await axios.post(Url, req.body, axiosConfig);
		return res.send({ statusCode: 200, data: base64String });
	} catch (error) {
		res.send({ err: error.message, status: 500 });
	}
});

module.exports = router;
