'use strict';

const express = require('express');
var cors = require('cors');
const app = express();
const port = process.env.port || 8080;
const apiRoutes = require('./routes/index');
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);
app.get('/', (req, res) => {
	res.send('App Root');
});

app.listen(port, (err) => {
	if (err) {
		return console.log('ERROR', err);
	}
	console.log(`Listening on port ${port}`);
});
