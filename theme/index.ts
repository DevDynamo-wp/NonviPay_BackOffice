/**
 * NONVIPAY BACKOFFICE — Theme exports
 * Point d'entrée unique pour tout ce qui concerne le thème.
 *
 * Usage :
 *   import { useTheme, ThemeToggle, palette, themeTokens } from '@/theme'
 */

export { palette, themeTokens, getToken, buildCSSVariables } from './tokens';
export type { Theme, ThemeTokenKey } from './tokens';

export { ThemeProvider, useTheme } from './ThemeContext';
export { ThemeToggle } from './ThemeToggle';
export { themeScript } from './themeScript';