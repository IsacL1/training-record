import React, { useEffect, useState } from 'react';

/*
fetch('src/Data/SpeedSlalomRecord.json')
  .then(response => response.json())
  .then(data => console.log(data));
*/

interface Athlete {
  name: string;
  records: Record<string, any>[];
}

interface SpeedSlalomForm extends Athlete {
  date: any;
  side: "L" | "R";
  step: number;
  time: number;
  missedCone: number;
  kickedCone: number;
  DQ: boolean;
  endLine: boolean;
  result: any;
  notes?: string;
}

const SpeedSlalom = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);


  const [SpeedSlalomForm, setSpeedSlalomForm] = useState<SpeedSlalomForm>({
    name: '', records: [], date: '', side: 'L', step: 0, time: 0.0,
    missedCone: 0, kickedCone: 0, DQ: false, endLine: false, result: 0.000, notes: ''
  });

  useEffect(() => {
    fetch('src/Data/SpeedSlalomForm.json')
      .then(response => response.json())
      .then(data => setAthletes(data.athletes));
  }, []);


  // Handle submit - SpeedSlalom form 
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Calculate the result and keep 3 decimal places
    const result = (Number(SpeedSlalomForm.time) + ((Number(SpeedSlalomForm.missedCone) + Number(SpeedSlalomForm.kickedCone)) * 0.2)).toFixed(3);

    console.log(SpeedSlalomForm);
    setSpeedSlalomForm({ ...SpeedSlalomForm, result });

    /*
        // get json from local 
        fetch('file:///src/Data/SpeedSlalomRecord.json')
          .then(response => response.json())
          .then(data => {
            // Update data with new form submission
            const updatedData = {
              ...data,
              athletes: [
                ...data.athletes,
                {
                  name: SpeedSlalomForm.name,
                  records: [
                    {
                      date: SpeedSlalomForm.date,
                      side: SpeedSlalomForm.side,
                      step: SpeedSlalomForm.step,
                      time: SpeedSlalomForm.time,
                      missedCone: SpeedSlalomForm.missedCone,
                      kickedCone: SpeedSlalomForm.kickedCone,
                      DQ: SpeedSlalomForm.DQ,
                      endLine: SpeedSlalomForm.endLine,
                      result: result,
                      notes: SpeedSlalomForm.notes,
                    },
                  ],
                },
              ],
            };
    
            // Write updated data back to JSON file
            fetch('file:///src/Data/SpeedSlalomRecord.json', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedData),
            })
              .then(response => response.json())
              .then(data => console.log(data))
              .catch(error => console.error(error));
          })
          .catch(error => console.error(error));
    */
  };

  // Handle change - SppedSlalom form  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeedSlalomForm({ ...SpeedSlalomForm, [event.target.name]: event.target.value });

    if (event.target.name === 'endline') {
      setSpeedSlalomForm({ ...SpeedSlalomForm, endLine: event.target.checked });
    } else {
      setSpeedSlalomForm({ ...SpeedSlalomForm, [event.target.name]: event.target.value });
    }
  };

  // get data from speedslalomrecords
  const [SSRecords, setSSRecords] = useState([]);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8001/getSSRecords')
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json()
        setSSRecords(data.speedslalomrecords)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  // Calculate and test the output
  /*
  const Cal = () => {
    const result = (Number(SpeedSlalomForm.time) + ((Number(SpeedSlalomForm.missedCone) + Number(SpeedSlalomForm.kickedCone)) * 0.2)).toFixed(3);
    return result;
  }
  */

  return (
    <div className='main'><h1 className='tittle'>Speed Slalom</h1>
      <form onSubmit={handleSubmit} className='form'>
        <label>
          Name: <input type="text" name="name" id="inputType" value={SpeedSlalomForm.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Date: <input type="date" name="date" id="inputType" value={SpeedSlalomForm.date || new Date().toISOString().split('T')[0]} onChange={handleChange} />
        </label>
        <br />
        <label>
          Side: <input type="text" name="side" id="inputType" value={SpeedSlalomForm.side} onChange={handleChange} />
        </label>
        <br />
        <label>
          Step: <input type="number" name="step" id="inputType" value={SpeedSlalomForm.step} onChange={handleChange} />
        </label>
        <br />
        <label>
          Time: <input type="number" name="time" id="inputType" value={SpeedSlalomForm.time} onChange={handleChange} />
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
          <p>DQ: {Number(SpeedSlalomForm.kickedCone) + Number(SpeedSlalomForm.missedCone) > 4 || SpeedSlalomForm.endLine ? 'Yes' : 'No'}</p>
        </label>
        <br />
        <button type="submit">Submit</button>
        <br />
        <p>
          Result:  <input type="text" name="result" id="inputType" value={SpeedSlalomForm.result} onChange={handleChange} disabled />
        </p>
        <br />
        {/* to test output
        <p>{Cal()}</p>
        */}
      </form>

      {SSRecords.map((SSRecords, index) => (<p>{SSRecords[0]}, {SSRecords[1]}</p>))}
      {/*
      <div>
        {athletes.map((athlete, index) => (
          <div key={index}>
            <h2>{athlete.name}</h2>
            <ul>
              {athlete.records.map((record, index) => (
                <li key={index}>
                  <p>Date: {record.date}</p>
                  <p>Side: {record.side}</p>
                  <p>Step: {record.step}</p>
                  <p>Time: {record.time}</p>
                  <p>Missed Cone: {record.missedCone}</p>
                  <p>Kick Cone: {record.kickedCone}</p>
                  <p>DQ: {record.DQ ? 'Yes' : 'No'}</p>
                  <p>End Line: {record.endLine ? 'Yes' : 'No'}</p>
                  <p>Result: {record.result}</p>
                  <p>Notes: {record.notes}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      */}
    </div>
  );
};

export default SpeedSlalom;