// Standards coverage table: clicking a number opens a row listing the controls behind it.
(function () {
  var table = document.getElementById("counts-table");
  if (!table) return;
  var cols = table.querySelectorAll("thead th").length;
  var open = null; // { btn, row }

  function close() {
    if (!open) return;
    open.btn.setAttribute("aria-expanded", "false");
    open.btn.closest("td").classList.remove("is-open");
    open.row.remove();
    open = null;
  }

  table.addEventListener("click", function (e) {
    var btn = e.target.closest(".counts-btn");
    if (!btn || btn.tagName !== "BUTTON") return;
    var same = open && open.btn === btn;
    close();
    if (same) return;

    var td = btn.closest("td");
    var list = td.querySelector(".counts-list");
    var tr = td.parentNode;
    var row = document.createElement("tr");
    row.className = "counts-detail";
    var cell = document.createElement("td");
    cell.colSpan = cols;
    var head = document.createElement("p");
    head.className = "counts-detail-head";
    head.textContent = btn.getAttribute("data-label") + ". ★ marks controls only this standard cites.";
    var chips = document.createElement("div");
    chips.className = "counts-detail-chips";
    chips.innerHTML = list.innerHTML;
    cell.appendChild(head);
    cell.appendChild(chips);
    row.appendChild(cell);
    tr.parentNode.insertBefore(row, tr.nextSibling);

    btn.setAttribute("aria-expanded", "true");
    td.classList.add("is-open");
    open = { btn: btn, row: row };
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && open) { var b = open.btn; close(); b.focus(); }
  });
})();
