const express = require('express');
const mongoose = require('mongoose');

const connectDB = require('./conn.js');
//const speedSlalomRecordSchema = require('./models/schema.js');
const AthletesModel = require('./models/schema.js').AthletesModel;
const SSRecordsModel = require('./models/schema.js').SpeedSlalomRecordModel;

const app = express();
app.use(express.json());

connectDB();

app.get('/getAthletes', async (req, res) => {
  await AthletesModel.find({}).then(function (athletes) {
    res.json(athletes);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  });
});

app.get('/getSSRecords', async (req, res) => {
  await SSRecordsModel.find({}).then(function (SSRecords) {
    res.json(SSRecords);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  });
});

app.listen(8001, () => {
  console.log('Server is running on port 8001');
});