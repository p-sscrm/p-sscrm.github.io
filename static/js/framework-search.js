(function () {
  var input = document.getElementById("framework-search");
  var tree = document.getElementById("framework-tree");
  var empty = document.getElementById("framework-search-empty");
  var expandBtn = document.getElementById("framework-expand-all");
  var collapseBtn = document.getElementById("framework-collapse-all");
  if (!tree) return;

  var allDetails = tree.querySelectorAll("details");
  var groups = tree.querySelectorAll(":scope > details.fw-group");
  var searching = false;

  function snapshot() {
    allDetails.forEach(function (d) { d.dataset.wasOpen = d.open ? "1" : "0"; });
  }
  function restore() {
    allDetails.forEach(function (d) { d.open = d.dataset.wasOpen === "1"; });
  }
  function showAll() {
    tree.querySelectorAll(".fw-group, .fw-practice, .fw-control").forEach(function (el) { el.hidden = false; });
  }

  // A code (like "G", "G.1", "G.1.2") matches by prefix, at any query length —
  // it's a precise, structured field. Free text (titles, body copy) only
  // matches for queries of 2+ characters, so a short code-like query (e.g.
  // "D.") can't accidentally match unrelated prose ("...identified.").
  function ownMatch(el, q) {
    var code = el.dataset.code || "";
    if (code.indexOf(q) === 0) return true;
    if (q.length < 2) return false;
    var title = el.dataset.title || "";
    return title.indexOf(q) !== -1;
  }
  function bodyMatch(el, q) {
    if (q.length < 2) return false;
    return (el.dataset.body || "").indexOf(q) !== -1;
  }

  if (expandBtn) {
    expandBtn.addEventListener("click", function () {
      allDetails.forEach(function (d) { d.open = true; });
    });
  }
  if (collapseBtn) {
    collapseBtn.addEventListener("click", function () {
      allDetails.forEach(function (d) { d.open = false; });
    });
  }

  if (!input) return;

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
    groups.forEach(function (group) {
      var groupOwnMatch = ownMatch(group, q);
      var groupHasMatch = groupOwnMatch;

      group.querySelectorAll(":scope > .fw-group-body > .fw-practice").forEach(function (practice) {
        var practiceOwnMatch = groupOwnMatch || ownMatch(practice, q);
        var practiceHasMatch = practiceOwnMatch;

        practice.querySelectorAll(":scope > .fw-practice-body > .fw-control").forEach(function (control) {
          var controlMatch = practiceOwnMatch || ownMatch(control, q) || bodyMatch(control, q);
          control.hidden = !controlMatch;
          control.open = false;
          if (controlMatch) practiceHasMatch = true;
        });

        practice.hidden = !practiceHasMatch;
        practice.open = practiceHasMatch;
        if (practiceHasMatch) groupHasMatch = true;
      });

      group.hidden = !groupHasMatch;
      group.open = groupHasMatch;
      if (groupHasMatch) anyMatch = true;
    });

    if (empty) empty.hidden = anyMatch;
  });
})();
