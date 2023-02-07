import { createUseStyles } from 'react-jss';
import { theme } from '../../../theme';

export default createUseStyles(() => ({
  emptyListMessage: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: `calc(80vh - ${theme.navigationHeight}px)`,
  },

  message: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '& img': {
      width: 200,
    },
  },
}));
