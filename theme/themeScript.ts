/**
 * Script anti-FOUC (Flash Of Unstyled Content)
 * Ce script doit être injecté INLINE dans le <head> avant tout rendu.
 * Il lit le thème depuis localStorage et l'applique immédiatement,
 * avant même que React ne soit chargé.
 *
 * Usage dans app/layout.tsx :
 *   <script dangerouslySetInnerHTML={{ __html: themeScript }} />
 */
export const themeScript = `
(function() {
  try {
    var saved = localStorage.getItem('nonvipay-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch(e) {
    // Fallback silencieux si localStorage est bloqué
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.classList.add('dark');
  }
})();
`.trim();