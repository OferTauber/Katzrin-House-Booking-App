// import { useGlobalContext } from '../../../utils/context';
import { useState, useEffect } from 'react';
import './info.css';
import Spinner from '../../../utils/spinner';
import { fetchPantry, getUpdats } from '../../../utils/axios';
import Pantry from './pantry';
import StaticInfo from './static_info';
import Updates from './update';

export default function Info() {
  const [displayPantry, setDisplayPantry] = useState(false);
  const [pantryData, setPantryData] = useState([]);
  const [displayStaticInfo, setDisplayStaticInfo] = useState(true);
  const [displayUpdates, setDisplayUpdates] = useState(false);
  const [updatesData, setUpdatesData] = useState([]);

  const fetchPantryData = async () => {
    try {
      const fetchedPantryData = await fetchPantry();
      setPantryData(fetchedPantryData.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUpdatesData = async () => {
    try {
      const fetchedUpdatesData = await getUpdats();
      setUpdatesData(fetchedUpdatesData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPantryData();
    fetchUpdatesData();
  }, []);

  if (!(pantryData && updatesData[0])) return <Spinner />;

  return (
    <div className="container">
      <div className="info">
        <div
          className="info-header"
          onClick={() => {
            toogleLine(displayStaticInfo, setDisplayStaticInfo);
          }}
        >
          מידע שימושי{' '}
          <i
            class={`fa-solid fa-angle-${displayStaticInfo ? 'down' : 'left'}`}
          ></i>
        </div>
        <div
          className={`panel panel-flex ${displayStaticInfo && 'panel-open'}`}
        >
          <StaticInfo />
        </div>
        <div
          className="info-header"
          onClick={() => {
            toogleLine(displayPantry, setDisplayPantry);
          }}
        >
          מזווה, מקרר ומקפיא{' '}
          <i class={`fa-solid fa-angle-${displayPantry ? 'down' : 'left'}`}></i>
        </div>
        <div className={`panel panel-flex ${displayPantry && 'panel-open'}`}>
          <Pantry data={pantryData} />
        </div>
        <div
          className="info-header"
          onClick={() => {
            toogleLine(displayUpdates, setDisplayUpdates);
          }}
        >
          עדכונים והודעות{' '}
          <i
            class={`fa-solid fa-angle-${displayUpdates ? 'down' : 'left'}`}
          ></i>
        </div>
        <div
          className={`panel panel-updates ${displayUpdates && 'panel-open'}`}
        >
          <Updates data={updatesData} setData={fetchUpdatesData} />
        </div>
      </div>
    </div>
  );
}

const toogleLine = (state, callback) => {
  callback(!state);
};
