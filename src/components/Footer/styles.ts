import { createUseStyles } from 'react-jss'

import { theme } from '../../theme'

export default createUseStyles(() => ({
  footer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: [theme.padding.small, 0],
  },
}))
