const express = require('express');
const mongoose = require('mongoose');

const connectDB = require('./conn.js');
//const speedSlalomRecordSchema = require('./models/schema.js');
const AthletesModel = require('./models/schema.js').AthletesModel;
const SSRecordsModel = require('./models/schema.js').SSRecordsModel;

const app = express();

app.use(express.json());
app.use(express.json());

connectDB();

// get request
app.get('/getAthletes', async (req, res) => {
  await AthletesModel.find({}).then(function (athletes) {
    res.json(athletes);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  });
});

// get request from mongoDB
app.get('/getSSRecords', async (req, res) => {
  await SSRecordsModel.find({}).then(function (SSRecords) {
    res.json(SSRecords);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
    
  });
});


// put request
app.put('/updateSSRecords', (req, res) => {
  const data = req.body;

  // Validate the data
  if (!data.name || !data.date || !data.side || !data.step || !data.time) {
    res.status(400).json({ message: 'Please fill in all required fields' });
    return;
  }

  if (typeof data.time !== 'number' || typeof data.missedCone !== 'number' || typeof data.kickedCone !== 'number') {
    res.status(400).json({ message: 'Invalid data type' });
    return;
  }

  if (data.step <= 0 || data.time < 0 || data.missedCone < 0 || data.kickedCone < 0) {
    res.status(400).json({ message: 'Invalid values' });
    return;
  }
});


app.listen(8001, () => {
  console.log('Server is running on port 8001');
});