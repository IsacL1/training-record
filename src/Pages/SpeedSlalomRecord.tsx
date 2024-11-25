import React, { useState } from 'react';

interface AthleteForm {
  name: string;

}

interface SpeedSlalom extends AthleteForm {
  result: any;
  side: "L" | "R";
  step: number;
  time: number;
  missedCone: number;
  kickCone: number;

}

const SpeedSlalom = () => {
  const [SpeedSlalom, setSpeedSlalom] = useState<SpeedSlalom>({ name: '', side: 'L', step: 0, time: 0.0, 
                                                                missedCone: 0, kickCone: 0, result: 0 });
  const [result, setResult] = useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = SpeedSlalom.time + (SpeedSlalom.missedCone + SpeedSlalom.kickCone) * 0.2;
    console.log(SpeedSlalom);
    setSpeedSlalom({ ...SpeedSlalom, result });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeedSlalom({ ...SpeedSlalom, [event.target.name]: event.target.value });
  };

  return (
      <div className='main'>Speed Slalom
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={SpeedSlalom.name} onChange={handleChange} />
          </label>
          <br />
          <label>
            Side:
            <input type="text" name="side" value={SpeedSlalom.side} onChange={handleChange} />
          </label>
          <br />
          <label>
            Step:
            <input type="number" name="step" value={SpeedSlalom.side} onChange={handleChange} />
          </label>
          <br />
          <label>
            Time:
            <input type="number" name="time" value={SpeedSlalom.side} onChange={handleChange} />
          </label>
          <br />
          <label>
            Missed:
            <input type="number" name="misseCone" value={SpeedSlalom.side} onChange={handleChange} />
          </label>
          <br />
          <label>
            Kicked:
            <input type="number" name="kickCone" value={SpeedSlalom.side} onChange={handleChange} />
          </label>
          <br />
          <p>
            Result:  { result }
          </p>
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
  );
};

export default SpeedSlalom;