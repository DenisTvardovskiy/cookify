import { createUseStyles } from 'react-jss'
import { theme } from '../../theme'

export default createUseStyles(() => ({
  navigation: {
    width: '100%',
    border: '1px solid red',
    alignItems: 'center',
    display: 'flex',
  },

  openMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.margin.small,
    cursor: 'pointer',
    marginRight: theme.margin.small,

    '& span': {
      width: 30,
      height: 2,
      display: 'block',
      backgroundColor: theme.colors.primary.main,
      borderRadius: 1,
    },
  },

  logo: {
    display: 'flex',
    alignItems: 'center',

    '& img': {
      width: 60,
    },
  },

  searchBar: {
    border: `1px solid ${theme.colors.secondary.main}`,
    height: 45,
    borderRadius: theme.shape.radius,
  },
}))
