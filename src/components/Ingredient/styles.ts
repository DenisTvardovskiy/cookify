import { createUseStyles } from 'react-jss';
import { theme } from '../../theme';

export default createUseStyles(() => ({
  item: {
    borderBottom: `1px solid ${theme.colors.primary.minOpacity}`,
    paddingBottom: theme.margin.medium,
    cursor: 'pointer',
  },

  textContainer: {
    width: '100%',
  },

  imageWrap: {
    width: '100%',
    height: 250,

    '& *': {
      borderRadius: [theme.shape.radius, theme.shape.radius, 0, 0],
    },
  },

  categoryList: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.margin.xSmall,
    gap: theme.margin.xSmall,
  },

  categoryListItem: {
    borderRadius: theme.shape.radius,
    padding: [theme.margin.xxSmall, theme.margin.xSmall],
    backgroundColor: theme.colors.light.main,
    fontSize: theme.font.sizes.desktop.small,
  },

  infoBlock: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.margin.xSmall,
    padding: [theme.margin.xxSmall, theme.margin.small],
    margin: [theme.margin.xSmall, 0],
    backgroundColor: theme.colors.light.main,
    borderRadius: theme.shape.radius,

    '&:nth-of-type(2)': {
      marginRight: theme.margin.xSmall,
    },
  },

  timeIcon: {
    color: theme.colors.primary.main,
  },

  rateIcon: {
    color: theme.colors.yellow.main,
  },
}));
