import { createUseStyles } from 'react-jss'
import { theme } from '../../theme'

export default createUseStyles(() => ({
  navigation: {
    width: '100%',
    border: '1px solid red',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },

  openMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.margin.xSmall,
    cursor: 'pointer',

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
    margin: [0, theme.margin.small],

    '& img': {
      width: 60,
      margin: [0, theme.margin.small],
    },
  },

  searchBar: {
    border: `1px solid ${theme.colors.primary.minOpacity}`,
    height: 45,
    borderRadius: theme.shape.radius,
    padding: [0, 15],
  },
}))
