import moment from 'moment';

const data = [
  {
    id: 1,
    from: moment(),
    to: moment().add(2, 'day'),
    owner: 1,
    open: false,
    invited: [],
  },
  {
    id: 2,
    from: moment().add(12, 'day'),
    to: moment().add(13, 'day'),
    owner: 1,
    open: true,
    invited: [3, 1],
  },
  {
    id: 3,
    from: moment().add(52, 'day'),
    to: moment().add(56, 'day'),
    owner: 2,
    open: true,
    invited: [1],
  },
  {
    id: 4,
    from: moment().add(28, 'day'),
    to: moment().add(32, 'day'),
    owner: 3,
    open: true,
    invited: [],
  },
];

export default data;
