/* Advik Learning Centre — small site interactions */
(function () {
  "use strict";

  // --- Mobile nav toggle ---
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // close menu when a link is tapped
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // --- Animated stat counters (run when scrolled into view) ---
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { obs.observe(c); });
  }

  function animate(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      var val = target * eased;
      el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // --- Scroll reveal (with staggered cascade among siblings) ---
  var revealSel = ".section-kicker, .section-title, .ornament, .lead, .card, .feature, " +
                  ".quote, .stat, .gallery-item, .cta-band, .form-card, .info-block, .map-embed, " +
                  ".hero-logo, .hero h1, .hero .sanskrit, .hero .tagline, .hero .hero-meta, .hero-actions";
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(revealSel));

  if (revealEls.length && "IntersectionObserver" in window) {
    var siblingIndex = new Map();
    revealEls.forEach(function (el) {
      el.classList.add("reveal");
      var parent = el.parentElement;
      var idx = siblingIndex.get(parent) || 0;
      el.style.transitionDelay = Math.min(idx, 6) * 90 + "ms";
      siblingIndex.set(parent, idx + 1);
    });

    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        revObs.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { revObs.observe(el); });
  } else {
    // no IO support → just show everything
    revealEls.forEach(function (el) { el.classList.add("reveal", "in"); });
  }
})();
