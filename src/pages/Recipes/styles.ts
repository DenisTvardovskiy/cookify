import { createUseStyles } from 'react-jss';

export default createUseStyles(() => ({
  filterWrap: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  searchWrap: {
    display: 'flex',
    alignItems: 'center',
  },

  filterSelect: {
    width: 100,
  },
}));
