import { createUseStyles } from 'react-jss'
import { theme } from './index'

export const useGlobalStyles = createUseStyles({
  '@global': {
    body: {
      fontFamily: theme.font.primary,
      height: '100%',
      width: '100%',
      backgroundColor: theme.colors.secondary.main,
      color: theme.colors.primary.opacity,
      fontSize: theme.font.sizes.desktop.paragraph,
    },

    'h1,h2,h3,h4,h5,h6': {
      margin: [theme.margin.xSmall, 0],
      color: theme.colors.primary.main,
      fontWeight: theme.font.weight.bold,
    },

    h1: {
      fontSize: theme.font.sizes.desktop.h1,
    },
    h2: {
      fontSize: theme.font.sizes.desktop.h2,
    },
    h3: {
      fontSize: theme.font.sizes.desktop.h3,
    },
    h4: {
      fontSize: theme.font.sizes.desktop.h4,
    },
    h5: {
      fontSize: theme.font.sizes.desktop.h5,
    },
    h6: {
      fontSize: theme.font.sizes.desktop.h6,
    },

    a: {
      color: theme.colors.primary.main,
    },
  },
})
