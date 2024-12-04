const express = require('express');
const mongoose = require('mongoose');

const connectDB = require('./conn.js');
const athletesRecordsModel = require('./models/schema.js').athletesRecordsModel;
const athletesInfoModel = require('./models/schema.js').athletesInfoModel;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:6660');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  next();
});

connectDB();

// get request
app.get('/getAthletes', async (req, res) => {
  await athletesInfoModel.find({}).then(function (athletes) {
    res.json(athletes);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  });
});

// get request from mongoDB
app.get('/getAthletesRecords', async (req, res) => {
  await athletesRecordsModel.find({}).then(function (athletesRecordsModel) {
    res.json(athletesRecordsModel);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });

  });
});

app.get('/api/addSSRecord', async (req, res) => {
  await athletesRecordsModel.find({}).then(function (athletesRecordsModel) {
    res.json(athletesRecordsModel);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });

  });
});

app.post('/api/addSSRecord', async (req, res) => {
  console.log('Received request to add SS record');
  try {
    const speedSlalomData = req.body;
    const newRecord = new athletesRecordsModel({
      athletesName: speedSlalomData.athletesName,
      SSRecords: speedSlalomData.SSRecords.map((record) => ({
        ...record,
        date: new Date(record.date),
      })),
    });
    await newRecord.save();
    res.send('Record added successfully!');
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
});

/*
// post request
app.post('/api/addSSRecord', (req, res) => {
  //const data = req.body;
  console.log('Received data:', req.body);
  try {
    // Handle the request here
    console.log('Request handled successfully');
    res.send('Record added successfully!');
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
  // Validate the data
  /*
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

  const newRecord = new athletesRecordsModel({
    athletesName: data.athleteName,
    SSRecords: [data]
  });
  
  newRecord.save((err, doc) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error saving data' });
    } else {
      res.send({ message: 'Data saved successfully!' });
    }
  });

  athletesRecordsModel.findOneAndUpdate(
    { athletesName: data.name },
    { $push: { SSRecords: data } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.error(err);
        res.status(500).send({ message: 'Error saving data' });
      } else {
        res.send({ message: 'Data saved successfully!' });
      }
    }
  );
});
*/
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});