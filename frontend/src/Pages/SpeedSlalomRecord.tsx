import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AthletesInfo } from '../Model/Interface';
import axios from 'axios';
import moment from 'moment';

interface SpeedSlalomForm {
  AthleteName: string;
  date: Date;
  side: "L" | "R";
  step: number;
  time: number;
  missedCone: number;
  kickedCone: number;
  DQ: boolean;
  endLine: boolean;
  SSResult: any;
  notes?: string;
}


const SpeedSlalom = () => {
  /*
  const [athletes, setAthletes] = useState([]);
  const [selectedAthlete, setSelectedAthlete] = useState('');
  */
  const [SpeedSlalomForm, setSpeedSlalomForm] = useState<SpeedSlalomForm>({
    AthleteName: '',
    date: new Date(),
    side: 'L',
    step: 0,
    time: 0.0,
    missedCone: 0,
    kickedCone: 0,
    DQ: false,
    endLine: false,
    SSResult: 0.000,
    notes: ''
  });

  /*
    useEffect(() => {
      axios.get('http://localhost:3001/api/getAthletes')
        .then(response => {
          const athletesData = response.data;
          const athletesNames = athletesData.map((athlete: { athletesName: any; }) => athlete.athletesName);
          setAthletes(athletesNames);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  */
  // Handle submit - SpeedSlalom form 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(typeof SpeedSlalomForm.date);
    console.log(SpeedSlalomForm.date);

    console.log('handleSubmit called');
    event.preventDefault();
    // Calculate the result and keep 3 decimal places
    const SSresult = (Number(SpeedSlalomForm.time) + ((Number(SpeedSlalomForm.missedCone) + Number(SpeedSlalomForm.kickedCone)) * 0.2)).toFixed(3);

    setSpeedSlalomForm({ ...SpeedSlalomForm, SSResult: parseFloat(SSresult) });
    console.log(SSresult);

    // Validate the data
    if (!SpeedSlalomForm.AthleteName || !SpeedSlalomForm.date || !SpeedSlalomForm.side || !SpeedSlalomForm.step || !SpeedSlalomForm.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (SpeedSlalomForm.step <= 0 || SpeedSlalomForm.time <= 0 || SpeedSlalomForm.missedCone < 0 || SpeedSlalomForm.kickedCone < 0) {
      toast.error('Invalid values');
      return;
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
    axios.post('http://localhost:3001/api/addSSRecord', speedSlalomData)
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
    <div className='main'><h1 className='tittle'>Speed Slalom</h1>
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
        <label>
          Name: <input type="text" name="AthleteName" id="inputType" value={SpeedSlalomForm.AthleteName} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Date: <input type="date" name="date" id="inputType"
            // The value of the input is set to the date part of the SpeedSlalomForm.date
            // The reason for this is that the input type="date" expects a date string in the format "yyyy-mm-dd"
            // The SpeedSlalomForm.date is a Date object, so we need to format it to a string in the correct format
            // The toISOString() method returns a string in the format "yyyy-mm-ddThh:mm:ss.sssZ"
            // We split the string at the 'T' character to get the date part only
            value={ SpeedSlalomForm.date.toISOString().split('T')[0] } 
            // value={moment(SpeedSlalomForm.date).format('YYYY-MM-DD')}
            onChange={ handleChange } required
          />
        </label>
        <br />
        <label>
          Side: <input type="text" name="side" id="inputType" value={SpeedSlalomForm.side} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Step: <input type="number" name="step" id="inputType" value={SpeedSlalomForm.step} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Time: <input type="number" name="time" id="inputType" value={SpeedSlalomForm.time} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Missed: <input type="number" name="missedCone" id="inputType" value={SpeedSlalomForm.missedCone == null ? 0 : SpeedSlalomForm.missedCone} onChange={handleChange} />
        </label>
        <br />
        <label>
          Kicked: <input type="number" name="kickedCone" id="inputType" value={SpeedSlalomForm.kickedCone == null ? 0 : SpeedSlalomForm.kickedCone} onChange={handleChange} />
        </label>
        <br />
        <label>
          End line: <input type="checkbox" name="endline" id="inputType" checked={SpeedSlalomForm.endLine} onChange={handleChange} />
        </label>
        <br />
        <label>{/* checkbox default true? */}
          DQ: {Number(SpeedSlalomForm.kickedCone) + Number(SpeedSlalomForm.missedCone) > 4 || SpeedSlalomForm.endLine ? 'Yes' : 'No'}
        </label>
        <br />
        <label>
          Notes: <input type="text" name="notes" id="inputType" value={SpeedSlalomForm.notes} />
        </label>
        <br />
        <button type="submit">Submit</button>
        <br />
        <label>
          Result:  <input type="text" name="SSresult" id="inputType" value={SpeedSlalomForm.SSResult} onChange={handleChange} readOnly={true} />
        </label>
        <br />
      </form>
    </div>
  );
};

export default SpeedSlalom;