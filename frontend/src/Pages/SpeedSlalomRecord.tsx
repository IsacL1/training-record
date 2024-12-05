import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { SpeedSlalomForm } from '../Model/Interface';
import axios from 'axios';
import moment
 from 'moment';
const host = 'localhost:3001'

const SpeedSlalom = () => {
  const [SpeedSlalomForm, setSpeedSlalomForm] = useState<SpeedSlalomForm>({
    AthleteName: '',
    date: new Date(),
    side: 'L',
    step: null,
    time: null,
    missedCone: null,
    kickedCone: null,
    DQ: false,
    endLine: false,
    SSResult: null,
    notes: ''
  });

  // Handle submit - SpeedSlalom form 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(typeof SpeedSlalomForm.date);
    console.log(SpeedSlalomForm.date);

    console.log('handleSubmit called');
    event.preventDefault();
    // Calculate the result and keep 3 decimal places
    const SSResult = (Number(SpeedSlalomForm.time) + ((Number(SpeedSlalomForm.missedCone) + Number(SpeedSlalomForm.kickedCone)) * 0.2)).toFixed(3);

    setSpeedSlalomForm({ ...SpeedSlalomForm, SSResult: parseFloat(SSResult) });
    console.log(SSResult);

    // Validate the data
    if (!SpeedSlalomForm.AthleteName || !SpeedSlalomForm.date || !SpeedSlalomForm.side || !SpeedSlalomForm.step || !SpeedSlalomForm.time) {
      toast.error('Please fill in all required fields');
    } else if (SpeedSlalomForm.missedCone === null || SpeedSlalomForm.missedCone < 0) {
      SpeedSlalomForm.missedCone = 0;
    } else if (SpeedSlalomForm.kickedCone === null || SpeedSlalomForm.kickedCone < 0) {
      SpeedSlalomForm.kickedCone = 0;
    } else if (SpeedSlalomForm.step <= 0 || SpeedSlalomForm.time <= 0) {
      toast.error('Invalid values');
    }

    // Warp the data
    const speedSlalomData = {
      athletesName: SpeedSlalomForm.AthleteName,
      SSRecords: [{
        date: SpeedSlalomForm.date,
        side: SpeedSlalomForm.side,
        step: SpeedSlalomForm.step,
        time: SpeedSlalomForm.time,
        missedCone: SpeedSlalomForm.missedCone,
        kickedCone: SpeedSlalomForm.kickedCone,
        DQ: SpeedSlalomForm.DQ,
        endLine: SpeedSlalomForm.endLine,
        SSResult: SpeedSlalomForm.SSResult,
        notes: SpeedSlalomForm.notes,
      }]
    };

    console.log(typeof speedSlalomData);
    console.log(typeof SpeedSlalomForm.date);

    // Send data to server
    axios.post(`http://${host}/api/addSSRecord`, speedSlalomData)
      .then((response) => {
        console.log(response.data);
        toast.success('Data submitted successfully!');
      })
      .catch((error) => {
        console.error(error);
        toast.error('Error submitting data!');
      });

  };

  // Handle change - SppedSlalom form  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeedSlalomForm({ ...SpeedSlalomForm, [event.target.name]: event.target.value });

    if (event.target.name === 'date') {
      setSpeedSlalomForm({ ...SpeedSlalomForm, date: new Date(event.target.value) });
    } else if (event.target.name === 'endline') {
      setSpeedSlalomForm({ ...SpeedSlalomForm, endLine: event.target.checked });
    } else {
      setSpeedSlalomForm({ ...SpeedSlalomForm, [event.target.name]: event.target.value });
    }
  };

  return (
    <div className='main'><h1 className='title'>Speed Slalom</h1>
      <form onSubmit={handleSubmit} className='form'>
        {/*<label>
          Name: <select name="athleteName" id="inputType" value={selectedAthlete} onChange={(event) => setSelectedAthlete(event.target.value)} required >
            <option value="">Select an athlete</option>

            {athletes.map((athlete) => (
              <option key={athlete} value={athlete}>
                {athlete}
              </option>
            ))}
          </select>
        </label>
        */}

        <input type="text" name="AthleteName" id="inputType" value={SpeedSlalomForm.AthleteName} placeholder="Athelete Name" onChange={handleChange} required />

        <input type="date" name="date" id="inputType"
          // The value of the input is set to the date part of the SpeedSlalomForm.date
          // The reason for this is that the input type="date" expects a date string in the format "yyyy-mm-dd"
          // The SpeedSlalomForm.date is a Date object, so we need to format it to a string in the correct format
          // The toISOString() method returns a string in the format "yyyy-mm-ddThh:mm:ss.sssZ"
          // We split the string at the 'T' character to get the date part only
          // value={SpeedSlalomForm.date.toISOString().split('T')[0]} placeholder="Date"
          value={moment(SpeedSlalomForm.date).format('YYYY-MM-DD')}
          onChange={handleChange} required
        />

        <input type="radio" name="side" id="left" value="L" checked={SpeedSlalomForm.side === 'L'} onChange={handleChange} />
        <label htmlFor="left">L</label>
        
        <input type="radio" name="side" id="right" value="R" checked={SpeedSlalomForm.side === 'R'} onChange={handleChange} />
        <label htmlFor="right">R</label>

        <input type="number" name="step" id="inputType" value={SpeedSlalomForm.step ?? 0} placeholder="Steps" onChange={handleChange} required />

        <input type="number" name="time" id="inputType" value={SpeedSlalomForm.time ?? 0} placeholder="Time" onChange={handleChange} required />

        <input type="number" name="missedCone" id="inputType" value={SpeedSlalomForm.missedCone ?? 0} placeholder="Missed Cone" onChange={handleChange} />

        <input type="number" name="kickedCone" id="inputType" value={SpeedSlalomForm.kickedCone ?? 0} placeholder="Kicked Cone" onChange={handleChange} />

        End line: <input type="checkbox" name="endline" id="inputType" checked={SpeedSlalomForm.endLine} placeholder="End Line?" onChange={handleChange} />
        {/* checkbox default true? */}
        {Number(SpeedSlalomForm.kickedCone) + Number(SpeedSlalomForm.missedCone) > 4 || SpeedSlalomForm.endLine ? 'DQ' : ''}

        <input type="text" name="notes" id="inputType" value={SpeedSlalomForm.notes} placeholder='Notes' />

        <button type="submit">Submit</button>
        <br></br>
        <label>{SpeedSlalomForm.SSResult}</label>

      </form>
    </div>
  );
};

export default SpeedSlalom;