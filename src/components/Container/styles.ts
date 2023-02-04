import { createUseStyles } from 'react-jss'
import { theme } from '../../theme'

export default createUseStyles(() => ({
  container: {
    width: '100%',
    padding: [theme.padding.small, theme.padding.xLarge],
  },

  whiteStyle: {
    backgroundColor: theme.colors.white.main,
  },
}))
