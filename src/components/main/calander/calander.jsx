// import { useGlobalContext } from '../../../utils/context';

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './calander.css';
import buildCalander from './build';
import dayStyle from './stylers';
import CalanderHeader from './calander_header';
import data from '../reservations/temp_data';
import Reservation from './reservation';

function Calander() {
  const [calander, setCalander] = useState([]);
  const [value, setValue] = useState(moment());

  useEffect(() => {
    setCalander(buildCalander(value, data));
  }, [value]);

  return (
    <div className="calander-container container">
      <div className="calander">
        <CalanderHeader value={value} setValue={setValue} />
        <div className="calander-body">
          {calander.map((week, index) => (
            <div className="week" key={`w${index}`}>
              {week.map((day, index) => (
                <div
                  key={`d${index}`}
                  className={`day ${dayStyle(day.date, value)}`}
                  onClick={() => {
                    setValue(day.date);
                  }}
                >
                  {day.date.format('D').toString()}
                  <Reservation reservation={day.reservation} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Calander;
