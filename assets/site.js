// andesha.studio — apparitions au défilement, bandeau, lumière du curseur. Aucun suivi.
(function () {
  var doc = document.documentElement;
  doc.classList.add("js");
  var calme = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Apparitions, décalées dans un même groupe
  var elements = document.querySelectorAll(".revele");
  if (!("IntersectionObserver" in window) || calme) {
    elements.forEach(function (el) { el.classList.add("vu"); });
  } else {
    var obs = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("vu");
        obs.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    elements.forEach(function (el) {
      var freres = el.parentElement ? el.parentElement.querySelectorAll(":scope > .revele") : [];
      var rang = Array.prototype.indexOf.call(freres, el);
      if (rang > 0) el.style.setProperty("--delai", Math.min(rang, 6) * 0.08 + "s");
      obs.observe(el);
    });
  }

  // Filet sous le bandeau dès qu'on défile
  var bandeau = document.querySelector(".bandeau");
  var surDefile = function () { if (bandeau) bandeau.classList.toggle("defile", window.scrollY > 8); };
  window.addEventListener("scroll", surDefile, { passive: true });
  surDefile();

  // Lumière qui suit le curseur (souris seulement)
  if (!calme && window.matchMedia("(pointer: fine)").matches) {
    var attente = false;
    window.addEventListener("pointermove", function (ev) {
      if (attente) return;
      attente = true;
      requestAnimationFrame(function () {
        doc.style.setProperty("--x", ev.clientX + "px");
        doc.style.setProperty("--y", ev.clientY + "px");
        attente = false;
      });
    }, { passive: true });
  }
})();
