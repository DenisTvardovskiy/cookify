import { createUseStyles } from 'react-jss'

export default createUseStyles(() => ({
  serverResponseLayout: {
    width: '100%',
    height: '100vh',
    border: '1px solid pink',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
