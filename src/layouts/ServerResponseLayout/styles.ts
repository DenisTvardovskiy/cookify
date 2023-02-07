import { createUseStyles } from 'react-jss';
import { theme } from '../../theme';

export default createUseStyles(() => ({
  serverResponseLayout: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },

  authorizedMessage: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.margin.small,
    flexWrap: 'wrap',
  },
}));
