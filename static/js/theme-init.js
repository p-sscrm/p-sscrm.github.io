// Runs before the page draws: if the visitor picked light or dark before, apply it now.
try {
  var savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }
} catch (e) {}
