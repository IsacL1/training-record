const express = require('express');
const mongoose = require('mongoose');

const connectDB = require('./conn.js');
const athletesRecordsModel = require('./models/schema.js').athletesRecordsModel;
const athletesInfoModel = require('./models/schema.js').athletesInfoModel;

const app = express();

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:6660', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Accept'], // Allow these headers
  maxAge: 3600, // Set the maximum age of the CORS configuration
}));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:6660');  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  next();
});

connectDB();

app.get('/api/data', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:6660');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  res.json({ data: 'Hello World' });
});

// get request from mongoDB
app.get('/api/getSSRecord', async (req, res) => {
  await athletesRecordsModel.find({}).then(function (athletesRecords) {
    res.json(athletesRecords);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });

  });
});

app.get('/api/getAthletesInfo', async (req, res) => {
  await athletesInfoModel.find({}).then(function (athletesRecord) {
    res.json(athletesRecord);
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Error fetching data' });
  });
});

app.get('/api/getAthletesInfo/athletes', async (req, res) => {
  try {
    const athletes = await athletesInfoModel.find().select('athleteName');
    res.json(athletes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
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
    const athlete = await athletesRecordsModel.findOne({ athleteName: speedSlalomData.athleteName });

    if (athlete) {
      // Athlete exists, add new record to SSRecords
      const newSSRecord = {
        date: new Date(speedSlalomData.SSRecords[0].date),
        side: speedSlalomData.SSRecords[0].side,
        step: speedSlalomData.SSRecords[0].step,
        time12m: speedSlalomData.SSRecords[0].time12m,
        time: speedSlalomData.SSRecords[0].time,
        missedCone: speedSlalomData.SSRecords[0].missedCone,
        kickedCone: speedSlalomData.SSRecords[0].kickedCone,
        DQ: speedSlalomData.SSRecords[0].DQ,
        endLine: speedSlalomData.SSRecords[0].endLine,
        SSResult: speedSlalomData.SSRecords[0].SSResult,
        notes: speedSlalomData.SSRecords[0].notes,
        recordType: speedSlalomData.SSRecords[0].recordType
      };

      console.log(newSSRecord);
      athlete.SSRecords.push(newSSRecord); // Add the new Speed Slalom record to the athlete's existing records
      await athlete.save().then(() => {
        console.log('Records updated successfully!');
      });

    } else {
      // Athlete doesn't exist, create a new record
      const newAthlete = new athletesRecordsModel({
        athleteName: speedSlalomData.athleteName,
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
    console.log('Athlete ID:', req.body.athleteId);
    console.log(req.body);

    const newAthletesInfo = new athletesInfoModel(req.body);
    await newAthletesInfo.save();
    res.send('Athlete created, record added successfully!');
    console.log('Records added successfully!');

  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/api/uploadAthleteInfo', async (req, res) => {

  try {
    const fileData = req.body.file;
    const fileType = req.body.type;

    // REMARKS: 
    // req.body recived as an object, and it can read JSON data
    // output 


    // console.log('req.body type:', typeof fileType);
    // console.log('req.body:', fileType);
    // console.log('req.body:', fileType);

    // recived type of fileType is not JSON?? it's Object??
    if (fileType === 'application/json') {
      try {
        // Process the JSON data
        // const jsonData = fileData;
        const jsonData = JSON.parse(fileData);
        // console.log(jsonData);
        if (Array.isArray(jsonData)) {
          // const jsonData = JSON.parse(file.buffer.toString());
          const newAthletesInfo = jsonData.map((item) => new athletesInfoModel(item));
          await athletesInfoModel.insertMany(newAthletesInfo);
          res.send('Data inserted successfully!');
        } else {
          res.status(400).send('Invalid JSON data');
        }
      } catch (error) {
        console.error('Error processing JSON:', error);
        res.status(400).send('Invalid JSON data');
      }
    } else if (fileType === 'text/csv') {
      const csvData = [];
      const csv = require('csv-parser');
      const readStream = file.buffer.createReadStream();
      readStream.pipe(csv()).on('data', (row) => {
        csvData.push(row);
      }).on('end', async () => {
        const newAthletesInfo = csvData.map((item) => new athletesInfoModel(item));
        await athletesInfoModel.insertMany(newAthletesInfo);
        res.send('Data inserted successfully!');
      });
    } else {
      res.status(400).send('Unsupported file type. Please upload a JSON or CSV file.');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting data');
  }
});


const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});