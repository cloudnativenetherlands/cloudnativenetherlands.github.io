(function () {
  var RECIPIENT = "info@cloudnativenetherlands.nl";
  var form = document.getElementById("event-request-form");
  if (!form) return;

  var status = document.getElementById("er-status");
  var copyButton = document.getElementById("er-copy");

  function setStatus(message, isError) {
    status.textContent = message;
    status.classList.toggle("er-error", Boolean(isError));
  }

  function valueOf(field) {
    if (field.type === "checkbox") return field.checked ? "Confirmed" : "";
    return field.value.trim();
  }

  // Builds the plain-text request, one block per form section.
  function buildBody() {
    var lines = [];
    var children = form.querySelectorAll("h2, [data-label]");
    var sectionLines = [];
    var sectionTitle = "";

    function flush() {
      if (sectionTitle && sectionLines.length) {
        lines.push(sectionTitle.toUpperCase());
        lines = lines.concat(sectionLines);
        lines.push("");
      }
      sectionLines = [];
    }

    Array.prototype.forEach.call(children, function (node) {
      if (node.tagName === "H2") {
        flush();
        sectionTitle = node.textContent.trim();
        return;
      }
      var value = valueOf(node);
      if (value) sectionLines.push(node.getAttribute("data-label") + ": " + value);
    });
    flush();

    return lines.join("\n").trim();
  }

  function validate() {
    if (form.checkValidity()) return true;
    form.classList.add("was-validated");
    var firstInvalid = form.querySelector(":invalid");
    if (firstInvalid) firstInvalid.focus();
    setStatus("Please fill in all fields marked with * before sending.", true);
    return false;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!validate()) return;

    var subject = "Event support request: " + document.getElementById("er-name").value.trim();
    var href = "mailto:" + RECIPIENT +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(buildBody());

    window.location.href = href;
    setStatus("Your email app should now open. Send the email to submit your request.", false);
  });

  copyButton.addEventListener("click", function () {
    if (!validate()) return;
    var text = buildBody();

    function done() {
      setStatus("Request text copied. Paste it into an email to " + RECIPIENT + ".", false);
    }

    function fallback() {
      var area = document.createElement("textarea");
      area.value = text;
      area.setAttribute("readonly", "");
      area.style.position = "absolute";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(area);
      if (ok) done();
      else setStatus("Copying failed. Please email your request to " + RECIPIENT + ".", true);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else {
      fallback();
    }
  });
})();
