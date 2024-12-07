const express = require('express');
const mongoose = require('mongoose');

const connectDB = require('./conn.js');
const athletesRecordsModel = require('./models/schema.js').athletesRecordsModel;
const athletesInfoModel = require('./models/schema.js').athletesInfoModel;

const app = express();

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:6660',
}));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:6660');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  next();
});

connectDB();

// get request from mongoDB
app.get('/api/getSSRecord', async (req, res) => {
  await athletesRecordsModel.find({}).then(function (athletesRecords) {
    res.json(athletesRecords);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });

  });
});

app.get('/api/getAthleteInfo', async (req, res) => {
  await athletesInfoModel.find({}).then(function (athletesRecord) {
    res.json(athletesRecord);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  });
});

app.get('/api/athletes/count', async (req, res) => {
  try {
    const count = await athletesInfoModel.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error retrieving athlete count:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});


// post request to mongoDB
app.post('/api/addSSRecord', async (req, res) => {
  console.log('Received request to add SS record');

  try {
    const speedSlalomData = req.body;
    // Find the athlete by name
    const athlete = await athletesRecordsModel.findOne({ athletesName: speedSlalomData.athletesName });

    if (athlete) {
      // Athlete exists, add new record to SSRecords
      const newSSRecord = {
        date: new Date(speedSlalomData.SSRecords[0].date),
        side: speedSlalomData.SSRecords[0].side,
        step: speedSlalomData.SSRecords[0].step,
        time: speedSlalomData.SSRecords[0].time,
        missedCone: speedSlalomData.SSRecords[0].missedCone,
        kickedCone: speedSlalomData.SSRecords[0].kickedCone,
        DQ: speedSlalomData.SSRecords[0].DQ,
        endLine: speedSlalomData.SSRecords[0].endLine,
        SSResult: speedSlalomData.SSRecords[0].SSResult,
        notes: speedSlalomData.SSRecords[0].notes,
      };

      console.log(newSSRecord);
      athlete.SSRecords.push(newSSRecord); // Add the new Speed Slalom record to the athlete's existing records
      await athlete.save().then(() => {
        console.log('Records updated successfully!');
      });

    } else {
      // Athlete doesn't exist, create a new record
      const newAthlete = new athletesRecordsModel({
        athletesName: speedSlalomData.athletesName,
        // Map the SSRecords array to a new array of objects with the date converted to a Date object
        SSRecords: speedSlalomData.SSRecords.map((record) => ({
          ...record,
          // Convert the date string to a Date object
          date: new Date(record.date),
        })),
      });

      await newAthlete.save().then(() => {
        res.send('Athlete created, record added successfully!');
      });
    }

  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/addAthleteInfo', async (req, res) => {
  console.log('Received request to add Athlete Info');

  try {
    const athletesInfo = req.body;
    console.log(athletesInfo);
    const newAthletesInfo = new athletesInfoModel(athletesInfo);
    await newAthletesInfo.save().then(() => {
      res.send('Athlete created, record added successfully!');
      console.log('Records added successfully!');
    });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});