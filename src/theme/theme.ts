import buttons from './buttons'

const theme = {
  breakpoints: ['36em', '48em', '62em', '75em'],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  colors: {
    seoulstore: '#f70061',
    navi: '#f6f6f6',
    white: '#ffffff',
    black: '#141414',
    gray: '#dddddd',
  },
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.25,
  },
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 0 24px rgba(0, 0, 0, .125)',
  },
  variants: {},
  text: {},
  buttons,
}

export default theme
