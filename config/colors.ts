// Design tokens from PRD section 5
export const colors = {
  // Warm ivory/beige background
  background: {
    primary: '#FAF8F3',
    secondary: '#F5F2ED',
  },
  
  // Olive green primary
  green: {
    primary: '#3D5C25',
    deep: '#283417',
    light: '#4A6E2E',
  },
  
  // Text colors
  text: {
    primary: '#1A1A1A',
    secondary: '#4A4A4A',
    muted: '#6B6B6B',
  },
  
  // Utility colors
  white: '#FFFFFF',
  black: '#000000',
  
  // Semantic colors
  accent: {
    warm: '#D4A574',
  },
} as const;

export type Colors = typeof colors;
