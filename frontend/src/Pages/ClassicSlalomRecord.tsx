interface AthleteForm {
  name: string;

}

interface ClassicData extends AthleteForm {
  result: any;
  side: "L" | "R";
  step: number;
  time: number;
  missedCone: number;
  kickCone: number;

}

const Classic = () => {


  return (
    <div className='App'>
      <div className='title'>
        <p>Classic Record</p>

      </div>
    </div>
  );
};

export default Classic;