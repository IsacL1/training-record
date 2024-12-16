import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SpeedSlalomBasic, SSRdetails } from '../Model/Interface';
import axios from 'axios';
import moment from 'moment';

const host = 'localhost:3001';

const SpeedSlalom = () => {
  // Slalom Record Basic
  // Add a state to store the form data
  const [SpeedSlalomBasic, setSpeedSlalomForm] = useState<SpeedSlalomBasic>({
    AthleteName: '',
    date: new Date(),
    time: null,
    missedCone: null,
    kickedCone: null,
    DQ: false,
    endLine: false,
    SSResult: null,
    notes: '',
    recordType: "Normal"
  });

  // Slalom Record Details
  // Add a state to store the form data
  const [SSRdetails, setSSRdetails] = useState<SSRdetails>({
    ...SpeedSlalomBasic,
    side: 'L',
    step: null,
    time12m: null,
    time20cones: null,
    recordType: "Details"
  });

  // Add a state to store the list of athletes
  const [athletes, setAthletes] = useState<string[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(false);
  const [showNormal, setShowNormal] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  // Handle submit - SpeedSlalom form 
  const handleNormalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // console.log(typeof SpeedSlalomBasic.date);
    // console.log(SpeedSlalomBasic.date);

    console.log('handleSubmit called');
    event.preventDefault();
    // Calculate the result and keep 3 decimal places
    setSpeedSlalomForm({ ...SpeedSlalomBasic, recordType: "Normal" });

    const SSResult = (Number(SpeedSlalomBasic.time) + ((Number(SpeedSlalomBasic.missedCone) + Number(SpeedSlalomBasic.kickedCone)) * 0.2)).toFixed(3);

    setSpeedSlalomForm({ ...SpeedSlalomBasic, SSResult: parseFloat(SSResult) });
    console.log("SSR", SSResult);
    

    // Validate the data
    if (!SpeedSlalomBasic.AthleteName || !SpeedSlalomBasic.date || !SpeedSlalomBasic.time) {
      toast.error('Please fill in all required fields');
    } else if (SpeedSlalomBasic.missedCone === null || SpeedSlalomBasic.missedCone <= 0) {
      SpeedSlalomBasic.missedCone = 0;
    } else if (SpeedSlalomBasic.kickedCone === null || SpeedSlalomBasic.kickedCone <= 0) {
      SpeedSlalomBasic.kickedCone = 0;
    }

    // Warp the data
    const speedSlalomData = {
      athleteName: SpeedSlalomBasic.AthleteName,
      SSRecords: [{
        date: SpeedSlalomBasic.date,
        time: SpeedSlalomBasic.time,
        missedCone: SpeedSlalomBasic.missedCone,
        kickedCone: SpeedSlalomBasic.kickedCone,
        DQ: SpeedSlalomBasic.DQ,
        endLine: SpeedSlalomBasic.endLine,
        SSResult: SSResult,
        notes: SpeedSlalomBasic.notes,
        recordType: SpeedSlalomBasic.recordType
      }]
    };

    console.log(typeof speedSlalomData);
    console.log("SpeedSlalomBasic: ", SpeedSlalomBasic);

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

  const handleNormalClick = () => {
    setShowNormal(true);
    setShowDetails(false);
  };

  const handleDetailsClick = () => {
    setShowNormal(false);
    setShowDetails(true);
  };

  const handleDetailsSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // console.log(typeof SSRdetails.date);
    // console.log(SSRdetails.date);

    console.log('handleDetailSubmit called');
    event.preventDefault();
    // Calculate the result and keep 3 decimal places
    const SSResult = (Number(SSRdetails.time) + ((Number(SSRdetails.missedCone) + Number(SSRdetails.kickedCone)) * 0.2)).toFixed(3);

    setSSRdetails({ ...SSRdetails, SSResult: parseFloat(SSResult) });
    console.log("SSR", SSResult);

    // Validate the data
    if (!SSRdetails.AthleteName || !SSRdetails.date || !SSRdetails.side || !SSRdetails.step || !SSRdetails.time) {
      toast.error('Please fill in all required fields');
    } else if (SSRdetails.missedCone === null || SSRdetails.missedCone <= 0) {
      SSRdetails.missedCone = 0;
    } else if (SSRdetails.kickedCone === null || SSRdetails.kickedCone <= 0) {
      SSRdetails.kickedCone = 0;
    } else if (SSRdetails.step <= 0 || SSRdetails.time <= 0) {
      toast.error('Invalid values');
    }

    // Warp the data
    const speedSlalomData = {
      athleteName: SSRdetails.AthleteName,
      SSRecords: [{
        date: SSRdetails.date,
        side: SSRdetails.side,
        step: SSRdetails.step,
        time12m: SSRdetails.time12m,
        time20cones: SSRdetails.time20cones,
        time: SSRdetails.time,
        missedCone: SSRdetails.missedCone,
        kickedCone: SSRdetails.kickedCone,
        DQ: SSRdetails.DQ,
        endLine: SSRdetails.endLine,
        SSResult: SSResult,
        notes: SSRdetails.notes,
        recordType: 'Details'
      }]
    };

    console.log(typeof speedSlalomData);
    console.log(SSRdetails);

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
  const handleNormalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeedSlalomForm({ ...SpeedSlalomBasic, [event.target.name]: event.target.value });
    console.log(SpeedSlalomBasic);

    if (event.target.name === 'date') {
      setSpeedSlalomForm({ ...SpeedSlalomBasic, date: new Date(event.target.value) });
    } else if (event.target.name === 'endline') {
      setSpeedSlalomForm({ ...SpeedSlalomBasic, endLine: event.target.checked });
    } else {
      setSpeedSlalomForm({ ...SpeedSlalomBasic, [event.target.name]: event.target.value });
      // console.log(SpeedSlalomBasic);
    }
  };


  // Handle change - SppedSlalom form  
  const handleDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSSRdetails({ ...SSRdetails, [event.target.name]: event.target.value });
    console.log(SSRdetails);

    if (event.target.name === 'date') {
      setSSRdetails({ ...SSRdetails, date: new Date(event.target.value) });
    } else if (event.target.name === 'endline') {
      setSSRdetails({ ...SSRdetails, endLine: event.target.checked });
    } else {
      setSSRdetails({ ...SSRdetails, [event.target.name]: event.target.value });
      // console.log(SpeedSlalomBasic);
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
    setSpeedSlalomForm({ ...SpeedSlalomBasic, AthleteName: event.target.value });
    setSSRdetails({ ...SSRdetails, AthleteName: event.target.value });
    setShowList(false);
  };

  return (
    <div className='main'>
      <button onClick={handleNormalClick}>Normal</button>
      <button onClick={handleDetailsClick}>Details</button>
      <h1 className='title'>Speed Slalom</h1>
      <div className='container'>

        {showNormal && (
          <form className='form' onSubmit={handleNormalSubmit}>
            <div className="formContent row row-md">
              <label className="formLabel col-sm-5 col-form-label">Name: </label>
              <select name="athleteName" className="inputBox" value={selectedAthlete} onChange={handleAthleteChange} required>
                <option value="">Select an athlete</option>
                {athletes.map((athlete) => (
                  <option key={athlete} value={athlete}>
                    {athlete}
                  </option>
                ))}
              </select>
            </div>

            <div className="formContent row md">
              <label className="formLabel col-sm-5 col-form-label">Date: </label>
              <input type="date" name="date" className="inputBox"
                value={moment(SpeedSlalomBasic.date).format('YYYY-MM-DD')}
                onChange={handleNormalChange} required
              />
            </div>

            <div className="formContent row row-md">
              <label className="formLabel col-sm-5 col-form-label">*Time: </label>
              <input type="number" name="time" className="inputBox" value={SpeedSlalomBasic.time ?? 0} placeholder="Time" onChange={handleNormalChange} required />
            </div>

            <div className="formContent row row-md">
              <label className="formLabel col-sm-5 col-form-label">Missed: </label>
              <input type="number" name="missedCone" className="inputBox" value={SpeedSlalomBasic.missedCone ?? 0} placeholder="Missed Cone" onChange={handleNormalChange} />
            </div>

            <div className="formContent row row-md">
              <label className="formLabel col-sm-5 col-form-label">Kicked: </label>
              <input type="number" name="kickedCone" className="inputBox" value={SpeedSlalomBasic.kickedCone ?? 0} placeholder="Kicked Cone" onChange={handleNormalChange} />
            </div>

            <div className="formContent row row-md">
              <label className="formLabel col-sm-5 col-form-label">End line: </label>

              <div className="formRadio col-sm col-form-label">
                <input type="checkbox" name="endline" className="col-sm-5" checked={SpeedSlalomBasic.endLine} placeholder="End Line?" onChange={handleNormalChange} />
              </div>
              <label className="formLabel col-sm-2 col-form-label">
                <label className='foramLabel-DQ col-sm-2'>{Number(SpeedSlalomBasic.kickedCone) + Number(SpeedSlalomBasic.missedCone) > 4 || SpeedSlalomBasic.endLine ? 'DQ' : ''}</label>
              </label>

            </div>

            <div className="formContent row row-md">
              <label className="formLabel col-sm-5 col-form-label">Notes: </label>
              <input type="text" name="notes" className="inputBox" value={SpeedSlalomBasic.notes} placeholder='Notes / Comments' onChange={handleNormalChange} />
            </div>

            <div className="formContent row row-md">
              <button type="submit">Submit</button>
            </div>
            <div className="formContent row row-md">
              <span className="formLabel-Result col-sm-5 col-form-label">{SpeedSlalomBasic.SSResult}</span>
            </div>
          </form>
        )}

        {showDetails && (
          <form className='form' onSubmit={handleDetailsSubmit}>
            <div className="formContent row row-md">
              <label className="formLabel col-sm-5 col-form-label">Name: </label>
              <select name="athleteName" className="inputBox" value={selectedAthlete} onChange={handleAthleteChange} required>
                <option value="">Select an athlete</option>
                {athletes.map((athlete) => (
                  <option key={athlete} value={athlete}>
                    {athlete}
                  </option>
                ))}
              </select>
            </div>

            <div className="formContent row md">
              <label className="formLabel col-sm-5 col-form-label">Date: </label>
              <input type="date" name="date" className="inputBox"
                value={moment(SSRdetails.date).format('YYYY-MM-DD')}
                onChange={handleDetailsChange} required
              />

            </div>

            <div className="formContent row row-sm">
              <label className="formLabel col-sm-5 col-form-label">Feet in box: </label>

              <div className="formRadio col-sm-2">
                <input type="radio" name="side col-sm-5" className="" value="L" checked={SSRdetails.side === 'L'} onChange={handleDetailsChange} />
                <label htmlFor="left" className="formLabel col-sm col-form-label">L</label>
              </div>
              <div className="formRadio col-sm-2">
                <input type="radio" name="side col-sm" className="" value="R" checked={SSRdetails.side === 'R'} onChange={handleDetailsChange} />
                <label htmlFor="right" className="formLabel col-sm col-form-label">R</label>
              </div>
            </div>

            <div className="formContent row row-md">
              <label className="formLabel col-sm-5 col-form-label">*Steps: </label>
              <input type="text" name="step" className="inputBox" value={Number(SSRdetails.step) ?? 0} placeholder="Steps" onChange={handleDetailsChange} required />
            </div>

            <div className="formContent row row-md">
              <label className="formLabel col-sm-5 col-form-label">*Time 12m: </label>
              <input type="number" name="time12m" className="inputBox" value={SSRdetails.time12m ?? 0} placeholder="12m time" onChange={handleDetailsChange} required />
            </div>

            <div className="formContent row row-md">
              <label className="formLabel col-sm-5 col-form-label">*Time 20 cones: </label>
              <input type="number" name="time20cones" className="inputBox" value={SSRdetails.time20cones ?? 0} placeholder="20 cones time" onChange={handleDetailsChange} required />
            </div>

            <div className="formContent row row-md">
              <label className="formLabel col-sm-5 col-form-label">*Time: </label>
              <input type="number" name="time" className="inputBox" value={SSRdetails.time ?? 0} placeholder="Time" onChange={handleDetailsChange} required />
            </div>

            <div className="formContent row row-md">
              <label className="formLabel col-sm-5 col-form-label">Missed: </label>
              <input type="number" name="missedCone" className="inputBox" value={SSRdetails.missedCone ?? 0} placeholder="Missed Cone" onChange={handleDetailsChange} />
            </div>

            <div className="formContent row row-md">
              <label className="formLabel col-sm-5 col-form-label">Kicked: </label>
              <input type="number" name="kickedCone" className="inputBox" value={SSRdetails.kickedCone ?? 0} placeholder="Kicked Cone" onChange={handleDetailsChange} />
            </div>

            <div className="formContent row row-md">
              <label className="formLabel col-sm-5 col-form-label">End line: </label>

              <div className="formRadio col-sm col-form-label">
                <input type="checkbox" name="endline" className="col-sm-5" checked={SSRdetails.endLine} placeholder="End Line?" onChange={handleDetailsChange} />
              </div>
              <label className="formLabel col-sm-2 col-form-label">
                <label className='foramLabel-DQ col-sm-2'>{Number(SSRdetails.kickedCone) + Number(SSRdetails.missedCone) > 4 || SSRdetails.endLine ? 'DQ' : ''}</label>
              </label>
            </div>

            <div className="formContent row row-md">
              <label className="formLabel col-sm-5 col-form-label">Notes: </label>
              <input type="text" name="notes" className="inputBox" value={SSRdetails.notes} placeholder='Notes / Comments' onChange={handleDetailsChange} />
            </div>

            <div className="formContent row row-md">
              <button type="submit">Submit</button>
            </div>
            <div className="formContent row row-md">
              <span className="formLabel-Result col-sm-5 col-form-label">{SSRdetails.SSResult}</span>
            </div>
          </form>
        )}
      </div >
    </div >
  );
};

export default SpeedSlalom;