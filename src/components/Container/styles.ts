import { createUseStyles } from 'react-jss'
import { theme } from '../../theme'

export default createUseStyles(() => ({
  container: {
    width: '100%',
    border: '1px solid red',
    padding: theme.padding.default,
  },
}))
