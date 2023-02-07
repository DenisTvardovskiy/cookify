import { createUseStyles } from 'react-jss';
import { theme } from '../../../theme';

export default createUseStyles(() => ({
  gridContainer: {
    width: '100%',
    display: 'inline-grid',
    gridTemplateColumns: 'repeat(4, 4fr)',
    gap: theme.padding.default,
  },
}));
