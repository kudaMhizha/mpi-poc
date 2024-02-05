(function initializeTheme() {
  try {
    if (
      localStorage.theme === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  } catch (_) {
    // pass
  }
})();
