import { createUseStyles } from 'react-jss';
import { theme } from '../../theme';

export default createUseStyles(() => ({
  ingredientWrap: {
    display: 'flex',
    textAlign: 'center',
    gap: theme.padding.small,
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: `calc(100vh - ${theme.navigationHeight}px)`,
    padding: [theme.padding.large, theme.padding.xxLarge],
  },

  imageWrap: {
    width: '100%',
    height: 500,
    position: 'relative',
  },

  like: {
    color: theme.colors.red.main,
  },

  ingredientsList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.margin.default,
  },
}));
