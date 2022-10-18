import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    gray: {
      700: '#1F1D2B',
      600: '#252836',
      200: '#CCCCCC',
    },
    white: '#FFFFFF',
  },
  fonts: {
    heading: 'Inter_700Bold',
    body: 'Inter_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
  },
  sizes: {
    14: 56,
  }
});