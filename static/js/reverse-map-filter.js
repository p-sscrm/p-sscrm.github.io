(function () {
  var input = document.getElementById("reverse-map-filter");
  var root = document.getElementById("reverse-map");
  var empty = document.getElementById("reverse-map-empty");
  var expandBtn = document.getElementById("reverse-map-expand-all");
  var collapseBtn = document.getElementById("reverse-map-collapse-all");
  if (!input || !root) return;

  var standards = root.querySelectorAll(":scope > details");

  if (expandBtn) {
    expandBtn.addEventListener("click", function () {
      standards.forEach(function (d) { d.open = true; });
    });
  }
  if (collapseBtn) {
    collapseBtn.addEventListener("click", function () {
      standards.forEach(function (d) { d.open = false; });
    });
  }

  // A P-SSCRM code (e.g. "G.1.2") matches by prefix at any query length —
  // it's a precise, structured field. Title and standard-reference text only
  // match for queries of 2+ characters, so a short code-like query (e.g.
  // "D.") can't accidentally match unrelated text.
  function itemMatch(item, q) {
    if (!q) return true;
    var code = item.dataset.code || "";
    if (code.indexOf(q) === 0) return true;
    if (q.length < 2) return false;
    return (item.dataset.title || "").indexOf(q) !== -1 || (item.dataset.ref || "").indexOf(q) !== -1;
  }

  input.addEventListener("input", function () {
    var q = input.value.trim().toLowerCase();
    var anyStandardMatch = false;

    standards.forEach(function (details) {
      var groups = details.querySelectorAll(".reverse-map-practice");
      var items = details.querySelectorAll(".reverse-map-item");
      var anyMatch = false;

      items.forEach(function (item) {
        var match = itemMatch(item, q);
        item.hidden = !match;
        if (match) anyMatch = true;
      });

      groups.forEach(function (group) {
        var next = group.nextElementSibling;
        var groupHasMatch = false;
        while (next && !next.classList.contains("reverse-map-practice")) {
          if (next.classList.contains("reverse-map-item") && !next.hidden) groupHasMatch = true;
          next = next.nextElementSibling;
        }
        group.hidden = !groupHasMatch;
      });

      details.hidden = q && !anyMatch;
      if (q) details.open = anyMatch;
      if (anyMatch) anyStandardMatch = true;
    });

    if (empty) empty.hidden = !q || anyStandardMatch;
  });
})();
