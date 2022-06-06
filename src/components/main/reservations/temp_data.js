import moment from 'moment';

const data = [
  {
    id: '1',
    from: moment(),
    to: moment().add(3, 'day'),
    owner: '1',
    open: false,
    invited: [],
  },
  {
    id: '2',
    from: moment().add(12, 'day'),
    to: moment().add(13, 'day'),
    owner: '2',
    open: true,
    invited: ['3', '1'],
  },
  {
    id: '3',
    from: moment().add(25, 'day'),
    to: moment().add(29, 'day'),
    owner: '3',
    open: true,
    invited: ['2'],
  },
  {
    id: '4',
    from: moment().add(6, 'day'),
    to: moment().add(8, 'day'),
    owner: '2',
    open: false,
    invited: [],
  },
];

export default data;
