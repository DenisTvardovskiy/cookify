import { createUseStyles } from 'react-jss';
import { theme } from '../../../theme';

export default createUseStyles(() => ({
  logo: {
    display: 'flex',
    alignItems: 'center',
    margin: [0, theme.margin.small],

    '& img': {
      width: 60,
      margin: [0, theme.margin.small],
    },
  },

  vertical: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
}));
