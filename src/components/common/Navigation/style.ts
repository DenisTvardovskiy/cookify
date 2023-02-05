import { createUseStyles } from 'react-jss';
import { theme } from '../../../theme';

export default createUseStyles(() => ({
  navigation: {
    width: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },

  navWrapper: {
    alignItems: 'center',
    display: 'flex',
    gap: theme.margin.small,
  },

  openMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.margin.xSmall,
    cursor: 'pointer',

    '& span': {
      width: 30,
      height: 3,
      display: 'block',
      backgroundColor: theme.colors.primary.main,
      borderRadius: 2,
    },
  },

  searchBar: {
    width: 300,
    height: 'auto',
    borderRadius: theme.shape.radius,
    padding: theme.margin.small,
    border: `1px solid ${theme.colors.primary.minOpacity}`,

    '& .MuiInputBase-input': {
      width: '100%',
      height: 'auto',
      padding: 0,
    },
  },
}));
