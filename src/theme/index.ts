export const theme = {
  font: {
    primary: "'Open Sans', sans-serif",

    sizes: {
      desktop: {
        h1: 52,
        h2: 48,
        h3: 36,
        h4: 30,
        h5: 24,
        h6: 18,
        paragraph: 18,
        small: 12,
      },
    },

    weight: {
      bold: 700,
      regular: 400,
      light: 300,
    },
  },

  shape: {
    radius: 5,
  },

  colors: {
    primary: {
      main: 'rgba(25,25,25, 1)',
      opacity: 'rgba(25,25,25, 0.8)',
      minOpacity: 'rgba(25,25,25, 0.3)',
    },

    secondary: {
      main: 'rgba(250,250,250, 1)',
    },

    light: {
      main: 'rgba(243, 243, 243, 1)',
    },

    white: {
      main: 'white',
    },

    blue: {
      main: 'rgba(73,159,244, 1)',
    },

    yellow: {
      main: 'rgba(242, 205, 92, 1)',
    },
  },

  transitions: {
    default: '300ms all ease-in-out',
  },

  padding: {
    small: '1em',
    default: '2em',
    medium: '4em',
    large: '6em',
    xLarge: '8em',
  },

  margin: {
    xxSmall: 2,
    xSmall: 5,
    small: 10,
    default: 20,
    medium: 40,
  },
}
