import React from 'react';

export default function CalanderHeader({ value, setValue }) {
  function currMonthName() {
    return value.format('MMMM');
  }

  function currYear() {
    return value.format('YYYY');
  }

  function prevMonth() {
    return value.clone().subtract(1, 'month');
  }
  function nextMonth() {
    return value.clone().add(1, 'month');
  }

  return (
    <div className="calander-header">
      <p
        className="calander-header-item previous"
        onClick={() => setValue(prevMonth())}
      >
        {'<<'}
      </p>
      <div className="calander-header-item current">
        {currMonthName()} {currYear()}
      </div>
      <p
        className="calander-header-item next"
        onClick={() => setValue(nextMonth())}
      >
        {'>>'}
      </p>
    </div>
  );
}
