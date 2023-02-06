import { createUseStyles } from 'react-jss'
import { theme } from '../../theme'

export default createUseStyles(() => ({
  authWrap: {
    width: '50%',
    height: '100vh',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  formWrapper: {
    width: "30%",
    marginTop: theme.margin.medium,

    '& form': {
      display: 'flex',
      flexDirection: 'column',
      gap: theme.margin.small,
    },
  },
}))
