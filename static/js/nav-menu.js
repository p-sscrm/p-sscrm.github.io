// Grouped nav menus (<details class="nav-group">).
// They open and close on their own; this closes one when you open another,
// click elsewhere, press Escape, or follow a link inside it.
(function () {
  var groups = document.querySelectorAll(".nav-group");
  if (!groups.length) return;

  function closeAll(except) {
    groups.forEach(function (g) {
      if (g !== except) g.open = false;
    });
  }

  groups.forEach(function (g) {
    g.addEventListener("toggle", function () {
      if (g.open) closeAll(g);
    });
  });

  document.addEventListener("click", function (e) {
    // Following a link closes its menu, so Back doesn't show it still open.
    if (e.target.closest(".nav-menu a")) return closeAll(null);
    closeAll(e.target.closest(".nav-group"));
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    groups.forEach(function (g) {
      if (!g.open) return;
      g.open = false;
      g.querySelector("summary").focus();
    });
  });
})();
