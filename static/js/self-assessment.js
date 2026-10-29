// Self-assessment: private scores and notes per control, kept in this browser's
// localStorage. Nothing is sent anywhere. A practice's score is the average of
// its scored controls; unscored controls are left out of the average.
(function () {
  var root = document.getElementById("sa");
  if (!root) return;

  var STORAGE_KEY = "p-sscrm:self-assessment";
  var VERSION = 1;
  var SCALE = [0, 0.25, 0.5, 0.75, 1];
  var MAX_NOTE = 5000;
  var MAX_IMPORT = 1024 * 1024;

  var storageOk = true;

  var tiles = [].slice.call(root.querySelectorAll(".sa-tile"));
  var panels = {};
  [].forEach.call(root.querySelectorAll(".sa-panel[data-practice]"), function (p) {
    panels[p.getAttribute("data-practice")] = p;
  });
  var radarPanel = document.getElementById("sa-radar");
  var radarBtn = document.getElementById("sa-radar-btn");
  var radarSvg = document.getElementById("sa-radar-svg");
  var radarTip = document.getElementById("sa-radar-tip");
  var openPractice = null;

  function hasPanel(slug) {
    return Object.prototype.hasOwnProperty.call(panels, slug);
  }

  // { controls: { slug: { s: number|null, n: string } }, practices: { slug: { n: string } } }
  var state = load();

  // ---- storage ----------------------------------------------------------

  function emptyState() {
    return { controls: {}, practices: {} };
  }

  function load() {
    var raw;
    try {
      raw = localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      storageOk = false;
      return emptyState();
    }
    if (!raw) return emptyState();
    try {
      return sanitize(JSON.parse(raw)) || emptyState();
    } catch (e) {
      // Unreadable data: start fresh. Storage itself is fine.
      return emptyState();
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: VERSION, controls: state.controls, practices: state.practices }));
    } catch (e) {
      storageOk = false;
    }
    document.getElementById("sa-storage-warning").hidden = storageOk;
  }

  // Keeps only known controls/practices, valid scores and string notes.
  function sanitize(data) {
    if (!data || typeof data !== "object" || typeof data.controls !== "object" || !data.controls) return null;
    var out = emptyState();
    Object.keys(data.controls).forEach(function (slug) {
      if (!root.querySelector('[data-control="' + cssEscape(slug) + '"]')) return;
      var c = data.controls[slug] || {};
      var s = typeof c.s === "number" && SCALE.indexOf(c.s) !== -1 ? c.s : null;
      var n = typeof c.n === "string" ? c.n.slice(0, MAX_NOTE) : "";
      if (s !== null || n) out.controls[slug] = { s: s, n: n };
    });
    var practices = data.practices && typeof data.practices === "object" ? data.practices : {};
    Object.keys(practices).forEach(function (slug) {
      if (!hasPanel(slug)) return;
      var n = practices[slug] && typeof practices[slug].n === "string" ? practices[slug].n.slice(0, MAX_NOTE) : "";
      if (n.trim()) out.practices[slug] = { n: n };
    });
    return out;
  }

  function cssEscape(s) {
    return window.CSS && CSS.escape ? CSS.escape(s) : String(s).replace(/[^\w-]/g, "\\$&");
  }

  // ---- numbers ----------------------------------------------------------

  // Averages always show two decimals (0.50, 0.46, 1.00) so they line up and read as one kind of number.
  function fmt(v) {
    return v.toFixed(2);
  }

  // { avg: number|null, scored: n, total: n, flags: [bool] } for one practice;
  // flags says which controls (in page order) are scored.
  function practiceStats(slug) {
    var items = panels[slug].querySelectorAll("[data-control]");
    var sum = 0;
    var scored = 0;
    var flags = [].map.call(items, function (li) {
      var c = state.controls[li.getAttribute("data-control")];
      var on = !!c && c.s !== null;
      if (on) {
        sum += c.s;
        scored += 1;
      }
      return on;
    });
    return { avg: scored ? sum / scored : null, scored: scored, total: items.length, flags: flags };
  }

  // ---- rendering --------------------------------------------------------

  function renderControl(li) {
    var c = state.controls[li.getAttribute("data-control")] || { s: null, n: "" };
    [].forEach.call(li.querySelectorAll('input[type="radio"]'), function (r) {
      r.checked = c.s !== null && parseFloat(r.value) === c.s;
    });
    li.setAttribute("data-scored", c.s !== null ? "true" : "false");
    var noteBtn = li.querySelector('[data-toggle-note="control"]');
    noteBtn.classList.toggle("has-note", !!c.n);
    var ta = li.querySelector("textarea");
    if (ta.value !== c.n) ta.value = c.n;
  }

  function renderTile(tile) {
    var slug = tile.getAttribute("data-practice");
    var st = practiceStats(slug);
    tile.querySelector("[data-score]").textContent = st.avg === null ? "–" : fmt(st.avg);
    tile.classList.toggle("is-scored", st.avg !== null);
    [].forEach.call(tile.querySelectorAll(".sa-pips i"), function (pip, i) {
      pip.classList.toggle("on", !!st.flags[i]);
    });
    tile.setAttribute("aria-label", tile.getAttribute("data-title") + ": " +
      (st.avg === null ? "not scored" : "average " + fmt(st.avg)) + ", " + st.scored + " of " + st.total + " controls scored");
  }

  function renderPanelSummary(slug) {
    var panel = panels[slug];
    var st = practiceStats(slug);
    panel.querySelector("[data-avg]").textContent = st.avg === null ? "not scored" : "avg " + fmt(st.avg) + " · " + st.scored + " of " + st.total + " scored";
    var pn = state.practices[slug] || { n: "" };
    panel.querySelector('[data-toggle-note="practice"]').classList.toggle("has-note", !!pn.n);
    var ta = panel.querySelector('[data-note-for="practice"]');
    if (ta.value !== pn.n) ta.value = pn.n;
  }

  function renderPanel(slug) {
    renderPanelSummary(slug);
    [].forEach.call(panels[slug].querySelectorAll("[data-control]"), renderControl);
  }

  function renderProgress() {
    var total = root.querySelectorAll("[data-control]").length;
    var scored = 0;
    Object.keys(state.controls).forEach(function (k) {
      if (state.controls[k].s !== null) scored += 1;
    });
    var practicesScored = tiles.filter(function (t) { return t.classList.contains("is-scored"); }).length;
    document.getElementById("sa-progress").innerHTML = "<strong>" + scored + " of " + total + "</strong> controls scored" +
      " &middot; " + practicesScored + " of " + tiles.length + " practices";
  }

  function renderAll() {
    Object.keys(panels).forEach(renderPanel);
    tiles.forEach(renderTile);
    renderProgress();
    if (!radarPanel.hidden) renderRadar();
  }

  // Cheaper update after one control changes.
  function renderPractice(slug, li) {
    renderPanelSummary(slug);
    renderControl(li);
    renderTile(root.querySelector('.sa-tile[data-practice="' + cssEscape(slug) + '"]'));
    renderProgress();
    if (!radarPanel.hidden) renderRadar();
  }

  // ---- radar ------------------------------------------------------------

  var SVG_NS = "http://www.w3.org/2000/svg";
  function svgEl(name, attrs) {
    var el = document.createElementNS(SVG_NS, name);
    Object.keys(attrs || {}).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    return el;
  }

  function renderRadar() {
    var svg = document.getElementById("sa-radar-svg");
    var list = document.getElementById("sa-radar-list");
    var R = 100;
    var n = tiles.length;
    svg.textContent = "";
    list.textContent = "";
    hideTip();

    function point(i, v, r) {
      var a = (-Math.PI / 2) + (2 * Math.PI * i) / n;
      return [Math.cos(a) * R * v * (r || 1), Math.sin(a) * R * v * (r || 1)];
    }

    [0.25, 0.5, 0.75, 1].forEach(function (ring) {
      var pts = tiles.map(function (_, i) { return point(i, ring).join(","); }).join(" ");
      svg.appendChild(svgEl("polygon", { points: pts, "class": "sa-radar-grid" }));
    });
    tiles.forEach(function (_, i) {
      var p = point(i, 1);
      svg.appendChild(svgEl("line", { x1: 0, y1: 0, x2: p[0], y2: p[1], "class": "sa-radar-grid" }));
    });

    var values = tiles.map(function (t) {
      var st = practiceStats(t.getAttribute("data-practice"));
      return { tile: t, avg: st.avg, scored: st.scored, total: st.total };
    });
    var area = values.map(function (v, i) { return point(i, v.avg === null ? 0 : v.avg).join(","); }).join(" ");
    svg.appendChild(svgEl("polygon", { points: area, "class": "sa-radar-area" }));

    values.forEach(function (v, i) {
      var group = v.tile.getAttribute("data-group");
      var code = v.tile.getAttribute("data-code");
      var partial = v.avg !== null && v.scored < v.total;
      var lp = point(i, 1, 1.13);

      // One group per practice so the tooltip works over its label, axis end and dot.
      var g = svgEl("g", { "data-i": i });
      var a = point(i, 0.9);
      var b = point(i, 1.2);
      g.appendChild(svgEl("line", { x1: a[0], y1: a[1], x2: b[0], y2: b[1], "class": "sa-radar-hit" }));
      var label = svgEl("text", {
        x: lp[0], y: lp[1], "class": "sa-radar-label sa-radar-label-" + group,
        "text-anchor": Math.abs(lp[0]) < 6 ? "middle" : lp[0] > 0 ? "start" : "end",
        "dominant-baseline": "middle"
      });
      label.textContent = code;
      g.appendChild(label);
      if (v.avg !== null) {
        var dp = point(i, v.avg);
        // Dots near the centre crowd each other, so only the rest get their own hit area.
        if (v.avg >= 0.25) g.appendChild(svgEl("circle", { cx: dp[0], cy: dp[1], r: 5, "class": "sa-radar-hit" }));
        g.appendChild(svgEl("circle", { cx: dp[0], cy: dp[1], r: 3, "class": "sa-radar-dot sa-radar-dot-" + group + (partial ? " is-partial" : "") }));
      }
      svg.appendChild(g);

      var li = document.createElement("li");
      li.className = "fw-group-" + group;
      var badge = document.createElement("span");
      badge.className = "code-badge";
      badge.textContent = code;
      var name = document.createElement("span");
      name.className = "sa-radar-name";
      name.textContent = v.tile.getAttribute("data-title");
      if (partial) {
        var part = document.createElement("small");
        part.textContent = v.scored + " of " + v.total + " controls scored";
        name.appendChild(part);
      }
      var score = document.createElement("span");
      score.className = "sa-radar-val" + (v.avg === null ? " is-empty" : "");
      score.textContent = v.avg === null ? "not scored" : fmt(v.avg);
      li.appendChild(badge);
      li.appendChild(name);
      if (v.avg !== null) {
        var bar = document.createElement("span");
        bar.className = "sa-radar-bar";
        bar.setAttribute("aria-hidden", "true");
        var fill = document.createElement("i");
        fill.style.width = Math.round(v.avg * 100) + "%";
        bar.appendChild(fill);
        li.appendChild(bar);
      }
      li.appendChild(score);
      list.appendChild(li);
    });
  }

  // Small tooltip over a practice's label, axis end or dot.
  function hideTip() {
    if (radarTip) radarTip.hidden = true;
  }

  function showTip(g) {
    var i = g.getAttribute("data-i");
    if (!radarTip.hidden && radarTip.getAttribute("data-i") === i) return;
    radarTip.setAttribute("data-i", i);
    var tile = tiles[+i];
    var st = practiceStats(tile.getAttribute("data-practice"));
    radarTip.textContent = tile.getAttribute("data-code") + " " + tile.getAttribute("data-title") + " \u00b7 " +
      (st.avg === null ? "not scored" : fmt(st.avg)) + " \u00b7 " + st.scored + "/" + st.total + " scored";
    radarTip.hidden = false;

    // Above the practice's axis end, kept inside the chart box.
    var box = radarSvg.getBoundingClientRect();
    var vb = radarSvg.viewBox.baseVal;
    var scale = box.width / vb.width;
    var ang = (-Math.PI / 2) + (2 * Math.PI * +i) / tiles.length;
    var half = radarTip.offsetWidth / 2;
    radarTip.style.left = Math.max(half, Math.min(box.width - half, (Math.cos(ang) * 100 - vb.x) * scale)) + "px";
    radarTip.style.top = Math.max(radarTip.offsetHeight + 8, (Math.sin(ang) * 100 - vb.y) * scale) + "px";
  }

  radarSvg.addEventListener("pointerover", function (e) {
    var g = e.target.closest("[data-i]");
    if (g) showTip(g);
    else hideTip();
  });
  radarSvg.addEventListener("pointerleave", function (e) {
    if (e.pointerType !== "touch") hideTip();
  });
  // Touch has no hover: a tap anywhere else closes it.
  document.addEventListener("pointerdown", function (e) {
    if (!e.target.closest("[data-i]")) hideTip();
  });

  // ---- panels -----------------------------------------------------------

  function showPractice(slug) {
    openPractice = slug;
    Object.keys(panels).forEach(function (k) { panels[k].hidden = k !== slug; });
    tiles.forEach(function (t) {
      t.setAttribute("aria-pressed", t.getAttribute("data-practice") === slug ? "true" : "false");
    });
    if (slug) {
      var panel = panels[slug];
      var smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      panel.scrollIntoView({ block: "nearest", behavior: smooth ? "smooth" : "auto" });
      try { history.replaceState(null, "", "#" + slug); } catch (e) {}
    } else {
      try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    }
  }

  function setRadar(open) {
    radarPanel.hidden = !open;
    radarBtn.setAttribute("aria-expanded", open ? "true" : "false");
    radarBtn.textContent = open ? "Hide radar chart" : "View radar chart";
    if (open) {
      renderRadar();
      var smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      radarPanel.scrollIntoView({ block: "nearest", behavior: smooth ? "smooth" : "auto" });
    }
  }

  // ---- events -----------------------------------------------------------

  tiles.forEach(function (tile) {
    tile.addEventListener("click", function () {
      var slug = tile.getAttribute("data-practice");
      showPractice(openPractice === slug ? null : slug);
    });
  });

  radarBtn.addEventListener("click", function () {
    setRadar(radarPanel.hidden);
  });

  // Clicking the score that is already chosen clears it.
  function onScore(input) {
    var li = input.closest("[data-control]");
    var slug = li.getAttribute("data-control");
    var value = parseFloat(input.value);
    var current = state.controls[slug] || { s: null, n: "" };
    var next = current.s === value ? null : value;
    setControl(slug, { s: next, n: current.n });
    save();
    renderPractice(li.closest("[data-practice]").getAttribute("data-practice"), li);
  }

  root.addEventListener("click", function (e) {
    var t = e.target;

    // With "Hide scored" on, a row you just scored stays put until you
    // move on to another row, so you can still correct it.
    var row = t.closest(".sa-control");
    var rowPanel = t.closest(".sa-panel");
    if (rowPanel) {
      [].forEach.call(rowPanel.querySelectorAll(".sa-control.is-active"), function (li) {
        if (li !== row) li.classList.remove("is-active");
      });
      if (row) row.classList.add("is-active");
    }

    var scoreInput = t.closest('.sa-scale input[type="radio"]');
    if (scoreInput) {
      onScore(scoreInput);
      return;
    }

    if (t.closest("[data-close]")) {
      var section = t.closest(".sa-panel");
      if (section === radarPanel) setRadar(false);
      else showPractice(null);
      return;
    }

    var noteBtn = t.closest("[data-toggle-note]");
    if (noteBtn) {
      var scope = noteBtn.getAttribute("data-toggle-note") === "practice"
        ? noteBtn.closest(".sa-panel").querySelector("[data-practice-note]")
        : noteBtn.closest(".sa-control").querySelector("[data-control-note]");
      scope.hidden = !scope.hidden;
      noteBtn.setAttribute("aria-expanded", scope.hidden ? "false" : "true");
      if (!scope.hidden) scope.querySelector("textarea").focus();
      return;
    }

    var moreBtn = t.closest("[data-toggle-more]");
    if (moreBtn) {
      var more = moreBtn.closest(".sa-control").querySelector("[data-more]");
      more.hidden = !more.hidden;
      moreBtn.setAttribute("aria-expanded", more.hidden ? "false" : "true");
      return;
    }

    var hideBtn = t.closest("[data-hide-scored]");
    if (hideBtn) {
      var panel = hideBtn.closest(".sa-panel");
      var on = hideBtn.getAttribute("aria-pressed") !== "true";
      hideBtn.setAttribute("aria-pressed", on ? "true" : "false");
      panel.classList.toggle("hide-scored", on);
      [].forEach.call(panel.querySelectorAll(".sa-control.is-active"), function (li) {
        li.classList.remove("is-active");
      });
    }
  });

  var noteTimer = null;
  root.addEventListener("input", function (e) {
    var ta = e.target;
    if (ta.tagName !== "TEXTAREA") return;
    var panel = ta.closest("[data-practice]");
    var slug = panel.getAttribute("data-practice");
    if (ta.getAttribute("data-note-for") === "practice") {
      var pn = ta.value.trim() ? { n: ta.value } : null;
      if (pn) state.practices[slug] = pn;
      else delete state.practices[slug];
    } else {
      var cslug = ta.closest("[data-control]").getAttribute("data-control");
      var cur = state.controls[cslug] || { s: null, n: "" };
      setControl(cslug, { s: cur.s, n: ta.value });
    }
    // Update just the note indicator now; the rest is unaffected by typing.
    var btn = ta.getAttribute("data-note-for") === "practice"
      ? panel.querySelector('[data-toggle-note="practice"]')
      : ta.closest(".sa-control").querySelector('[data-toggle-note="control"]');
    btn.classList.toggle("has-note", !!ta.value.trim());
    clearTimeout(noteTimer);
    noteTimer = setTimeout(function () {
      noteTimer = null;
      save();
    }, 300);
  });

  // Don't lose a note typed in the last moments before leaving the page.
  // pagehide and visibilitychange are the reliable signals on mobile browsers.
  function flushPending() {
    if (!noteTimer) return;
    clearTimeout(noteTimer);
    noteTimer = null;
    save();
  }
  window.addEventListener("pagehide", flushPending);
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") flushPending();
  });

  // Updates memory only; callers decide when to write to storage.
  function setControl(slug, c) {
    if (c.s === null && !c.n.trim()) delete state.controls[slug];
    else state.controls[slug] = { s: c.s, n: c.n };
  }

  // Another tab changed the data.
  window.addEventListener("storage", function (e) {
    if (e.key !== STORAGE_KEY) return;
    // A note of ours is waiting to be saved; it wins, so don't replace it.
    if (noteTimer) return;
    state = load();
    renderAll();
  });

  // ---- your data --------------------------------------------------------

  var dataMenu = document.getElementById("sa-data");
  document.addEventListener("click", function (e) {
    if (!e.target.closest("#sa-data")) dataMenu.open = false;
  });

  // The export is laid out by practice with codes and titles, so it reads
  // like a report. Only practices and controls you scored or wrote about are
  // listed; anything left out is simply not scored.
  function buildExport() {
    var practices = [];
    var scoredTotal = 0;
    tiles.forEach(function (tile) {
      var slug = tile.getAttribute("data-practice");
      var controls = [];
      [].forEach.call(panels[slug].querySelectorAll("[data-control]"), function (li) {
        var c = state.controls[li.getAttribute("data-control")];
        if (!c) return;
        var entry = { code: li.getAttribute("data-code"), title: li.querySelector(".sa-control-title").textContent, score: c.s };
        if (c.n) entry.note = c.n;
        if (c.s !== null) scoredTotal += 1;
        controls.push(entry);
      });
      var pn = state.practices[slug];
      if (!controls.length && !pn) return;
      var st = practiceStats(slug);
      var entry = {
        code: tile.getAttribute("data-code"),
        title: tile.getAttribute("data-title"),
        average: st.avg === null ? null : Math.round(st.avg * 100) / 100,
        controlsScored: st.scored + " of " + st.total
      };
      if (pn) entry.note = pn.n;
      entry.controls = controls;
      practices.push(entry);
    });
    return {
      about: "P-SSCRM self-assessment. Scores run from 0 to 1. Average = mean of the scored controls in a practice.",
      version: VERSION,
      exportedAt: new Date().toISOString(),
      controlsScored: scoredTotal + " of " + root.querySelectorAll("[data-control]").length,
      practices: practices
    };
  }

  // Turns an export file (or the older raw format) back into saved state.
  function parseImport(data) {
    if (!data || !Array.isArray(data.practices)) return sanitize(data);
    var practiceByCode = {};
    tiles.forEach(function (t) { practiceByCode[t.getAttribute("data-code")] = t.getAttribute("data-practice"); });
    var controlByCode = {};
    [].forEach.call(root.querySelectorAll("[data-control]"), function (li) {
      controlByCode[li.getAttribute("data-code")] = li.getAttribute("data-control");
    });
    var raw = { controls: {}, practices: {} };
    data.practices.forEach(function (p) {
      if (!p || typeof p !== "object") return;
      var pslug = Object.prototype.hasOwnProperty.call(practiceByCode, p.code) ? practiceByCode[p.code] : null;
      if (pslug && typeof p.note === "string") raw.practices[pslug] = { n: p.note };
      (Array.isArray(p.controls) ? p.controls : []).forEach(function (c) {
        if (!c || typeof c !== "object" || !Object.prototype.hasOwnProperty.call(controlByCode, c.code)) return;
        raw.controls[controlByCode[c.code]] = { s: c.score, n: typeof c.note === "string" ? c.note : "" };
      });
    });
    return sanitize(raw);
  }

  document.getElementById("sa-export").addEventListener("click", function () {
    var payload = JSON.stringify(buildExport(), null, 2);
    var url = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
    var a = document.createElement("a");
    a.href = url;
    a.download = "p-sscrm-self-assessment-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  });

  var fileInput = document.getElementById("sa-import-file");
  document.getElementById("sa-import").addEventListener("click", function () {
    fileInput.click();
  });
  fileInput.addEventListener("change", function () {
    var file = fileInput.files && fileInput.files[0];
    fileInput.value = "";
    if (!file) return;
    if (file.size > MAX_IMPORT) {
      window.alert("That file is too large to be a P-SSCRM self-assessment export.");
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      var imported = null;
      try { imported = parseImport(JSON.parse(reader.result)); } catch (e) {}
      if (!imported) {
        window.alert("That file doesn't look like a P-SSCRM self-assessment export.");
        return;
      }
      if (!window.confirm("Replace your current scores and notes with the ones in this file?")) return;
      state = imported;
      save();
      renderAll();
    };
    reader.readAsText(file);
  });

  document.getElementById("sa-clear").addEventListener("click", function () {
    if (!window.confirm("Delete all your scores and notes from this browser? Export first if you want a copy.")) return;
    state = emptyState();
    save();
    renderAll();
  });

  // ---- start ------------------------------------------------------------

  renderAll();
  if (!storageOk) document.getElementById("sa-storage-warning").hidden = false;

  var hash = "";
  try { hash = decodeURIComponent(location.hash.slice(1)); } catch (e) {}
  if (hash && hasPanel(hash)) showPractice(hash);
})();
