import { createUseStyles } from 'react-jss';
import { theme } from './index';

export const useGlobalStyles = createUseStyles({
  '@global': {
    '*, *::before, *::after': {
      boxSizing: 'border-box',
      padding: '0',
      margin: '0',
    },
    htmL: {
      webkitFontSmoothing: 'antialiased',
      mozOsxFontSmoothing: 'grayscale',
      height: '100%',
      width: '100%',
    },
    'article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section': {
      display: 'block',
    },
    'ol, ul': {
      listStyle: 'none',
    },
    'blockquote, q': {
      quotes: 'none',
    },
    table: {
      borderCollapse: 'collapse',
      borderSpacing: '0',
    },
    img: {
      maxWidth: '100%',
      display: 'block',
    },
    'a:not([class])': {
      textDecorationSkipInk: 'auto',
      textDecoration: 'none',
    },
    'a, area, button, input, label, select, summary, textarea, [tabindex]': {
      textDecoration: 'none',
      msTouchAction: 'manipulation',
      touchAction: 'manipulation',
      webkitAppearance: 'none',
      mozAppearance: 'none',
      appearance: 'none',
      outline: 'none',
      border: 'none',
    },
    ":where(button, [type='button' i], [type='reset' i], [type='submit' i])": {
      webkitAppearance: 'button',
    },
    '@media (prefers-reduced-motion: no-preference)': {
      'html:focus-within': {
        scrollBehavior: 'smooth',
      },
    },
    '@media (prefers-reduced-motion: reduce)': {
      'html:focus-within': {
        scrollBehavior: 'auto',
      },
      '*, *::before, *::after': {
        animationDuration: '0.01ms !important',
        animationIterationCount: '1 !important',
        transitionDuration: '0.01ms !important',
        scrollBehavior: 'auto !important',
      },
    },
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

    button: {
      '&.MuiButton-outlined': {
        color: theme.colors.primary.main,
        transition: theme.transitions.default,
        border: `1px solid ${theme.colors.primary.minOpacity}`,
        borderRadius: theme.shape.radius,
        padding: theme.margin.xSmall,
        fontWeight: theme.font.weight.bold,
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer',
        textTransform: 'none',

        '&:hover': {
          borderColor: theme.colors.primary.opacity,
        },
      },
    },
  },
});
