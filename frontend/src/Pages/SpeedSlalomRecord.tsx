import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SpeedSlalomForm } from '../Model/Interface';
import axios from 'axios';
import moment from 'moment';

const host = 'localhost:3001';

const SpeedSlalom = () => {
  const [SpeedSlalomForm, setSpeedSlalomForm] = useState<SpeedSlalomForm>({
    AthleteName: '',
    date: new Date(),
    side: 'L',
    step: null,
    time12m: null,
    time: null,
    missedCone: null,
    kickedCone: null,
    DQ: false,
    endLine: false,
    SSResult: null,
    notes: ''
  });
  // Add a state to store the list of athletes
  const [athletes, setAthletes] = useState<string[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(false);

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
        time12m: SpeedSlalomForm.time12m,
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

  // Fetch the list of athletes from the server
  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        const response = await axios.get(`http://${host}/api/getAthletesInfo/athletes`);
        setAthletes(response.data.map((athlete: any) => athlete.athleteName));
      } catch (error) {
        console.error(error);
      }
    };
    fetchAthletes();
  }, []);

  // Handle change of selected athlete
  const handleAthleteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAthlete(event.target.value);
    setSpeedSlalomForm({ ...SpeedSlalomForm, AthleteName: event.target.value });
    setShowList(false);
  };

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredAthletes = athletes.filter((athlete) => {
    return athlete.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='main'>

      <h1 className='title'>Speed Slalom</h1>
      <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
           <div className="formContent row row-md">
            <label className="formLabel col-sm-5 col-form-label">Name: </label>
            <select name="athleteName" className="inputBox" value={selectedAthlete} onChange={handleAthleteChange} required>
              <option value="">Select an athlete</option>
              {filteredAthletes.map((athlete) => (
                <option key={athlete} value={athlete}>
                  {athlete}
                </option>
              ))}
            </select>
          </div> 

          {/* <div className="formContent row row-md">
            <label className="formLabel col-sm col-form-label">Athlete Name: </label>
            <input type="text" name="AthleteName" className="inputBox"
              value={SpeedSlalomForm.AthleteName}
              placeholder="Athelete Name" onChange={handleChange} required />
          </div> */}

          <div className="formContent row md">
            <label className="formLabel col-sm-5 col-form-label">Date: </label>
            <input type="date" name="date" className="inputBox"
              value={moment(SpeedSlalomForm.date).format('YYYY-MM-DD')}
              onChange={handleChange} required
            />

          </div>

          <div className="formContent row row-sm">
            <label className="formLabel col-sm-5 col-form-label">Feet in box: </label>

            <div className="formRadio col-sm-2">
              <input type="radio" name="side col-sm-5" className="" value="L" checked={SpeedSlalomForm.side === 'L'} onChange={handleChange} />
              <label htmlFor="left" className="formLabel col-sm col-form-label">L</label>
            </div>
            <div className="formRadio col-sm-2">
              <input type="radio" name="side col-sm" className="" value="R" checked={SpeedSlalomForm.side === 'R'} onChange={handleChange} />
              <label htmlFor="right" className="formLabel col-sm col-form-label">R</label>
            </div>
          </div>

          <div className="formContent row row-md">
            <label className="formLabel col-sm-5 col-form-label">Steps: </label>
            <input type="text" name="step" className="inputBox" value={Number(SpeedSlalomForm.step) ?? 0} placeholder="Steps" onChange={handleChange} required />
          </div>

          <div className="formContent row row-md">
            <label className="formLabel col-sm-5 col-form-label">Time(12m): </label>
            <input type="number" name="time12m" className="inputBox" value={SpeedSlalomForm.time12m ?? 0} placeholder="12m time" onChange={handleChange} required />
          </div>

          <div className="formContent row row-md">
            <label className="formLabel col-sm-5 col-form-label">Time: </label>
            <input type="number" name="time" className="inputBox" value={SpeedSlalomForm.time ?? 0} placeholder="Time" onChange={handleChange} required />
          </div>

          <div className="formContent row row-md">
            <label className="formLabel col-sm-5 col-form-label">Missed: </label>
            <input type="number" name="missedCone" className="inputBox" value={SpeedSlalomForm.missedCone ?? 0} placeholder="Missed Cone" onChange={handleChange} />
          </div>

          <div className="formContent row row-md">
            <label className="formLabel col-sm-5 col-form-label">Kicked: </label>
            <input type="number" name="kickedCone" className="inputBox" value={SpeedSlalomForm.kickedCone ?? 0} placeholder="Kicked Cone" onChange={handleChange} />
          </div>

          <div className="formContent row row-md">
            <label className="formLabel col-sm-5 col-form-label">End line: </label>

            <div className="formRadio col-sm col-form-label">
              <input type="checkbox" name="endline" className="col-sm-5" checked={SpeedSlalomForm.endLine} placeholder="End Line?" onChange={handleChange} />
            </div>
            <label className="formLabel col-sm-2 col-form-label">
              <label className='foramLabel-DQ col-sm-2'>{Number(SpeedSlalomForm.kickedCone) + Number(SpeedSlalomForm.missedCone) > 4 || SpeedSlalomForm.endLine ? 'DQ' : ''}</label>
            </label>

          </div>

          <div className="formContent row row-md">
            <label className="formLabel col-sm-5 col-form-label">Notes: </label>
            <input type="text" name="notes" className="inputBox" value={SpeedSlalomForm.notes} placeholder='Notes / Comments' onChange={handleChange} />
          </div>

          <div className="formContent row row-md">
            <button type="submit">Submit</button>
          </div>
          <div className="formContent row row-md">
          <label className="formLabel-Result col-sm-5 col-form-label">{SpeedSlalomForm.SSResult}</label>
          </div>
        </form>
      </div >
    </div >
  );
};

export default SpeedSlalom;