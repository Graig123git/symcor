'use strict';
const express = require('express');
const axios = require('axios').default;
let router = express.Router();

router.post('/create', async (req, res) => {
	try {
		const Url = 'xxx';
		let axiosConfig = {
			headers: {
				'x-api-key': 'xxx',
				Host: 'xxx',
				'x-request-id': 'xxx',
				'x-fapi': '1',
				'x-app-cat-id': 'xxx',
			},
		};
		const base64String = await axios.post(Url, axiosConfig);
		return res.send({ statusCode: 200, data: base64String });
	} catch (error) {
		res.send({ err: error, status: 500 });
	}
});

router.get('/getToken', async (req, res) => {
	try {
		return res.send({ statusCode: 200, data: 'Hello from get Create App Client' });
	} catch (error) {
		res.send({ err: error, status: 500 });
	}
});

module.exports = router;
