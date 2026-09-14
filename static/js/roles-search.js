(function () {
  var input = document.getElementById("roles-search");
  var grid = document.getElementById("roles-grid");
  var empty = document.getElementById("roles-search-empty");
  var expandBtn = document.getElementById("roles-expand-all");
  var collapseBtn = document.getElementById("roles-collapse-all");
  if (!grid) return;

  var cards = grid.querySelectorAll(".role-card");
  var searching = false;

  function snapshot() {
    cards.forEach(function (c) { c.dataset.wasOpen = c.open ? "1" : "0"; });
  }
  function restore() {
    cards.forEach(function (c) { c.open = c.dataset.wasOpen === "1"; });
  }
  function showAll() {
    grid.querySelectorAll(".role-card, .role-card-controls li").forEach(function (el) { el.hidden = false; });
  }

  if (expandBtn) {
    expandBtn.addEventListener("click", function () {
      cards.forEach(function (c) { c.open = true; });
    });
  }
  if (collapseBtn) {
    collapseBtn.addEventListener("click", function () {
      cards.forEach(function (c) { c.open = false; });
    });
  }

  if (!input) return;

  // A control code (e.g. "G.1.2") matches by prefix at any query length —
  // it's a precise, structured field. Free text (role name/description,
  // control title) only matches for queries of 2+ characters, so a short
  // code-like query (e.g. "D.") can't accidentally match unrelated prose.
  function textMatch(text, q) {
    return q.length >= 2 && text.indexOf(q) !== -1;
  }

  input.addEventListener("input", function () {
    var q = input.value.trim().toLowerCase();

    if (q && !searching) { snapshot(); searching = true; }
    if (!q && searching) {
      searching = false;
      showAll();
      restore();
      if (empty) empty.hidden = true;
      return;
    }
    if (!q) return;

    var anyMatch = false;
    cards.forEach(function (card) {
      var name = card.querySelector(".role-card-name").textContent.toLowerCase();
      var desc = card.querySelector(".role-card-desc").textContent.toLowerCase();
      var roleMatch = textMatch(name, q) || textMatch(desc, q);
      var hasMatch = roleMatch;

      card.querySelectorAll(".role-card-controls li").forEach(function (li) {
        var code = li.dataset.code || "";
        var title = li.dataset.title || "";
        var controlMatch = roleMatch || code.indexOf(q) === 0 || textMatch(title, q);
        li.hidden = !controlMatch;
        if (controlMatch) hasMatch = true;
      });

      card.hidden = !hasMatch;
      card.open = hasMatch;
      if (hasMatch) anyMatch = true;
    });

    if (empty) empty.hidden = anyMatch;
  });
})();
