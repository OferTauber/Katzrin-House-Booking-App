// import { useGlobalContext } from '../../../utils/context';
import { useState, useEffect } from 'react';
import './info.css';
import Spinner from '../../../utils/spinner';
import { fetchPantry } from '../../../utils/axios';
import Pantry from './pantry';
import StaticInfo from './static_info';

export default function Info() {
  const [displayPantry, setDisplayPantry] = useState(false);
  const [pantryData, setPantryData] = useState([]);
  const [displayStaticInfo, setDisplayStaticInfo] = useState(true);
  // const [updatesData, setUpdatesData] = useState([]);

  useEffect(() => {
    const fetchPantryData = async () => {
      try {
        const fetchedPantryData = await fetchPantry();
        setPantryData(fetchedPantryData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPantryData();
  }, []);

  if (!pantryData) return <Spinner />;

  return (
    <div className="container">
      <div className="info">
        <div
          className="info-header"
          onClick={() => {
            toogleLine(displayStaticInfo, setDisplayStaticInfo);
          }}
        >
          מידע שימושי
        </div>
        <div className={`panel ${displayStaticInfo && 'panel-open'}`}>
          <StaticInfo />
        </div>
        <div
          className="info-header"
          onClick={() => {
            toogleLine(displayPantry, setDisplayPantry);
          }}
        >
          מזווה, מקרר ומקפיא
        </div>
        <div className={`panel ${displayPantry && 'panel-open'}`}>
          <Pantry data={pantryData} />
        </div>
      </div>
    </div>
  );
}

const toogleLine = (state, callback) => {
  callback(!state);
};
