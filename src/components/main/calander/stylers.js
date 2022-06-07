function isSelected(day, value) {
  return value.isSame(day, 'day');
}

function beforeThisMonth(day, value) {
  return day.isBefore(value.clone().startOf('month'), 'day');
}

function afterThisMonth(day, value) {
  return day.isAfter(value.clone().endOf('month'), 'day');
}

function isToday(day) {
  return day.isSame(new Date(), 'day');
}

export default function dayStyle(day, value, type) {
  const date = day.date;
  let clssses = '';
  if (beforeThisMonth(date, value)) clssses += ' not-in-current-month';
  if (afterThisMonth(date, value)) clssses += ' not-in-current-month';
  if (isSelected(date, value)) clssses += ' selected';
  if (isToday(date)) clssses += ' today';
  if (isToday(date) && type.dateIsFree) clssses += 'can-book';

  if (!type.dateIsFree && type.onedByUser) clssses += ' booked-by-user';
  if (!type.dateIsFree && !type.onedByUser) clssses += ' booked-by-other';
  if (!type.dateIsFree && type.userIsInvaited) clssses += ' user-invaited';

  if (!type.dateIsFree && type.open) clssses += ' open';
  if (!type.dateIsFree && !type.open) clssses += ' close';
  return clssses;
}
