// import moment from 'moment';

export default function buildCalander(value, reservations) {
  const startDay = value.clone().startOf('month').startOf('week');
  const endDay = value.clone().endOf('month').endOf('week');

  const day = startDay.clone().subtract(1, 'day');
  const calander = [];

  const thisMonthReservations = reservations.filter(
    (resrv) => resrv.from.isBefore(endDay) && resrv.to.isAfter(startDay)
  );

  // extracting only the rellevand reservations for this month
  thisMonthReservations.forEach((resrv) => {
    const datesArr = [resrv.from];
    const endDate = resrv.to.clone().add(1, 'day');
    while (datesArr[0].isBefore(endDate)) {
      const nextDay = datesArr[0].clone().add(1, 'day');
      datesArr.unshift(nextDay);
    }
    resrv.datesArr = datesArr;
  });

  // transforming the reservatios from a "from-to" format into day-bay-day array formt
  const dayByDayReservations = [].concat(
    ...thisMonthReservations.map((resrv) =>
      resrv.datesArr.map((date) => {
        return {
          date: date,
          owner: resrv.owner,
          open: resrv.open,
          invited: resrv.invited,
        };
      })
    )
  );

  // generating all month's relevant days
  while (day.isBefore(endDay, 'day')) {
    calander.push(
      Array(7)
        .fill(0)
        .map(() => {
          const dayToRerurn = {
            date: day.add(1, 'day').clone(),
            reservation: undefined,
          };

          return dayToRerurn;
        })
    );
  }

  // adding the reservations information to each relevant day
  calander.forEach((week) => {
    week.forEach((day) => {
      const todaysReservation = dayByDayReservations.find((resrv) =>
        resrv.date.isSame(day.date, 'day')
      );

      day.reservation = todaysReservation;
    });
  });

  return calander;
}
