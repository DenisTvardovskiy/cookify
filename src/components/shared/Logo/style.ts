import { createUseStyles } from 'react-jss';
import { theme } from '../../../theme';

export default createUseStyles(() => ({
  logo: {
    display: 'flex',
    alignItems: 'center',

    '& img': {
      width: 60,
      marginRight: theme.margin.small,
    },
  },

  vertical: {
    flexDirection: 'column',
    justifyContent: 'center',

    '& img': {
      margin: [theme.margin.small, 0],
    },
  },
}));
