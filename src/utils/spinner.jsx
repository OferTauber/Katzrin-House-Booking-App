import './spinner.css';

const Spinner = () => {
  return (
    <div className="spinner">
      <div id="jump" className="dots  jump">
        <div className="dot-l dot"></div>
        <div className="dot-m dot"></div>
        <div className="dot-r dot"></div>
      </div>
      <h2>טוען נתונים</h2>
    </div>
  );
};

export default Spinner;
