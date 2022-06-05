import React from 'react';

export default function CalanderHeader({ value, setValue }) {
  function currMonthName() {
    return value.format('MMMM');
  }

  function currYear() {
    return value.format();
  }

  function prevMonth() {
    return value.clone().subtract(1, 'month');
  }
  function nextMonth() {
    return value.clone().add(1, 'month');
  }

  return (
    <div className="calander-header">
      <div
        className="calander-header-item previous"
        onClick={() => setValue(prevMonth())}
      >
        {String.fromCharCode(171)}
      </div>
      <div className="calander-header-item current">
        {currMonthName()} {currYear()}
      </div>
      <div
        className="calander-header-item next"
        onClick={() => setValue(nextMonth())}
      >
        {String.fromCharCode(187)}
      </div>
    </div>
  );
}
