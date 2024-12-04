
interface AthleteForm {
  name: string;

}

interface SlideData extends AthleteForm {
  result: any;
  side: "L" | "R";
  step: number;
  time: number;
  missedCone: number;
  kickCone: number;
}


const Slide = () => {


  return (
      <div className='title'>
        <p>Slide Record</p>

      </div>
  );
};

export default Slide;