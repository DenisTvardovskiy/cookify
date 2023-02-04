import { createUseStyles } from 'react-jss'
import { theme } from '../../theme'

export default createUseStyles(() => ({
  imageContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',

    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      transition: theme.transitions.default,
    },
  },

  hoverAnimation: {
    '&:hover': {
      '& img': {
        transform: 'scale(1.1)',
      },
    },
  },
}))
