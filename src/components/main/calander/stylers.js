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

export default function dayStyle(day, value) {
  if (beforeThisMonth(day, value)) return 'before';
  if (afterThisMonth(day, value)) return 'before';
  if (isSelected(day, value)) return 'selected';
  if (isToday(day)) return 'today';
  return '';
}
