import { createUseStyles } from 'react-jss';
import { theme } from './index';

export const useGlobalElements = createUseStyles({
  primaryButton: {
    color: theme.colors.primary.main,
    transition: theme.transitions.default,
    border: `1px solid ${theme.colors.primary.minOpacity}`,
    borderRadius: theme.shape.radius,
    padding: theme.margin.small,
    fontWeight: theme.font.weight.bold,
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.margin.xSmall,
    cursor: 'pointer',

    '&:hover': {
      borderColor: theme.colors.primary.opacity,
    },
  },
});
