import { createUseStyles } from 'react-jss';
import { theme } from '../../theme';

export default createUseStyles(() => ({
  authWrap: {
    width: '50%',
    height: '100vh',
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  withForm: {
    padding: [0, theme.padding.small],
  },

  navWrap: {
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  formWrapper: {
    width: '100%',
    height: "calc('100% - 50px')",
    display: 'flex',
    justifyContent: 'center',

    '& form': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.margin.small,
    },
  },

  accountHint: {
    fontSize: theme.font.sizes.desktop.small,
  },
}));
