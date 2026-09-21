// Light / dark switch.
// With no saved choice the site follows the visitor's system setting.
// Clicking the button picks the opposite of what is showing now and remembers it.
(function () {
  var button = document.getElementById("theme-toggle");
  if (!button) return;

  var root = document.documentElement;
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  // "dark" or "light": what the visitor is looking at right now.
  function currentTheme() {
    var chosen = root.getAttribute("data-theme");
    if (chosen === "light" || chosen === "dark") return chosen;
    return systemDark.matches ? "dark" : "light";
  }

  // Show the sun while dark (click for light) and the moon while light (click for dark).
  function updateButton() {
    var theme = currentTheme();
    var nextTheme = theme === "dark" ? "light" : "dark";
    button.querySelector('[data-icon="sun"]').hidden = theme !== "dark";
    button.querySelector('[data-icon="moon"]').hidden = theme !== "light";
    button.setAttribute("aria-label", "Switch to " + nextTheme + " mode");
    button.title = "Switch to " + nextTheme + " mode";
  }

  button.addEventListener("click", function () {
    var nextTheme = currentTheme() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch (e) {
      // Storage can be blocked (e.g. private browsing). The switch still works for this visit.
    }
    updateButton();
  });

  // If the system setting changes and the visitor hasn't picked, keep the icon correct.
  if (systemDark.addEventListener) systemDark.addEventListener("change", updateButton);

  button.hidden = false;
  updateButton();
})();
