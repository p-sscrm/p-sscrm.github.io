(function () {
  function openAncestors(el) {
    var node = el;
    while (node) {
      if (node.tagName === "DETAILS") node.open = true;
      node = node.parentElement;
    }
  }

  function goTo(id, updateHash) {
    var target = document.getElementById(id);
    if (!target) return false;
    openAncestors(target);
    if (updateHash && ("#" + id) !== location.hash) {
      history.pushState(null, "", "#" + id);
    }
    requestAnimationFrame(function () {
      target.scrollIntoView({ block: "start" });
    });
    return true;
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest("a[href^='#']");
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    if (!id) return;
    if (goTo(id, true)) e.preventDefault();
  });

  window.addEventListener("hashchange", function () {
    var id = decodeURIComponent(location.hash.slice(1));
    if (id) goTo(id, false);
  });

  if (location.hash.length > 1) {
    goTo(decodeURIComponent(location.hash.slice(1)), false);
  }
})();
